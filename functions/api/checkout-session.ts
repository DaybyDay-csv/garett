// Cloudflare Pages Function — GET /api/checkout-session?id=cs_live_...
// Recupera una Checkout Session de Stripe (usa STRIPE_SECRET_KEY) y devuelve
// SOLO campos seguros para pintar el resumen en la página de gracias (H5):
// id, importe, divisa, estado del pago, líneas (nombre, cantidad, importe)
// y el email del cliente enmascarado. Nunca expone dirección ni teléfono.

interface Env {
  STRIPE_SECRET_KEY?: string;
}

interface StripeLineItem {
  description?: string;
  quantity?: number;
  amount_total?: number;
}

interface StripeSession {
  id?: string;
  amount_total?: number;
  currency?: string;
  payment_status?: string;
  customer_details?: { email?: string };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Solo ids de Checkout Session de Stripe; nada de rutas raras ni otros prefijos.
const ES_ID_VALIDO = /^cs_(live|test)_[A-Za-z0-9]+$/;

/** Máscara tipo "an***@gmail.com" para no exponer el email completo. */
function enmascaraEmail(email: string | undefined): string | null {
  if (!email || !email.includes('@')) return null;
  const [local, dominio] = email.split('@');
  const visible = local.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(3, local.length - visible.length))}@${dominio}`;
}

export async function onRequestGet({
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

  const id = new URL(request.url).searchParams.get('id') ?? '';

  if (!ES_ID_VALIDO.test(id)) {
    return json({ error: 'Identificador de sesión inválido.' }, 400);
  }

  const headers = { Authorization: `Bearer ${secret}` };

  try {
    const [resSesion, resLineas] = await Promise.all([
      fetch(`https://api.stripe.com/v1/checkout/sessions/${id}`, { headers }),
      fetch(
        `https://api.stripe.com/v1/checkout/sessions/${id}/line_items?limit=100`,
        { headers },
      ),
    ]);

    if (resSesion.status === 404) {
      return json({ error: 'Sesión no encontrada.' }, 404);
    }
    if (!resSesion.ok) {
      return json({ error: 'Error consultando Stripe.' }, 502);
    }

    const sesion = (await resSesion.json()) as StripeSession;
    const lineasStripe = resLineas.ok
      ? ((await resLineas.json()) as { data?: StripeLineItem[] }).data ?? []
      : [];

    return json({
      id: sesion.id ?? id,
      amount_total: sesion.amount_total ?? null,
      currency: sesion.currency ?? null,
      payment_status: sesion.payment_status ?? null,
      lineas: lineasStripe.map((l) => ({
        nombre: l.description ?? 'Producto',
        cantidad: l.quantity ?? 1,
        importe: l.amount_total ?? null,
      })),
      email: enmascaraEmail(sesion.customer_details?.email),
    });
  } catch {
    return json({ error: 'Error interno del servidor.' }, 500);
  }
}
