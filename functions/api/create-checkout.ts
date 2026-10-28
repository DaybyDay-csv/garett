// Cloudflare Pages Function — crea una Stripe Checkout Session de forma segura.
// La secret key (sk_live_...) vive como secreto de Cloudflare Pages (STRIPE_SECRET_KEY),
// NUNCA en el frontend ni en el repo.
//
// Precios (H3): los line_items se construyen SIEMPRE en el servidor con
// price_data a partir de la tabla local (./prices, duplicado de src/lib/prices.ts).
// Los price_ que llegan del cliente se IGNORAN como importe; solo se usan para
// recuperar el handle mientras algún cliente antiguo siga mandando price_ (ver
// HANDLE_BY_PRICE más abajo). Un handle que no esté en la tabla se rechaza.
// Los packs se detectan de forma avariciosa: si el carrito contiene los
// componentes de un pack, esos componentes se cobran al precio del pack
// (reparto proporcional, la última línea absorbe el redondeo) y el resto a
// precio base. El total NUNCA supera la suma de precios base.
import { PRECIOS, PACKS, type Pack } from './prices';

interface Env {
  STRIPE_SECRET_KEY?: string;
}

interface CheckoutItem {
  handle?: string; // formato nuevo: {handle, quantity}
  price?: string; // formato legado: {price, quantity} (Price ID de Stripe)
  quantity: number;
}

interface LineaCarrito {
  handle: string;
  cantidad: number;
}

// Duplicado INVERTIDO de src/lib/stripePrices.ts — fallback mientras el
// frontend mande price_ en vez de handle. No decide importes: solo traduce
// price_ → handle para leer la tabla de precios del servidor. Si cambian los
// Price IDs en src/lib/stripePrices.ts, actualiza aquí; cuando el frontend
// mande {handle, quantity}, borrar este mapa.
const HANDLE_BY_PRICE: Record<string, string> = {
  price_1U9W01FS9PHCKZwwyXcknImI: 'fresh-eye',
  price_1U9W02FS9PHCKZwwZSnfqaNl: 'lift-skin',
  price_1U9W03FS9PHCKZwwEFNym5hC: 'lift-skin-pro',
  price_1U9W04FS9PHCKZwwPXI6cL6F: 'pretty-face',
  price_1U9W05FS9PHCKZwwHeOSrUlu: 'beauty-lift',
  price_1U9W06FS9PHCKZwwQKbLrvvo: 'multiclean',
  price_1U9W07FS9PHCKZwwqwPIxNbE: 'breeze-scrub',
  price_1U9W08FS9PHCKZww423TwfzL: 'refresh-scrub',
  price_1U9W09FS9PHCKZwwkYian6gu: 'calm-skin',
  price_1U9W09FS9PHCKZwwCjqnXBp9: 'fresh-skin-pro',
  price_1U9W0AFS9PHCKZwwMAAOPsJr: 'bright-skin',
  price_1U9W0BFS9PHCKZwwfRAzExYE: 'serum-skin',
  price_1U9W0CFS9PHCKZwwaB5Udcob: 'cellu-body',
  price_1U9W0DFS9PHCKZwwTKUW3iFu: 'cuerpo-perfecto',
  price_1U9W0EFS9PHCKZwwEFvi9f4y: 'multi-care-brush',
  price_1U9W0EFS9PHCKZwwjnx5J7N6: 'curly',
  price_1U9W0FFS9PHCKZwwrVoIfvQC: 'aeroglow',
  price_1U9W0GFS9PHCKZwwiavw3M6s: 'ipl-flash-pro',
  price_1U9W0HFS9PHCKZwwEhyJsfSs: 'ipl-flash-dorada',
  price_1U9W0HFS9PHCKZwwu11FLaWI: 'ipl-plateada',
  price_1U9W0IFS9PHCKZww6k5MfHWA: 'cool',
  price_1U9W0JFS9PHCKZwwvPIGvuX3: 'manopla-led-intermex-beauty',
  price_1U9W0JFS9PHCKZwwVA3FPGRH: 'mascara-led-intermex-beauty',
};

const GWP_HANDLE = 'gwp-hairband'; // regalo con compra: nunca se vende (el frontend ya lo filtra)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

/** Traduce los ítems del cliente a líneas válidas de la tabla. price_ se ignora como importe. */
function aLineas(items: CheckoutItem[]): LineaCarrito[] {
  const lineas = new Map<string, number>();
  for (const item of items) {
    const handle =
      typeof item.handle === 'string' && item.handle
        ? item.handle
        : typeof item.price === 'string' &&
            Object.hasOwn(HANDLE_BY_PRICE, item.price)
          ? HANDLE_BY_PRICE[item.price]
          : undefined;
    if (!handle || handle === GWP_HANDLE) continue; // desconocido o regalo: se descarta
    if (!Object.hasOwn(PRECIOS, handle)) continue; // handle fuera de la tabla: se rechaza
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) continue;
    lineas.set(handle, (lineas.get(handle) ?? 0) + item.quantity);
  }
  return [...lineas.entries()].map(([handle, cantidad]) => ({ handle, cantidad }));
}

/**
 * Reparte el precio del pack entre las líneas, proporcional al precio base de
 * cada una. La última línea absorbe el redondeo para que la suma dé exactamente
 * el precio del pack. Mismo algoritmo que BundlePicker en el cliente, para que
 * el total del carrito y el cobro coincidan al céntimo.
 */
function repartePrecioPack(
  pack: Pack,
  handles: string[],
): number[] {
  const totalBase = handles.reduce(
    (s, h) => s + PRECIOS[h].precioCentimos,
    0,
  );
  let asignado = 0;
  return handles.map((h, i) => {
    if (i === handles.length - 1) {
      return pack.precioCentimos - asignado;
    }
    const importe = Math.floor(
      (pack.precioCentimos * PRECIOS[h].precioCentimos) / totalBase,
    );
    asignado += importe;
    return importe;
  });
}

/** Línea final a cobrar en Stripe. */
interface LineaFinal {
  handle: string;
  nombre: string;
  cantidad: number;
  /** Importe unitario de la línea, en céntimos. */
  importeUnitario: number;
}

/**
 * Extrae packs del carrito de forma AVARICIOSA (greedy): mientras quede un
 * pack cuyos componentes estén (con cantidad >= 1) en el carrito, sus
 * componentes se cobran al precio repartido del pack (proporcional al base,
 * última línea absorbe el redondeo) y se descuentan esas unidades. El resto se
 * cobra a precio base. Así un pack dentro de un carrito más grande conserva su
 * descuento, las líneas del recibo coinciden 1 a 1 con las del carrito y el
 * total cobrado NUNCA supera la suma de precios base (nunca se sobrecobra).
 */
export function desglosaCarrito(lineas: LineaCarrito[]): LineaFinal[] {
  const disponibles = new Map<string, number>(
    lineas.map((l) => [l.handle, l.cantidad]),
  );
  const finales: LineaFinal[] = [];

  let quedanPacks = true;
  while (quedanPacks) {
    quedanPacks = false;
    for (const pack of PACKS) {
      if (pack.componentes.every((c) => (disponibles.get(c.handle) ?? 0) >= c.cantidad)) {
        const handles = pack.componentes.map((c) => c.handle);
        const importes = repartePrecioPack(pack, handles);
        handles.forEach((h, i) => {
          finales.push({
            handle: h,
            nombre: PRECIOS[h].nombre,
            cantidad: 1,
            importeUnitario: importes[i],
          });
          disponibles.set(h, disponibles.get(h)! - 1);
        });
        quedanPacks = true;
      }
    }
  }

  for (const linea of lineas) {
    const restante = disponibles.get(linea.handle) ?? 0;
    if (restante > 0) {
      finales.push({
        handle: linea.handle,
        nombre: PRECIOS[linea.handle].nombre,
        cantidad: restante,
        importeUnitario: PRECIOS[linea.handle].precioCentimos,
      });
    }
  }

  return finales;
}

/**
 * Crea (una vez) el cupón de primer pedido PRIMERA13. Idempotente: si ya
 * existe, Stripe responde resource_already_exists y seguimos. Si falla por
 * cualquier otro motivo, tampoco bloquea el checkout: el cupón es optativo
 * para crear la sesión (solo hace falta para canjear el código).
 *
 * Valores duplicados de src/lib/policies.ts (CUPON_PRIMER_PEDIDO): las
 * Functions no pueden importar de src/. Si cambia la política, cambia aquí.
 */
async function provisionaCuponPrimerPedido(secret: string): Promise<void> {
  const form = new URLSearchParams();
  form.append('id', 'PRIMERA13');
  form.append('percent_off', '13');
  form.append('duration', 'once');
  form.append('name', '13% de descuento en tu primer pedido');
  try {
    await fetch('https://api.stripe.com/v1/coupons', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });
  } catch {
    // Sin cupón el checkout sigue funcionando; no bloqueamos la compra.
  }
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  const secret = env.STRIPE_SECRET_KEY;

  if (!secret) {
    return json({ error: 'Stripe no está configurado en el servidor.' }, 500);
  }

  let items: CheckoutItem[] = [];

  try {
    const body = (await request.json()) as { items?: CheckoutItem[] };
    items = (body.items ?? []).filter(
      (i) => i && typeof i === 'object' && Number.isFinite(i.quantity),
    );
  } catch {
    return json({ error: 'Petición inválida.' }, 400);
  }

  const lineas = aLineas(items);

  if (lineas.length === 0) {
    return json(
      { error: 'Ninguno de los productos del carrito está disponible.' },
      400,
    );
  }

  const origin = new URL(request.url).origin;

  const finales = desglosaCarrito(lineas);

  const form = new URLSearchParams();
  form.append('mode', 'payment');
  form.append('success_url', `${origin}/checkout/gracias?session_id={CHECKOUT_SESSION_ID}`);
  form.append('cancel_url', `${origin}/productos`);
  form.append('allow_promotion_codes', 'true');
  // Recolección de datos de cliente (estilo Shopify): email (por defecto), teléfono y dirección de envío.
  form.append('phone_number_collection[enabled]', 'true');
  form.append('shipping_address_collection[allowed_countries][0]', 'ES');
  // Nota de regalo (H9): opcional, sin coste, para el ticket.
  form.append('custom_fields[0][key]', 'mensaje-regalo');
  form.append('custom_fields[0][label][type]', 'custom');
  form.append('custom_fields[0][label][custom]', '¿Es un regalo? Mensaje para el ticket');
  form.append('custom_fields[0][type]', 'text');
  form.append('custom_fields[0][optional]', 'true');
  finales.forEach((linea, i) => {
    form.append(`line_items[${i}][quantity]`, String(linea.cantidad));
    form.append(`line_items[${i}][price_data][currency]`, 'eur');
    form.append(`line_items[${i}][price_data][unit_amount]`, String(linea.importeUnitario));
    form.append(`line_items[${i}][price_data][product_data][name]`, linea.nombre);
  });

  await provisionaCuponPrimerPedido(secret);

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });

    const data = (await res.json()) as {
      url?: string;
      error?: { message?: string };
    };

    if (!res.ok || !data.url) {
      return json(
        { error: data.error?.message || 'Error creando el checkout.' },
        400,
      );
    }

    return json({ url: data.url });
  } catch {
    return json({ error: 'Error interno del servidor.' }, 500);
  }
}
