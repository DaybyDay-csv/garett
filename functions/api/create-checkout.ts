// Cloudflare Pages Function — crea una Stripe Checkout Session de forma segura.
// La secret key (sk_live_...) vive como secreto de Cloudflare Pages (STRIPE_SECRET_KEY),
// NUNCA en el frontend ni en el repo.
interface Env {
  STRIPE_SECRET_KEY?: string;
}

interface CheckoutItem {
  name: string;
  unit_amount: number; // céntimos de euro
  quantity: number;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

// Diagnóstico temporal: confirma si el secreto llega a la Function en runtime.
export async function onRequestGet({ env }: { env: Env }) {
  return json({
    ok: true,
    hasStripeSecret: typeof env.STRIPE_SECRET_KEY === 'string' && env.STRIPE_SECRET_KEY.length > 0,
    envKeys: Object.keys(env),
  });
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
      (i) => i && i.quantity > 0 && Number.isFinite(i.unit_amount),
    );
  } catch {
    return json({ error: 'Petición inválida.' }, 400);
  }

  if (items.length === 0) {
    return json({ error: 'El carrito está vacío.' }, 400);
  }

  const origin = new URL(request.url).origin;

  const form = new URLSearchParams();
  form.append('mode', 'payment');
  form.append('success_url', `${origin}/checkout/gracias`);
  form.append('cancel_url', `${origin}/productos`);
  items.forEach((item, i) => {
    form.append(`line_items[${i}][quantity]`, String(item.quantity));
    form.append(`line_items[${i}][price_data][currency]`, 'eur');
    form.append(`line_items[${i}][price_data][product_data][name]`, item.name);
    form.append(
      `line_items[${i}][price_data][unit_amount]`,
      String(Math.round(item.unit_amount)),
    );
  });

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
