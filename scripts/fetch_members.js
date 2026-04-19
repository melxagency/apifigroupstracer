const https = require("https");
const fs = require("fs");
const path = require("path");

const FB_COOKIES = process.env.FB_COOKIES;

const GRUPOS = [
  { name: "Cubanos en Florida-1",                    url: "https://www.facebook.com/groups/cubanosenflorida1/" },
  { name: "Reserva de Vuelos Cuba - Rusia",           url: "https://www.facebook.com/groups/8856301654435091/" },
  { name: "Cubanos en Dubai-1",                       url: "https://www.facebook.com/groups/8481964255255929/" },
  { name: "Cubanos en Nicaragua-1",                   url: "https://www.facebook.com/groups/cubanosennicaragua1/" },
  { name: "Revolico Matanzas",                        url: "https://www.facebook.com/groups/6166833830005702/" },
  { name: "REVOLICO CIEGO DE AVILA",                  url: "https://www.facebook.com/groups/5111591572270244/" },
  { name: "Reservas de Vuelos Cuba - Panamá",         url: "https://www.facebook.com/groups/2938946762934546/" },
  { name: "Revolico En la Habana",                    url: "https://www.facebook.com/groups/revolicoenlahabanacu/" },
  { name: "Cubanos en CDMX-1",                        url: "https://www.facebook.com/groups/cubanosencdmx1/" },
  { name: "Reservas de Vuelos Cuba - Nicaragua",      url: "https://www.facebook.com/groups/ventasvueloscubanicaragua1/" },
  { name: "Cubanos en West Palm-1",                   url: "https://www.facebook.com/groups/cubanosenwestpalm/" },
  { name: "COMPRA VENTA EN HOLGUÍN",                  url: "https://www.facebook.com/groups/compradedivisasholguin/" },
  { name: "Cubanos en Mexico-1",                      url: "https://www.facebook.com/groups/cubanosenmexico11/" },
  { name: "Cubanos en Madrid-1",                      url: "https://www.facebook.com/groups/1793848928019756/" },
  { name: "Renta de autos en Cuba",                   url: "https://www.facebook.com/groups/1710355106466724/" },
  { name: "Cubanos en Estados Unidos-1",              url: "https://www.facebook.com/groups/cubanosenestadosunido/" },
  { name: "Cubanos en Mexico DF-1",                   url: "https://www.facebook.com/groups/cubanosenmexicodf/" },
  { name: "Reserva de Vuelos Cuba - Mexico",          url: "https://www.facebook.com/groups/1669575096953824/" },
  { name: "Cubanos en Rusia-1",                       url: "https://www.facebook.com/groups/1638163006763331/" },
  { name: "Envíos a Cuba desde Orlando",              url: "https://www.facebook.com/groups/1586579855232010/" },
  { name: "Cubanos en Estados Unidos-2",              url: "https://www.facebook.com/groups/1475292780033710/" },
  { name: "Cubanos en Uruguay-1",                     url: "https://www.facebook.com/groups/cubanosenuruguay1/" },
  { name: "Renta de autos Clásicos en Cuba",          url: "https://www.facebook.com/groups/1447313812632874/" },
  { name: "Cubanos en Nueva York-1",                  url: "https://www.facebook.com/groups/1393590281134164/" },
  { name: "Cubanos en Tapachula-1",                   url: "https://www.facebook.com/groups/cubanosentapachula/" },
  { name: "Cubanos en Austin Texas-1",                url: "https://www.facebook.com/groups/1250722932600050/" },
  { name: "Reservas de Vuelos Cuba - Guyana",         url: "https://www.facebook.com/groups/1200494574644363/" },
  { name: "Revolico La Habana Cuba",                  url: "https://www.facebook.com/groups/1196671070795170/" },
  { name: "Cubanos en Montevideo Uruguay-1",          url: "https://www.facebook.com/groups/cubanosenmontevideo1/" },
  { name: "Cubanos en Guyana-1",                      url: "https://www.facebook.com/groups/1192059578753923/" },
  { name: "Cubanos en Louisville-1",                  url: "https://www.facebook.com/groups/cubanosenlouisville1/" },
  { name: "Cubanos en España-1",                      url: "https://www.facebook.com/groups/1131940885160919/" },
  { name: "Cubanos en California-1",                  url: "https://www.facebook.com/groups/cubanosencalifornia1/" },
  { name: "Cubanos en Surinam-1",                     url: "https://www.facebook.com/groups/1099280141817883/" },
  { name: "Cubanos en Puebla (Mexico)-1",             url: "https://www.facebook.com/groups/cubanosenpuebla/" },
  { name: "Envíos a Cuba desde Miami",                url: "https://www.facebook.com/groups/1078984147279844/" },
  { name: "Cubanos en Orlando-1",                     url: "https://www.facebook.com/groups/cubanosenorlando1/" },
  { name: "Cubanos en Tampa-1",                       url: "https://www.facebook.com/groups/cubanosentampa/" },
  { name: "Envíos a Cuba desde Florida",              url: "https://www.facebook.com/groups/1045885620427058/" },
  { name: "Cubanos en Fort Lauderdale-1",             url: "https://www.facebook.com/groups/1042739023970914/" },
  { name: "Ciberseguridad y Denuncia Cuba",           url: "https://www.facebook.com/groups/ciberseguridadcuba/" },
  { name: "Ventas en toda la Habana",                 url: "https://www.facebook.com/groups/999020703807085/" },
  { name: "Cubanos en Toronto-1",                     url: "https://www.facebook.com/groups/cubanosentoronto1/" },
  { name: "Cubanos en Cancún-1",                      url: "https://www.facebook.com/groups/cubanosencancun1/" },
  { name: "Reserva de Vuelos Cuba - Nicaragua-2",     url: "https://www.facebook.com/groups/907496870991545/" },
  { name: "Cubanos en Nueva Jersey-1",                url: "https://www.facebook.com/groups/863786915709008/" },
  { name: "Reserva de Hoteles en Cuba",               url: "https://www.facebook.com/groups/860252276064532/" },
  { name: "Cubanos en Monterrey México",              url: "https://www.facebook.com/groups/857947516509744/" },
  { name: "Reservas Vuelos EEUU - Cuba",              url: "https://www.facebook.com/groups/839944551318267/" },
  { name: "Cubanos en Ciudad de Mexico-1",            url: "https://www.facebook.com/groups/cubanosenciudaddemexico1/" },
  { name: "Cubanos en Miami-2",                       url: "https://www.facebook.com/groups/cubanosenmiami2/" },
  { name: "TIENDA VIRTUAL HOLGUÍN",                   url: "https://www.facebook.com/groups/tiendavirtualholguin/" },
  { name: "Trabajo para Cubanos en Miami-1",          url: "https://www.facebook.com/groups/trabajoparacubanosenmiami1/" },
  { name: "Reservas Vuelos Cuba - Guyana 2",          url: "https://www.facebook.com/groups/583963487621974/" },
  { name: "Anuncios en La Habana",                    url: "https://www.facebook.com/groups/568661464773769/" },
  { name: "Cubanos en Moscú Rusia-1",                 url: "https://www.facebook.com/groups/566482719102207/" },
  { name: "Cubanos en Georgetown Guyana-1",           url: "https://www.facebook.com/groups/556178317094936/" },
  { name: "Cubanos en Málaga",                        url: "https://www.facebook.com/groups/545541007851013/" },
  { name: "Cubanos en Uruguay-2",                     url: "https://www.facebook.com/groups/536552832594558/" },
  { name: "Cubanos en Ohio-1",                        url: "https://www.facebook.com/groups/526380219975366/" },
  { name: "Cubanos en Katy Texas-1",                  url: "https://www.facebook.com/groups/497862709831151/" },
  { name: "Cubanos en Mexico-2",                      url: "https://www.facebook.com/groups/481233711027273/" },
  { name: "Reservas Vuelos Cuba - Uruguay",           url: "https://www.facebook.com/groups/480678754379552/" },
  { name: "Cubanos en Ottawa Canadá-1",               url: "https://www.facebook.com/groups/449814127723696/" },
  { name: "Envíos a Cuba desde Houston",              url: "https://www.facebook.com/groups/440364635656790/" },
  { name: "Cubanos en Houston-2",                     url: "https://www.facebook.com/groups/434744529655372/" },
  { name: "Bueno Bonito Barato Santiago de Cuba",     url: "https://www.facebook.com/groups/419935192381004/" },
  { name: "Cubanos en Canadá-1",                      url: "https://www.facebook.com/groups/cubanosencanada1/" },
  { name: "REVOLICO SANTA CLARA",                     url: "https://www.facebook.com/groups/revolicosantaclara1/" },
  { name: "Compra y venta Revolico Santiago de Cuba", url: "https://www.facebook.com/groups/372602027276911/" },
  { name: "Cubanos en Texas-1",                       url: "https://www.facebook.com/groups/cubanosentexas1/" },
  { name: "REVOLICO COMPRA VENTA HOLGUÍN",            url: "https://www.facebook.com/groups/revolicocompraventaholguin/" },
  { name: "Cubanos en Las Vegas-1",                   url: "https://www.facebook.com/groups/cubanosenlasvegas1/" },
  { name: "Cubanos en Florida-2",                     url: "https://www.facebook.com/groups/cubanosenflorida2/" },
  { name: "Reservas Vuelos Cuba - Rep. Dominicana",   url: "https://www.facebook.com/groups/325210957300002/" },
  { name: "Cubanos en Houston-1",                     url: "https://www.facebook.com/groups/cubanosenhouston1/" },
  { name: "Cubanos en Miami-1",                       url: "https://www.facebook.com/groups/285484860940817" },
  { name: "Cubanos en Kentucky-1",                    url: "https://www.facebook.com/groups/cubanosenkentucky1/" },
  { name: "Revolico Habana (ventas)",                 url: "https://www.facebook.com/groups/249366053545622/" },
  { name: "COMPRA Y VENTA EN CIENFUEGOS",             url: "https://www.facebook.com/groups/revolicocienfuegos1/" },
  { name: "Reservas Vuelos Cuba - Uruguay 2",         url: "https://www.facebook.com/groups/2261107397601516/" },
  { name: "Reservas Vuelos Cuba - Brasil",            url: "https://www.facebook.com/groups/2163845177296476/" },
  { name: "Reservas Vuelos Cuba - Guyana 3",          url: "https://www.facebook.com/groups/1760352071445266/" },
  { name: "Envíos a Cuba desde Kentucky",             url: "https://www.facebook.com/groups/1710976649688975/" },
  { name: "Cubanos en Kentucky-2",                    url: "https://www.facebook.com/groups/1704354747044774/" },
  { name: "Cubanos en Montreal Canadá-1",             url: "https://www.facebook.com/groups/1985567971886403/" },
];

// ── Cookie helper ──────────────────────────────────────────────
function buildCookieHeader(cookiesJson) {
  try {
    const parsed = JSON.parse(cookiesJson);
    // Acepta tanto array de objetos {name,value} como objeto plano {name:value}
    if (Array.isArray(parsed)) {
      return parsed.map((c) => `${c.name}=${c.value}`).join("; ");
    }
    return Object.entries(parsed).map(([k, v]) => `${k}=${v}`).join("; ");
  } catch {
    // Si ya es una cadena cookie cruda, devolverla directamente
    if (typeof cookiesJson === "string" && cookiesJson.includes("=")) return cookiesJson;
    return "";
  }
}

// ── Extrae el ID numérico del grupo desde la URL ───────────────
function extractGroupId(url) {
  const m = url.match(/groups\/(\d+)/);
  return m ? m[1] : null;
}

// ── Construye las URLs a intentar para cada grupo ─────────────
// Orden de preferencia:
// 1. m.facebook.com/groups/<ID>  (versión móvil ligera, mismas cookies de www)
// 2. mbasic.facebook.com/groups/<ID>
// 3. www.facebook.com/groups/<slug>/members (a veces muestra conteo en SSR)
function buildUrls(grupo) {
  const urls = [];
  const groupId = extractGroupId(grupo.url);

  // Slug o ID según la URL original
  const pathMatch = grupo.url.match(/\/groups\/([^/?#]+)/);
  const slug = pathMatch ? pathMatch[1] : null;

  if (groupId) {
    urls.push(`https://m.facebook.com/groups/${groupId}/`);
  }
  if (slug) {
    urls.push(`https://m.facebook.com/groups/${slug}/`);
    urls.push(`https://mbasic.facebook.com/groups/${slug}/`);
  }
  if (groupId && slug !== groupId) {
    urls.push(`https://mbasic.facebook.com/groups/${groupId}/`);
  }

  // Deduplicar
  return [...new Set(urls)];
}

// ── Fetch HTML con seguimiento de redirecciones ────────────────
function fetchPage(fullUrl, cookieHeader, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      resolve({ html: "", error: "too_many_redirects", status: 0, finalUrl: fullUrl });
      return;
    }

    let urlObj;
    try { urlObj = new URL(fullUrl); } catch {
      resolve({ html: "", error: "invalid_url", status: 0, finalUrl: fullUrl });
      return;
    }

    const isMobile = urlObj.hostname.startsWith("m.");

    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers: {
        // m.facebook.com requiere User-Agent de teléfono iOS/Android
        "User-Agent": isMobile
          ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
          : "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "identity",
        "Cookie": cookieHeader,
        "Referer": isMobile ? "https://m.facebook.com/" : "https://mbasic.facebook.com/",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
      },
    };

    const req = https.request(options, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const location = res.headers.location || "";
        if (location.includes("login") || location.includes("checkpoint") || location.includes("recover")) {
          resolve({ html: "", error: "redirect_login", status: res.statusCode, finalUrl: fullUrl });
          return;
        }
        const nextUrl = location.startsWith("http")
          ? location
          : `https://${urlObj.hostname}${location}`;
        fetchPage(nextUrl, cookieHeader, redirectCount + 1).then(resolve);
        return;
      }

      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const html = Buffer.concat(chunks).toString("utf8");
        resolve({ html, status: res.statusCode, error: null, finalUrl: fullUrl });
      });
    });

    req.on("error", (err) => resolve({ html: "", error: err.message, status: 0, finalUrl: fullUrl }));
    req.setTimeout(30000, () => { req.destroy(); resolve({ html: "", error: "timeout", status: 0, finalUrl: fullUrl }); });
    req.end();
  });
}

// ── Extraer conteo de miembros ─────────────────────────────────
// Cubre los formatos de m.facebook.com, mbasic.facebook.com y www
function extractMemberCount(html) {
  if (!html || html.length < 200) return null;

  const candidates = [];

  // ── 1. JSON embebido (máxima prioridad, más preciso) ──────────
  // Facebook incluye el conteo exacto en múltiples claves JSON
  const jsonPatterns = [
    /"member_count"\s*:\s*(\d+)/g,
    /"members_count"\s*:\s*(\d+)/g,
    /"memberCount"\s*:\s*(\d+)/g,
    /"membersCount"\s*:\s*(\d+)/g,
    /"total_count"\s*:\s*(\d+)/g,
    // m.facebook.com a veces usa esta forma
    /"count"\s*:\s*(\d+).*?"members"/g,
    // Datos serializados en __bbox / __elem
    /members.*?"count"\s*:\s*(\d+)/g,
  ];

  for (const re of jsonPatterns) {
    for (const m of [...html.matchAll(re)]) {
      const n = parseInt(m[1], 10);
      if (n >= 10 && n <= 50_000_000) candidates.push(n);
    }
  }

  // ── 2. member_count_text (p.ej. "66K members", "66 mil miembros") ──
  for (const m of [...html.matchAll(/"member_count_text"\s*:\s*"([^"]{1,40})"/g)]) {
    const text = m[1].replace(/\\u[\dA-Fa-f]{4}/g, (esc) =>
      String.fromCharCode(parseInt(esc.slice(2), 16))
    );
    const val = parseAbbreviated(text);
    if (val) candidates.push(val);
  }

  // ── 3. Texto visible en HTML (m.facebook.com y mbasic) ───────
  // m.facebook muestra el número en aria-label, data-*, o texto plano
  const visiblePatterns = [
    // "66,975 members" / "66 975 miembros" / "66.975 miembros"
    /\b(\d{1,3}(?:[,.\s]\d{3})+)\s*(?:members?|miembros?|membres?|участников|участника)\b/gi,
    // Grupos pequeños sin separador de miles
    /\b(\d{3,7})\s*(?:members?|miembros?|membres?|участников)\b/gi,
    // Bullet separado: "· 66,975 members"
    /[·•\|]\s*([\d][\d\s,._]+)\s*(?:members?|miembros?)\b/gi,
    /(?:members?|miembros?)\s*[·•:]\s*([\d][\d\s,._]+)/gi,
    // aria-label="66,975 members"
    /aria-label="([\d,.\s]+)\s*(?:members?|miembros?)"/gi,
    // data-testid o similares con números
    /Members[^"]{0,30}?(\d{1,3}(?:[,\s]\d{3})+)/gi,
    // Formato español: "66.975" (punto como sep de miles)
    /\b(\d{1,3}(?:\.\d{3})+)\s*(?:miembros?|members?)\b/gi,
  ];

  for (const re of visiblePatterns) {
    for (const m of [...html.matchAll(re)]) {
      const raw = (m[1] || m[2] || "").replace(/[\s,._]/g, "");
      const val = parseInt(raw, 10);
      if (!isNaN(val) && val >= 10 && val <= 50_000_000) candidates.push(val);
    }
  }

  // ── 4. Formato abreviado en texto visible ("66K", "66 mil") ──
  for (const m of [...html.matchAll(/\b([\d]+[.,]?[\d]*)\s*(K|mil|k|thousand|тыс)\b/gi)]) {
    const val = parseAbbreviated(`${m[1]} ${m[2]}`);
    if (val && val >= 1000 && val <= 50_000_000) candidates.push(val);
  }

  if (candidates.length === 0) return null;

  // Devolver el valor máximo (descarta ruido de números pequeños)
  return Math.max(...candidates);
}

// ── Parsea texto abreviado: "66K", "66,5K", "66 mil", "1.2M" ─
function parseAbbreviated(text) {
  if (!text) return null;
  const clean = text.trim().toLowerCase();
  const numMatch = clean.match(/([\d]+[.,][\d]+|[\d]+)/);
  if (!numMatch) return null;
  const base = parseFloat(numMatch[1].replace(",", "."));

  if (clean.includes("m") && !clean.includes("mil")) return Math.round(base * 1_000_000);
  if (clean.includes("mil") || clean.includes("k") || clean.includes("thousand") || clean.includes("тыс")) {
    return Math.round(base * 1000);
  }
  if (base >= 100) return Math.round(base); // número sin sufijo
  return null;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ── Intenta varias URLs hasta obtener datos ───────────────────
async function fetchGroupMembers(grupo, cookieHeader) {
  const urls = buildUrls(grupo);

  for (const url of urls) {
    const { html, error, status } = await fetchPage(url, cookieHeader);

    if (error === "redirect_login") {
      return { miembros: null, estado: "cookies_expiradas", url };
    }
    if (error) continue; // intentar siguiente URL

    const miembros = extractMemberCount(html);
    if (miembros !== null) {
      return { miembros, estado: "ok", url };
    }

    // Debug: guardar HTML si es muy corto (posible página de error)
    if (html.length < 3000) {
      return { miembros: null, estado: `sin_datos_short_${html.length}`, url, html };
    }
  }

  return { miembros: null, estado: "sin_datos", url: urls[0] || grupo.url };
}

// ── Debug mejorado ─────────────────────────────────────────────
function debugGroup(html, groupName, url) {
  console.log(`\n   🔍 DEBUG: ${groupName} → ${url}`);
  console.log(`   HTML length: ${html.length} chars`);

  // Buscar fragmentos con números grandes
  const numberSnippets = [];
  for (const m of [...html.matchAll(/\b\d{3,}[\d,.\s]*\b/g)]) {
    const n = parseInt(m[0].replace(/[^0-9]/g, ""), 10);
    if (n >= 1000 && n <= 50_000_000) {
      const start = Math.max(0, m.index - 40);
      const end = Math.min(html.length, m.index + 60);
      numberSnippets.push(html.slice(start, end).replace(/\s+/g, " ").trim());
    }
    if (numberSnippets.length >= 3) break;
  }

  if (numberSnippets.length) {
    console.log(`   Números grandes encontrados:`);
    numberSnippets.forEach((s) => console.log(`     …${s}…`));
  }

  // Buscar contexto de member/miembro
  const memberCtx = html.match(/.{0,60}(?:member|miembro|membre).{0,60}/gi);
  if (memberCtx) {
    console.log(`   Contexto "member": ${memberCtx.slice(0, 2).join(" | ").replace(/\s+/g, " ")}`);
  } else {
    console.log(`   No se encontró "member/miembro" en el HTML`);
  }

  if ((html.includes("login") || html.includes("checkpoint")) && html.length < 8000) {
    console.log(`   ⚠️  Posible página de login o checkpoint`);
  }
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  if (!FB_COOKIES) {
    console.error("❌ Falta FB_COOKIES en los secrets");
    process.exit(1);
  }

  const cookieHeader = buildCookieHeader(FB_COOKIES);
  if (!cookieHeader) {
    console.error("❌ No se pudieron parsear las cookies (formato inválido)");
    process.exit(1);
  }

  // Verificar que las cookies contienen tokens esenciales
  const hasDatr = cookieHeader.includes("datr=");
  const hasC_user = cookieHeader.includes("c_user=");
  const hasXs = cookieHeader.includes("xs=");
  console.log(`🍪 Cookies cargadas | datr:${hasDatr ? "✅" : "❌"} | c_user:${hasC_user ? "✅" : "❌"} | xs:${hasXs ? "✅" : "❌"}`);

  if (!hasC_user || !hasXs) {
    console.warn("⚠️  Las cookies pueden estar incompletas. Se necesitan al menos: c_user, xs, datr");
  }

  console.log(`📋 Grupos a procesar: ${GRUPOS.length}`);
  console.log(`🌐 Usando m.facebook.com → mbasic.facebook.com (fallback)\n`);

  const today = new Date().toISOString().split("T")[0];
  const results = [];
  let debugCount = 0;

  for (let i = 0; i < GRUPOS.length; i++) {
    const grupo = GRUPOS[i];
    process.stdout.write(`[${String(i + 1).padStart(2, "0")}/${GRUPOS.length}] ${grupo.name}... `);

    const { miembros, estado, url, html } = await fetchGroupMembers(grupo, cookieHeader);

    if (estado === "cookies_expiradas") {
      console.log("⚠️  cookies expiradas/inválidas");
      results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado });
    } else if (miembros !== null) {
      console.log(`✅ ${miembros.toLocaleString()} miembros`);
      results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros, estado: "ok" });
    } else {
      console.log(`⚠️  N/A (${estado})`);
      if (debugCount < 5 && html) {
        debugGroup(html, grupo.name, url);
        debugCount++;
      }
      results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado });
    }

    if (i < GRUPOS.length - 1) {
      // Pausa variable 2–4 segundos para evitar rate limiting
      const pausa = 2000 + Math.floor(Math.random() * 2000);
      await sleep(pausa);
    }
  }

  // ── Resumen ────────────────────────────────────────────────
  const totalMiembros = results.reduce((s, r) => s + (r.miembros || 0), 0);
  const conDatos      = results.filter((r) => r.estado === "ok").length;
  const sinDatos      = results.filter((r) => r.estado !== "ok").length;

  console.log("\n════════════════════════════════════════════");
  console.log(`📅 Fecha         : ${today}`);
  console.log(`👥 TOTAL MIEMBROS: ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Con datos     : ${conDatos}/${GRUPOS.length}`);
  console.log(`⚠️  Sin datos     : ${sinDatos}/${GRUPOS.length}`);
  console.log("════════════════════════════════════════════");

  // ── Guardar archivos ───────────────────────────────────────
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const historyFile = path.join(dataDir, "history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    try { history = JSON.parse(fs.readFileSync(historyFile, "utf8")); } catch { }
  }
  history.push({ fecha: today, total: totalMiembros, conDatos, grupos: results });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  const csv =
    "fecha,nombre,url,miembros,estado\n" +
    results.map((r) => `${r.fecha},"${r.nombre}","${r.url}",${r.miembros ?? ""},${r.estado}`).join("\n");
  fs.writeFileSync(path.join(dataDir, `miembros_${today}.csv`), csv);

  fs.writeFileSync(
    path.join(dataDir, "latest.json"),
    JSON.stringify({ fecha: today, total: totalMiembros, conDatos, sinDatos, grupos: results }, null, 2)
  );

  console.log(`\n💾 Guardado: data/history.json | data/latest.json | data/miembros_${today}.csv`);

  // ── GitHub Actions Step Summary ────────────────────────────
  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = results
      .map((r) => `| ${r.nombre} | ${r.miembros?.toLocaleString() ?? "N/A"} | ${r.estado === "ok" ? "✅" : "⚠️"} |`)
      .join("\n");

    const summary =
      `## 📊 Miembros de Grupos - ${today}\n` +
      `| | |\n|---|---|\n` +
      `| 👥 **Total** | **${totalMiembros.toLocaleString()}** |\n` +
      `| ✅ Con datos | ${conDatos}/${GRUPOS.length} |\n` +
      `| ⚠️ Sin datos | ${sinDatos}/${GRUPOS.length} |\n\n` +
      `<details><summary>Ver detalle por grupo</summary>\n\n` +
      `| Grupo | Miembros | Estado |\n|---|---|---|\n${rows}\n` +
      `</details>\n`;

    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  console.log("\n✅ Completado");

  // Salir con código de error si ningún grupo tuvo datos
  if (conDatos === 0) {
    console.error("\n❌ FALLO TOTAL: Ningún grupo devolvió datos. Las cookies pueden estar expiradas.");
    process.exit(1);
  }
}

main().catch((err) => { console.error("💥", err); process.exit(1); });
