import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, acceptsMarketing = true } = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Email inválido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const adminApiToken = Deno.env.get('SHOPIFY_ADMIN_API_TOKEN');
    const shopDomain = 'garett-connect-shop-w1cxe.myshopify.com';

    if (!adminApiToken) {
      console.error('SHOPIFY_ADMIN_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Configuración del servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create customer using Shopify Admin API
    const mutation = `
      mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            emailMarketingConsent {
              marketingState
              consentUpdatedAt
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email: email,
        emailMarketingConsent: {
          marketingState: acceptsMarketing ? 'SUBSCRIBED' : 'NOT_SUBSCRIBED',
          marketingOptInLevel: acceptsMarketing ? 'SINGLE_OPT_IN' : 'UNKNOWN',
        },
      },
    };

    console.log('Creating customer with email:', email);

    const response = await fetch(`https://${shopDomain}/admin/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminApiToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!response.ok) {
      console.error('Shopify API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Shopify response:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(`GraphQL error: ${data.errors.map((e: any) => e.message).join(', ')}`);
    }

    const { customer, userErrors } = data.data.customerCreate;

    if (userErrors && userErrors.length > 0) {
      console.error('User errors:', userErrors);
      
      // Check if it's a duplicate email error
      const isDuplicate = userErrors.some((err: any) => 
        err.message.toLowerCase().includes('taken') || 
        err.message.toLowerCase().includes('already exists')
      );

      if (isDuplicate) {
        return new Response(
          JSON.stringify({ 
            error: 'Este email ya está registrado',
            isDuplicate: true 
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: userErrors[0].message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Customer created successfully:', customer.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customer: {
          id: customer.id,
          email: customer.email,
          marketingState: customer.emailMarketingConsent?.marketingState
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in newsletter-signup function:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la suscripción' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
