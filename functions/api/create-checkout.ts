// Cloudflare Pages Function — crea una Stripe Checkout Session de forma segura.
// La secret key (sk_live_...) vive como secreto de Cloudflare Pages (STRIPE_SECRET_KEY),
// NUNCA en el frontend ni en el repo.
//
// Precios (H3): los line_items se construyen SIEMPRE en el servidor con
// price_data a partir de la tabla local (./prices, duplicado de src/lib/prices.ts).
// Los price_ que llegan del cliente se IGNORAN como importe; solo se usan para
// recuperar el handle mientras el frontend siga mandando price_ (ver
// HANDLE_BY_PRICE más abajo). Un handle que no esté en la tabla se rechaza.
// Si el carrito coincide exactamente con un pack de la tabla, el precio del
// pack se reparte entre las líneas de forma proporcional.
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
  price_1U9W0JFS9PHCKZwwvPIGvuX3: 'manopla-led-garett-beauty',
  price_1U9W0JFS9PHCKZwwVA3FPGRH: 'mascara-led-garett-beauty',
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

/** Match exacto: el carrito es exactamente el pack (mismos handles y cantidades). */
function packExacto(lineas: LineaCarrito[]): Pack | null {
  return (
    PACKS.find(
      (p) =>
        p.componentes.length === lineas.length &&
        p.componentes.every((c) => {
          const linea = lineas.find((l) => l.handle === c.handle);
          return linea !== undefined && linea.cantidad === c.cantidad;
        }) &&
        lineas.every((l) => p.componentes.some((c) => c.handle === l.handle)),
    ) ?? null
  );
}

/**
 * Reparte el precio del pack entre las líneas, proporcional al precio base de
 * cada una. La última línea absorbe el redondeo para que la suma dé exactamente
 * el precio del pack. Devuelve null si algún componente del pack tuviera más de
 * una unidad (hoy no ocurre): en ese caso se cobra a precio base, sin descuento.
 */
function repartePrecioPack(
  pack: Pack,
  lineas: LineaCarrito[],
): number[] | null {
  if (lineas.some((l) => l.cantidad !== 1)) return null;
  const totalBase = lineas.reduce(
    (s, l) => s + PRECIOS[l.handle].precioCentimos,
    0,
  );
  let asignado = 0;
  return lineas.map((l, i) => {
    if (i === lineas.length - 1) {
      return pack.precioCentimos - asignado;
    }
    const importe = Math.floor(
      (pack.precioCentimos * PRECIOS[l.handle].precioCentimos) / totalBase,
    );
    asignado += importe;
    return importe;
  });
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

  const pack = packExacto(lineas);
  const importesPack = pack ? repartePrecioPack(pack, lineas) : null;

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
  lineas.forEach((linea, i) => {
    const precio = PRECIOS[linea.handle];
    const unit = importesPack ? importesPack[i] : precio.precioCentimos;
    form.append(`line_items[${i}][quantity]`, String(linea.cantidad));
    form.append(`line_items[${i}][price_data][currency]`, 'eur');
    form.append(`line_items[${i}][price_data][unit_amount]`, String(unit));
    form.append(`line_items[${i}][price_data][product_data][name]`, precio.nombre);
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
