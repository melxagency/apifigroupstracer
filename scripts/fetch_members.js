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
    const cookies = JSON.parse(cookiesJson);
    return cookies.map((c) => `${c.name}=${c.value}`).join("; ");
  } catch {
    return "";
  }
}

// ── Versión móvil de Facebook (mbasic) ────────────────────────
// mbasic.facebook.com sirve HTML puro sin JavaScript, idéntico para
// grupos grandes y pequeños. Es la forma más fiable de obtener datos
// estáticos como el conteo de miembros.
function buildMbasicUrl(groupUrl) {
  // https://www.facebook.com/groups/XXX/ → https://mbasic.facebook.com/groups/XXX/
  return groupUrl.replace("https://www.facebook.com/", "https://mbasic.facebook.com/");
}

// ── Fetch HTML ─────────────────────────────────────────────────
function fetchPage(fullUrl, cookieHeader) {
  return new Promise((resolve) => {
    const urlObj = new URL(fullUrl);

    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers: {
        // User-Agent de móvil Android — coherente con mbasic.facebook.com
        "User-Agent": "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "identity",
        "Cookie": cookieHeader,
        "Referer": "https://mbasic.facebook.com/",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    };

    const req = https.request(options, (res) => {
      // Seguir redirecciones manualmente (hasta 3 saltos)
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
        const location = res.headers.location || "";
        if (location.includes("login") || location.includes("checkpoint")) {
          resolve({ html: "", error: "redirect_login", status: res.statusCode });
          return;
        }
        // Redirigir a la nueva URL
        const nextUrl = location.startsWith("http") ? location : `https://${urlObj.hostname}${location}`;
        fetchPage(nextUrl, cookieHeader).then(resolve);
        return;
      }

      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ html: data, status: res.statusCode, error: null }));
    });

    req.on("error", (err) => resolve({ html: "", error: err.message, status: 0 }));
    req.setTimeout(25000, () => { req.destroy(); resolve({ html: "", error: "timeout", status: 0 }); });
    req.end();
  });
}

// ── Extraer conteo de miembros del HTML de mbasic ─────────────
// mbasic.facebook.com incluye el número exacto en texto plano,
// sin JavaScript ni ofuscación. Formatos observados:
//
//   "· 66,975 members"           (inglés)
//   "· 66 975 membres"           (francés)
//   "· 66.975 miembros"          (español, punto como sep. de miles)
//   "· 66,975 miembros"          (español, coma como sep. de miles)
//   "Members\n66,975"
//   JSON embebido: "member_count":66975
//
function extractMemberCount(html) {
  if (!html || html.length < 500) return null;

  const candidates = [];

  // ── 1. Patrones de texto visible en mbasic (más fiables) ──────
  // mbasic muestra el número exacto sin abreviar en el encabezado del grupo
  const visiblePatterns = [
    // "66,975 members" / "66 975 miembros" / "66.975 miembros"
    /\b(\d{1,3}(?:[,.\s]\d{3})+)\s*(?:members?|miembros?|membres?)\b/gi,
    // Sin separador de miles (grupos pequeños): "975 miembros"
    /\b(\d{3,7})\s*(?:members?|miembros?|membres?)\b/gi,
    // Formato "Members · 66,975" o "Miembros · 66 975"
    /(?:members?|miembros?)\s*[·•:]\s*([\d][\d\s,._]+)/gi,
    /[·•]\s*([\d][\d\s,._]+)\s*(?:members?|miembros?)/gi,
  ];

  for (const re of visiblePatterns) {
    for (const m of [...html.matchAll(re)]) {
      // El grupo de captura puede ser el 1 o el 2 dependiendo del patrón
      const raw = m[1] || m[2] || "";
      const val = parseInt(raw.replace(/[\s,._]/g, ""), 10);
      if (!isNaN(val) && val >= 1 && val <= 50_000_000) candidates.push(val);
    }
  }

  // ── 2. JSON embebido: MÁXIMO de todos los "member_count" ──────
  // Facebook a veces incluye JSON en mbasic también; tomamos el MAX
  // porque los valores pequeños son ruido interno.
  for (const m of [...html.matchAll(/"member_count"\s*:\s*(\d+)/g)]) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= 50_000_000) candidates.push(n);
  }
  for (const m of [...html.matchAll(/"members_count"\s*:\s*(\d+)/g)]) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= 50_000_000) candidates.push(n);
  }

  // ── 3. member_count_text abreviado ────────────────────────────
  for (const m of [...html.matchAll(/"member_count_text"\s*:\s*"([^"]{1,30})"/g)]) {
    const text = m[1];
    const milM = text.match(/([\d]+[.,][\d]+)\s*mil/i);
    const kM   = text.match(/([\d]+[.,][\d]+)\s*[Kk]/i);
    const pl   = text.match(/^[\s"']*(\d[\d\s,._]*)[\s"']*$/);
    if (milM) candidates.push(Math.round(parseFloat(milM[1].replace(",", ".")) * 1000));
    else if (kM) candidates.push(Math.round(parseFloat(kM[1].replace(",", ".")) * 1000));
    else if (pl) {
      const v = parseInt(pl[1].replace(/[\s,._]/g, ""), 10);
      if (!isNaN(v) && v >= 1) candidates.push(v);
    }
  }

  if (candidates.length === 0) return null;
  return Math.max(...candidates);
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// ── Diagnóstico para grupos sin datos ─────────────────────────
function debugGroup(html, groupName) {
  console.log(`\n   🔍 DEBUG: ${groupName}`);
  console.log(`   HTML length: ${html.length} chars`);

  // Buscar cualquier número de 3+ dígitos cerca de palabras clave
  const snippets = [];
  for (const re of [/member/gi, /miembro/gi, /membre/gi]) {
    const m = html.match(new RegExp(`.{0,60}${re.source}.{0,60}`, "gi"));
    if (m) snippets.push(...m.slice(0, 3));
  }
  if (snippets.length) {
    console.log(`   Contexto "member/miembro": ${snippets.slice(0, 3).join(" | ").replace(/\s+/g, " ")}`);
  } else {
    console.log(`   No se encontró "member/miembro" en el HTML`);
  }

  // Verificar si la página es de login
  if (html.includes("login") && html.length < 5000) {
    console.log(`   ⚠️  Posible página de login (HTML corto + "login")`);
  }
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  if (!FB_COOKIES) {
    console.error("❌ Falta FB_COOKIES en los secrets de GitHub");
    process.exit(1);
  }

  const cookieHeader = buildCookieHeader(FB_COOKIES);
  if (!cookieHeader) {
    console.error("❌ No se pudieron parsear las cookies");
    process.exit(1);
  }

  console.log(`🍪 Cookies cargadas correctamente`);
  console.log(`📋 Grupos a procesar: ${GRUPOS.length}`);
  console.log(`🌐 Usando mbasic.facebook.com (HTML puro, sin JS)\n`);

  const today = new Date().toISOString().split("T")[0];
  const results = [];
  let debugCount = 0; // Mostrar debug solo para los primeros 3 fallos

  for (let i = 0; i < GRUPOS.length; i++) {
    const grupo = GRUPOS[i];
    process.stdout.write(`[${String(i + 1).padStart(2, "0")}/${GRUPOS.length}] ${grupo.name}... `);

    const mbasicUrl = buildMbasicUrl(grupo.url);
    const { html, error, status } = await fetchPage(mbasicUrl, cookieHeader);

    if (error === "redirect_login") {
      console.log("⚠️  cookies expiradas");
      results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado: "cookies_expiradas" });

    } else if (error) {
      console.log(`⚠️  error: ${error}`);
      results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado: "error" });

    } else {
      const miembros = extractMemberCount(html);

      if (miembros !== null) {
        console.log(`✅ ${miembros.toLocaleString()} miembros`);
        results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros, estado: "ok" });
      } else {
        console.log(`⚠️  N/A (HTTP ${status})`);
        if (debugCount < 3) {
          debugGroup(html, grupo.name);
          debugCount++;
        }
        results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado: "sin_datos" });
      }
    }

    // Pausa variable para evitar detección de bots
    // Grupos grandes: pausa un poco más larga
    if (i < GRUPOS.length - 1) {
      const pausa = 1500 + Math.floor(Math.random() * 500);
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
}

main().catch((err) => { console.error("💥", err); process.exit(1); });
