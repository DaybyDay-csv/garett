# Garett Connect Pro

CONEXIÓN SHOPIFY (TIENDA EXISTENTE)
Conecta mi tienda Shopify existente con estos datos:
QUIERO UNA TIENDA YA EXISTENTE NO UN SANDBOX NUEVO
Store Domain: https://admin.shopify.com/store/garett-2
API Version: 2025-07
IMPORTANTE: NO crear productos de prueba. Usar los 20 productos reales que ya existen en mi tienda.
# PROMPT FOR LOVABLE.DEV — **Build a Spanish (ES-only) Shopify 2.0 store for “Garett (Garett España)”**

**Goal:** Create a **new Shopify 2.0 store** via Lovable’s Shopify integration (new store, sandbox first, then “claim store”). Implement a **CVO-first, mobile-first** storefront optimized for WW/BF/CM. **Do not invent prices or stock.** Use only what’s below.

## 0) Identity, market, copy guardrails

* **Brand / Trading name:** Garett (Garett España)
* **Reference domain (no migration now):** [https://xn--garettespaa-beb.es/](https://xn--garettespaa-beb.es/)
* **Market / Language / Currency:** **Spain**, **Spanish (es-ES)**, **EUR** — **ES-only at launch** (no multi-currency).
* **Copy guardrails:** No guaranteed results, no “miracle” language. Use disclaimers like “Los resultados pueden variar.” Warranty 3 years, CE, and El Corte Inglés presence as trust spine.

## 1) Catalog — product handles (no prices/stock yet)

Create products with these **exact handles** (kebab-case; no accents). All are **devices** unless noted:

**Masajeadores faciales**

* Fresh Eye → `fresh-eye`
* Lift Skin → `lift-skin`
* Lift Skin Pro → `lift-skin-pro`
* Pretty Face → `pretty-face`
* Beauty Lift → `beauty-lift`

**Limpieza facial (devices)**

* Multiclean → `multiclean`
* Breeze Scrub → `breeze-scrub`
* Refresh Scrub → `refresh-scrub`

**Dispositivos de Mesoterapia (devices)**

* Calm Skin → `calm-skin`
* Fresh Skin Pro → `fresh-skin-pro`
* Bright Skin → `bright-skin`
* Serum Skin (device) → `serum-skin`

**Dispositivos corporales (devices)**

* Cellu-Body → `cellu-body`
* Cuerpo Perfecto → `cuerpo-perfecto`
* Multi Care Brush → `multi-care-brush` *(also in capilar)*

**Cuidado capilar (devices)**

* Curly → `curly`
* **AeroGlow** (launch) → `aeroglow` *(capilar only; tag as new/launch)*
* Multi Care Brush → `multi-care-brush`

**Depilación e IPL (devices)**

* IPL Flash Pro → `ipl-flash-pro`
* IPL Flash Dorada → `ipl-flash-dorada`
* IPL Plateada → `ipl-plateada`
* Cool → `cool`

## 2) Tag schema (apply to products)

```
type:device|skincare|bundle
category:masajeadores-faciales|limpieza-facial|mesoterapia|corporales|capilar|ipl
area:face|eye|neck|body|hair
tech:mesoterapia|ipl|limpieza          (only if applicable)
new:true | bestseller:true | bundle:true | outlet:true | bf:2025 | launch:bf2025
```

## 3) Collections (Smart Collections) & navigation

**Top-level (indexed; BF prioritized):**

* New Arrivals (AeroGlow)
* Best Sellers
* Devices
* Skincare
* Sets & Bundles
* Outlet (optional)
* **Black Friday Hub** → `/collections/black-friday`

**Browseable category collections (auto by tag):**

* Masajeadores faciales → `category:masajeadores-faciales`
* Limpieza facial → `category:limpieza-facial`
* Dispositivos de Mesoterapia → `category:mesoterapia`
* Dispositivos corporales → `category:corporales`
* Cuidado capilar → `category:capilar`
* Depilación e IPL → `category:ipl`

**Auto rules:**

* New Arrivals: `new:true` **or** published ≤30 days
* Best Sellers: `bestseller:true` **or** top-20% by sales
* Sets & Bundles: `bundle:true`
* BF Hub: `bf:2025`

**SEO & indexation:** Only **index** collections with ≥6 products; render others but **noindex** until populated. Use clean collection handles (no accents). Add breadcrumbs and include BF Hub + populated collections in sitemap.

## 4) Product metafields (for PDP 2.0 blocks)

Create these **product-level metafields**:

* `pdp.benefits` — list (3–6 bullets)
* `pdp.how_to` — list (3–6 steps)
* `pdp.safety_notes` — multi-line text
* `pdp.in_the_box` — list (box contents)
* `badges.warranty_years` — integer → **3**
* `legal.disclaimer` — multi-line text (conservative claims)
* `promo.labels` — list (“New”, “Bestseller”, etc.)
* `bundle.components` — list.product_reference (if bundle)
* `video.primary` — file_reference (main demo video)
* `ugc.media` — list.file_reference (curated UGC)

## 5) WW/BF/CM calendar, discounts, tiers, and GWP (Shopify-compliant)

**Final 2025 calendar (Spain timezone):**

* **Warm-up:** **10/11–16/11** → **–10% sitewide**
* **White Week:** **17/11–27/11** → **–10% sitewide** + **GWP hair band**
* **Black Friday:** **28/11–30/11** → **–20% sitewide** + **tiered early-bird** + **GWP**
* **Cyber Monday:** **01/12** → **–15% sitewide** + **GWP**

**Shopify limitation (one automatic discount at a time):**

* Schedule **one automatic –10%** for Warm-up & White Week.
* For BF, **disable –10%** and **enable one automatic –20%**.
* For CM, **one automatic –15%**.

**Visual breakdown (BF only):**
Even though BF uses a single –20% automatic, **show two informational lines** in PDP and Cart so customers see “more discounts”:

* “–10% White Week –€X”
* “–10% Black Friday –€Y”
  (Displayed as UI only; the actual applied discount remains –20%.)

**Tiered early-bird (storewide totals across BF, no daily resets):**
Create **discount codes with usage limits** + auto-apply via URL:

* `BF50-EB1-2025` — limit **5** → –50%
* `BF35-EB2-2025` — limit **15** → –35%
* `BF25-EB3-2025` — limit **45** → –25%
  **Rule:** If a code is present, apply the **greater discount** (codes do not stack with automatic). When a tier is exhausted, move to the next.

**Metaobject for tier counter:**
Create `bf_tiers` with fields:

* `stage` (e.g., `bf_2025`)
* `code_current`
* `count_total`
* `count_claimed`
* `ends_at` (datetime)
  Use it to power a **live banner/counter** on Home/PLP/PDP and to rotate tiers (50→35→25) as limits are hit.

**GWP (hair band) — active in ALL stages:**

* Create SKU `GIFT-HAIRBAND` (`gift:true`, price 0).
* Threshold: **€70 cart subtotal after discounts** (pre-tax).
* Auto-add gift when threshold met; show progress bar in Cart (“Te faltan **€X** para tu regalo”).

## 6) Bundles (structure only; we’ll fill prices later)

* **Pack Ritual Belleza Eco** = Multiclean + Serum Skin + Fresh Eye *(“Eye Fresh” is NOT the name; use **Fresh Eye**)*

  * Reference: PVP 195,80€ → Offer 165€ (11/11)
* **Pack Ritual Premium** = Multiclean + Calm Skin + Cellu-Body

  * Reference: PVP 315,90€ → Offer 265€
* Include **free esthéticienne call** in bundles (surface this on PDP & Cart when a bundle is in cart).
  Use `bundle.components` to render composition and enable CTA to buy the bundle from each device PDP.

## 7) Templates & UI (Shopify 2.0, mobile-first, CVO)

**Home**

* Lightweight preloader (Garett logo spins 2×; respects `prefers-reduced-motion`; non-blocking for LCP).
* BF hero with CTA to **BF Hub**.
* Tiers counter (reads `bf_tiers`).
* UGC carousel (publish **20 real reviews** initially).
* New Arrivals (AeroGlow), Best Sellers.
* Trust spine: **3-year warranty**, **CE**, **El Corte Inglés**.
* Support block: “Sesión gratuita con esteticista” (bundles).

**PLP / Collections**

* Filters: **Categoría, Tipo, Área, Tecnología, Precio, Disponibilidad, Garantía (3 años), Promos (BF/GWP)**.
* Sticky promo per stage; badges (`new`, `bestseller`, `warranty:3y`).
* Tier banner (“Quedan X al –35% / –25%”).

**PDP (devices)**

* Price box with **visual breakdown –10% + –10%** during BF.
* Tier badge (“Quedan X al –35%”).
* Blocks powered by metafields: **Benefits**, **How-to**, **Safety**, **In the box**.
* UGC strip + FAQ covering top objections (results, safety, ease, value).
* Bundle CTA if `bundle.components` is present.
* **3-year warranty** badge and **legal disclaimer** visible.

**Cart**

* Show the two **informational lines** –10/–10 during BF, the **GWP progress bar**, auto-gift add, link to BF Hub, and policies (returns **30 days**, warranty **3 years**).

**BF Hub**

* Grid of products tagged `bf:2025`, live tier counter, campaign schedule and T&Cs.

**Community/Trust**

* UGC + 20 real testimonials; CE/ECI/warranty logos.

## 8) SEO, accessibility, performance

* Collections with <6 products → render but **noindex**; include BF Hub + populated collections in sitemap.
* Clean canonicals and breadcrumbs.
* Responsive images (`srcset`), lazy loading, minimal JS, no LCP/CLS regressions.
* Accessibility: `aria-live` for counters/promos, AA contrast, keyboard-navigable.

## 9) Tracking (placeholders) & custom events

* Add GA4 and placeholders for Meta/Google Ads/TikTok/LinkedIn pixels in theme settings.
* Fire custom events:

  * `bf_tier_seen`, `bf_tier_applied`
  * `gwp_progress_view`, `gwp_awarded`
  * `bundle_view`, `bundle_add`

## 10) Deliverables I expect

1. **Sandbox store** created and **“claim store”** link ready.
2. Collections and tags created; **BF Hub** functional.
3. Product **metafields** and **metaobject `bf_tiers`** created.
4. 2.0 templates (Home, PLP, PDP devices, Cart, BF Hub, Community/Trust) with the blocks above.
5. Scheduled **automatic discounts** (–10%, –20%, –15%) and **tier codes** (5/15/45) configured.
6. **GWP** working at **€70 cart subtotal after discounts** with progress bar and auto-gift.
7. **CSV templates** for bulk import:

   * `Handle,Title,Type,Tags`
   * `pdp.benefits,pdp.how_to,pdp.safety_notes,pdp.in_the_box,badges.warranty_years,legal.disclaimer,promo.labels`
8. Theme settings with placeholders for tracking IDs and legal copy.

**Important:** Keep the entire storefront **in Spanish (es-ES)**. Do **not** invent pricing or stock. Do **not** use clinical claims unless supplied later. Prioritize **CVO & mobile**.

---

If you want, I can also generate the CSV skeletons now for quick import.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://garett.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a57ba3d1-e5dd-4836-8caa-5c9529130291).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
