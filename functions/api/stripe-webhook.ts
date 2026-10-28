// Cloudflare Pages Function — webhook de Stripe.
// Recibe "checkout.session.completed" y envía dos emails (Cloudflare Email Sending):
//   1. Notificación interna a NOTIFY_EMAIL (la de siempre).
//   2. Confirmación al CLIENTE con nº de pedido e importe (a customer_details.email;
//      si el checkout no trajo email, a CUSTOMER_FALLBACK_EMAIL o info@intermexbeauty.es).
//
// Secretos esperados en Cloudflare Pages:
//   STRIPE_WEBHOOK_SECRET   — secreto de firma del endpoint de Stripe (whsec_...)
//   STRIPE_SECRET_KEY       — ya existente, para leer los line_items
//   CLOUDFLARE_ACCOUNT_ID   — account id de Cloudflare
//   CLOUDFLARE_EMAIL_TOKEN  — API token de Cloudflare con permiso de Email Sending
//   NOTIFY_EMAIL            — email destino de la notificación interna (p. ej. Outlook)
//   FROM_EMAIL              — remitente (por defecto pedidos@garettespaña.es, NO TOCAR)
//   CUSTOMER_FALLBACK_EMAIL — opcional; destino de la confirmación si no hay email de cliente

interface Env {
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_EMAIL_TOKEN?: string;
  NOTIFY_EMAIL?: string;
  FROM_EMAIL?: string;
  /** Destino de la confirmación al cliente cuando el checkout no trajo email. */
  CUSTOMER_FALLBACK_EMAIL?: string;
}

interface StripeLineItem {
  description?: string;
  quantity?: number;
  amount_total?: number;
  currency?: string;
}

interface StripeSession {
  id: string;
  amount_total?: number;
  currency?: string;
  customer_details?: { email?: string; name?: string; phone?: string };
  shipping_details?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      postal_code?: string;
      city?: string;
      country?: string;
    };
  };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function verifySignature(rawBody: string, signature: string, secret: string): Promise<boolean> {
  let timestamp = '';
  let sig = '';
  for (const part of signature.split(',')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    const key = part.slice(0, eq);
    const val = part.slice(eq + 1);
    if (key === 't') timestamp = val;
    else if (key === 'v1') sig = val;
  }
  if (!timestamp || !sig) return false;

  // Evita replays: eventos de más de 5 min se rechazan.
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (age < 0 || age > 300) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  const expected = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${timestamp}.${rawBody}`),
  );
  const expectedBytes = new Uint8Array(expected);
  const sigBytes = hexToBytes(sig);
  if (expectedBytes.length !== sigBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < expectedBytes.length; i++) diff |= expectedBytes[i] ^ sigBytes[i];
  return diff === 0;
}

async function fetchLineItems(sessionId: string, secretKey: string): Promise<StripeLineItem[]> {
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { data?: StripeLineItem[] };
  return data.data ?? [];
}

function eur(cents: number | undefined): string {
  return `${((cents ?? 0) / 100).toFixed(2)}€`;
}

const ITEMS_TABLE = (items: StripeLineItem[]): string =>
  items
    .map((li) => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${li.description || 'Producto'} × ${li.quantity || 1}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${eur(li.amount_total)}</td></tr>`)
    .join('');

const ITEMS_TEXT = (items: StripeLineItem[]): string =>
  items.map((li) => `- ${li.description} × ${li.quantity} = ${eur(li.amount_total)}`).join('\n');

/**
 * Política duplicada de src/lib/policies.ts (las Functions no pueden importar
 * de src/). Si cambia la política, cambia aquí.
 */
const POLITICA_CLIENTE = {
  devolucion: 'Tienes 30 días para devolver tu producto con el precinto intacto.',
  plazosPeninsula: '2-4 días laborables (Península y Baleares)',
  plazosIslas: '5-10 días laborables (Canarias, Ceuta y Melilla)',
  telefono: '+34 679 23 51 48',
  horario: 'L-V 9-18h',
};

/** Notificación interna del pedido (la de siempre, hacia NOTIFY_EMAIL). */
async function sendEmail(env: Env, session: StripeSession, items: StripeLineItem[]): Promise<void> {
  const to = env.NOTIFY_EMAIL;
  const from = env.FROM_EMAIL || 'pedidos@garettespaña.es';
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_EMAIL_TOKEN;
  if (!to || !accountId || !token) return;

  const customerEmail = session.customer_details?.email || '—';
  const customerName = session.customer_details?.name || '—';
  const customerPhone = session.customer_details?.phone || '—';
  const addr = session.shipping_details?.address;
  const shipping = addr
    ? [addr.line1, addr.line2, addr.postal_code, addr.city, addr.country].filter(Boolean).join(', ')
    : '—';
  const total = eur(session.amount_total);

  const subject = `Nuevo pedido Garett — ${total}`;
  const html = `<h2 style="font-family:sans-serif">Nuevo pedido recibido</h2>
<table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">${ITEMS_TABLE(items)}</table>
<p style="font-family:sans-serif;font-size:16px"><strong>Total: ${total}</strong></p>
<h3 style="font-family:sans-serif">Cliente</h3>
<p style="font-family:sans-serif;font-size:14px">Nombre: ${customerName}<br>Email: ${customerEmail}<br>Teléfono: ${customerPhone}</p>
<h3 style="font-family:sans-serif">Envío</h3>
<p style="font-family:sans-serif;font-size:14px">${shipping}</p>
<p style="font-family:sans-serif;font-size:12px;color:#888">Session: ${session.id}</p>`;
  const text = `Nuevo pedido Garett — ${total}\n\n${ITEMS_TEXT(items)}\n\nTotal: ${total}\n\nCliente: ${customerName} <${customerEmail}> (${customerPhone})\nEnvío: ${shipping}\nSession: ${session.id}`;

  await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      from: { address: from, name: 'Garett' },
      subject,
      html,
      text,
    }),
  });
}

/**
 * Confirmación al CLIENTE (nº de pedido, importe y resumen).
 *
 * Destino: el email que el cliente dio en el checkout. Si no existe (pago sin
 * email), se envía a info@intermexbeauty.es para que no se pierda la
 * confirmación. El remitente sigue siendo FROM_EMAIL (pedidos@garettespaña.es
 * por defecto, no se toca).
 */
async function sendEmailCliente(env: Env, session: StripeSession, items: StripeLineItem[]): Promise<void> {
  const from = env.FROM_EMAIL || 'pedidos@garettespaña.es';
  const accountId = env.CLOUDFLARE_ACCOUNT_ID;
  const token = env.CLOUDFLARE_EMAIL_TOKEN;
  if (!accountId || !token) return;

  const emailCliente = session.customer_details?.email;
  // Regla: si no hay email de cliente, la confirmación va a info@intermexbeauty.es.
  const to = emailCliente || env.CUSTOMER_FALLBACK_EMAIL || 'info@intermexbeauty.es';
  const sinEmail = !emailCliente;

  const total = eur(session.amount_total);
  const nombre = session.customer_details?.name || '';
  const addr = session.shipping_details?.address;
  const shipping = addr
    ? [addr.line1, addr.line2, addr.postal_code, addr.city, addr.country].filter(Boolean).join(', ')
    : null;

  const subject = `${sinEmail ? '[SIN EMAIL CLIENTE] ' : ''}Pedido confirmado — Intermex Beauty (${total})`;
  const html = `<h2 style="font-family:sans-serif">¡Gracias por tu compra${nombre ? `, ${nombre}` : ''}!</h2>
<p style="font-family:sans-serif;font-size:14px">Tu pedido está confirmado. Estos son los datos:</p>
<p style="font-family:sans-serif;font-size:14px"><strong>Nº de pedido:</strong> ${session.id}</p>
<table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">${ITEMS_TABLE(items)}</table>
<p style="font-family:sans-serif;font-size:16px"><strong>Total: ${total}</strong></p>
${shipping ? `<h3 style="font-family:sans-serif">Envío</h3><p style="font-family:sans-serif;font-size:14px">${shipping}<br>${POLITICA_CLIENTE.plazosPeninsula}<br>${POLITICA_CLIENTE.plazosIslas}</p>` : ''}
<p style="font-family:sans-serif;font-size:14px">${POLITICA_CLIENTE.devolucion}</p>
<p style="font-family:sans-serif;font-size:14px">¿Dudas? Llámanos al ${POLITICA_CLIENTE.telefono} (${POLITICA_CLIENTE.horario}) o responde a este email.</p>
<p style="font-family:sans-serif;font-size:12px;color:#888">Intermex Beauty · Nº de pedido ${session.id}</p>`;
  const text = `¡Gracias por tu compra!\n\nNº de pedido: ${session.id}\n\n${ITEMS_TEXT(items)}\n\nTotal: ${total}\n${shipping ? `\nEnvío: ${shipping}\n${POLITICA_CLIENTE.plazosPeninsula}\n${POLITICA_CLIENTE.plazosIslas}\n` : ''}\n${POLITICA_CLIENTE.devolucion}\n\n¿Dudas? ${POLITICA_CLIENTE.telefono} (${POLITICA_CLIENTE.horario})`;

  await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      from: { address: from, name: 'Intermex Beauty' },
      subject,
      html,
      text,
    }),
  });
}

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return json({ error: 'Webhook no configurado.' }, 400);
  }

  const rawBody = await request.text();

  const valid = await verifySignature(rawBody, signature, webhookSecret);
  if (!valid) {
    return json({ error: 'Firma inválida.' }, 400);
  }

  let event: { type?: string; data?: { object?: StripeSession } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: 'JSON inválido.' }, 400);
  }

  // Respondemos 200 cuanto antes para que Stripe no reintente.
  if (event.type === 'checkout.session.completed' && event.data?.object) {
    const session = event.data.object;
    const secretKey = env.STRIPE_SECRET_KEY;
    const items = secretKey ? await fetchLineItems(session.id, secretKey) : [];
    // Notificación interna (la de siempre) + confirmación al cliente.
    await Promise.allSettled([
      sendEmail(env, session, items),
      sendEmailCliente(env, session, items),
    ]);
  }

  return json({ received: true });
}
