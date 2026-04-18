const https = require("https");
const fs = require("fs");
const path = require("path");

const FB_COOKIES = process.env.FB_COOKIES;

const GRUPOS = [
  { name: "Cubanos en Florida-1", url: "https://www.facebook.com/groups/cubanosenflorida1/" },
  { name: "Reserva de Vuelos Cuba - Rusia", url: "https://www.facebook.com/groups/8856301654435091/" },
  { name: "Cubanos en Dubai-1", url: "https://www.facebook.com/groups/8481964255255929/" },
  { name: "Cubanos en Nicaragua-1", url: "https://www.facebook.com/groups/cubanosennicaragua1/" },
  { name: "Revolico Matanzas", url: "https://www.facebook.com/groups/6166833830005702/" },
  { name: "REVOLICO CIEGO DE AVILA", url: "https://www.facebook.com/groups/5111591572270244/" },
  { name: "Reservas de Vuelos Cuba - Panamá", url: "https://www.facebook.com/groups/2938946762934546/" },
  { name: "Revolico En la Habana", url: "https://www.facebook.com/groups/revolicoenlahabanacu/" },
  { name: "Cubanos en CDMX-1", url: "https://www.facebook.com/groups/cubanosencdmx1/" },
  { name: "Reservas de Vuelos Cuba - Nicaragua", url: "https://www.facebook.com/groups/ventasvueloscubanicaragua1/" },
  { name: "Cubanos en West Palm-1", url: "https://www.facebook.com/groups/cubanosenwestpalm/" },
  { name: "COMPRA VENTA EN HOLGUÍN", url: "https://www.facebook.com/groups/compradedivisasholguin/" },
  { name: "Cubanos en Mexico-1", url: "https://www.facebook.com/groups/cubanosenmexico11/" },
  { name: "Cubanos en Madrid-1", url: "https://www.facebook.com/groups/1793848928019756/" },
  { name: "Renta de autos en Cuba", url: "https://www.facebook.com/groups/1710355106466724/" },
  { name: "Cubanos en Estados Unidos-1", url: "https://www.facebook.com/groups/cubanosenestadosunido/" },
  { name: "Cubanos en Mexico DF-1", url: "https://www.facebook.com/groups/cubanosenmexicodf/" },
  { name: "Reserva de Vuelos Cuba - Mexico", url: "https://www.facebook.com/groups/1669575096953824/" },
  { name: "Cubanos en Rusia-1", url: "https://www.facebook.com/groups/1638163006763331/" },
  { name: "Envíos a Cuba desde Orlando", url: "https://www.facebook.com/groups/1586579855232010/" },
  { name: "Cubanos en Estados Unidos-2", url: "https://www.facebook.com/groups/1475292780033710/" },
  { name: "Cubanos en Uruguay-1", url: "https://www.facebook.com/groups/cubanosenuruguay1/" },
  { name: "Renta de autos Clásicos en Cuba", url: "https://www.facebook.com/groups/1447313812632874/" },
  { name: "Cubanos en Nueva York-1", url: "https://www.facebook.com/groups/1393590281134164/" },
  { name: "Cubanos en Tapachula-1", url: "https://www.facebook.com/groups/cubanosentapachula/" },
  { name: "Cubanos en Austin Texas-1", url: "https://www.facebook.com/groups/1250722932600050/" },
  { name: "Reservas de Vuelos Cuba - Guyana", url: "https://www.facebook.com/groups/1200494574644363/" },
  { name: "Revolico La Habana Cuba", url: "https://www.facebook.com/groups/1196671070795170/" },
  { name: "Cubanos en Montevideo Uruguay-1", url: "https://www.facebook.com/groups/cubanosenmontevideo1/" },
  { name: "Cubanos en Guyana-1", url: "https://www.facebook.com/groups/1192059578753923/" },
  { name: "Cubanos en Louisville-1", url: "https://www.facebook.com/groups/cubanosenlouisville1/" },
  { name: "Cubanos en España-1", url: "https://www.facebook.com/groups/1131940885160919/" },
  { name: "Cubanos en California-1", url: "https://www.facebook.com/groups/cubanosencalifornia1/" },
  { name: "Cubanos en Surinam-1", url: "https://www.facebook.com/groups/1099280141817883/" },
  { name: "Cubanos en Puebla (Mexico)-1", url: "https://www.facebook.com/groups/cubanosenpuebla/" },
  { name: "Envíos a Cuba desde Miami", url: "https://www.facebook.com/groups/1078984147279844/" },
  { name: "Cubanos en Orlando-1", url: "https://www.facebook.com/groups/cubanosenorlando1/" },
  { name: "Cubanos en Tampa-1", url: "https://www.facebook.com/groups/cubanosentampa/" },
  { name: "Envíos a Cuba desde Florida", url: "https://www.facebook.com/groups/1045885620427058/" },
  { name: "Cubanos en Fort Lauderdale-1", url: "https://www.facebook.com/groups/1042739023970914/" },
  { name: "Ciberseguridad y Denuncia Cuba", url: "https://www.facebook.com/groups/ciberseguridadcuba/" },
  { name: "Ventas en toda la Habana", url: "https://www.facebook.com/groups/999020703807085/" },
  { name: "Cubanos en Toronto-1", url: "https://www.facebook.com/groups/cubanosentoronto1/" },
  { name: "Cubanos en Cancún-1", url: "https://www.facebook.com/groups/cubanosencancun1/" },
  { name: "Reserva de Vuelos Cuba - Nicaragua-2", url: "https://www.facebook.com/groups/907496870991545/" },
  { name: "Cubanos en Nueva Jersey-1", url: "https://www.facebook.com/groups/863786915709008/" },
  { name: "Reserva de Hoteles en Cuba", url: "https://www.facebook.com/groups/860252276064532/" },
  { name: "Cubanos en Monterrey México", url: "https://www.facebook.com/groups/857947516509744/" },
  { name: "Reservas Vuelos EEUU - Cuba", url: "https://www.facebook.com/groups/839944551318267/" },
  { name: "Cubanos en Ciudad de Mexico-1", url: "https://www.facebook.com/groups/cubanosenciudaddemexico1/" },
  { name: "Cubanos en Miami-2", url: "https://www.facebook.com/groups/cubanosenmiami2/" },
  { name: "TIENDA VIRTUAL HOLGUÍN", url: "https://www.facebook.com/groups/tiendavirtualholguin/" },
  { name: "Trabajo para Cubanos en Miami-1", url: "https://www.facebook.com/groups/trabajoparacubanosenmiami1/" },
  { name: "Reservas Vuelos Cuba - Guyana 2", url: "https://www.facebook.com/groups/583963487621974/" },
  { name: "Anuncios en La Habana", url: "https://www.facebook.com/groups/568661464773769/" },
  { name: "Cubanos en Moscú Rusia-1", url: "https://www.facebook.com/groups/566482719102207/" },
  { name: "Cubanos en Georgetown Guyana-1", url: "https://www.facebook.com/groups/556178317094936/" },
  { name: "Cubanos en Málaga", url: "https://www.facebook.com/groups/545541007851013/" },
  { name: "Cubanos en Uruguay-2", url: "https://www.facebook.com/groups/536552832594558/" },
  { name: "Cubanos en Ohio-1", url: "https://www.facebook.com/groups/526380219975366/" },
  { name: "Cubanos en Katy Texas-1", url: "https://www.facebook.com/groups/497862709831151/" },
  { name: "Cubanos en Mexico-2", url: "https://www.facebook.com/groups/481233711027273/" },
  { name: "Reservas Vuelos Cuba - Uruguay", url: "https://www.facebook.com/groups/480678754379552/" },
  { name: "Cubanos en Ottawa Canadá-1", url: "https://www.facebook.com/groups/449814127723696/" },
  { name: "Envíos a Cuba desde Houston", url: "https://www.facebook.com/groups/440364635656790/" },
  { name: "Cubanos en Houston-2", url: "https://www.facebook.com/groups/434744529655372/" },
  { name: "Bueno Bonito Barato Santiago de Cuba", url: "https://www.facebook.com/groups/419935192381004/" },
  { name: "Cubanos en Canadá-1", url: "https://www.facebook.com/groups/cubanosencanada1/" },
  { name: "REVOLICO SANTA CLARA", url: "https://www.facebook.com/groups/revolicosantaclara1/" },
  { name: "Compra y venta Revolico Santiago de Cuba", url: "https://www.facebook.com/groups/372602027276911/" },
  { name: "Cubanos en Texas-1", url: "https://www.facebook.com/groups/cubanosentexas1/" },
  { name: "REVOLICO COMPRA VENTA HOLGUÍN", url: "https://www.facebook.com/groups/revolicocompraventaholguin/" },
  { name: "Cubanos en Las Vegas-1", url: "https://www.facebook.com/groups/cubanosenlasvegas1/" },
  { name: "Cubanos en Florida-2", url: "https://www.facebook.com/groups/cubanosenflorida2/" },
  { name: "Reservas Vuelos Cuba - Rep. Dominicana", url: "https://www.facebook.com/groups/325210957300002/" },
  { name: "Cubanos en Houston-1", url: "https://www.facebook.com/groups/cubanosenhouston1/" },
  { name: "Cubanos en Miami-1", url: "https://www.facebook.com/groups/285484860940817" },
  { name: "Cubanos en Kentucky-1", url: "https://www.facebook.com/groups/cubanosenkentucky1/" },
  { name: "Revolico Habana (ventas)", url: "https://www.facebook.com/groups/249366053545622/" },
  { name: "COMPRA Y VENTA EN CIENFUEGOS", url: "https://www.facebook.com/groups/revolicocienfuegos1/" },
  { name: "Reservas Vuelos Cuba - Uruguay 2", url: "https://www.facebook.com/groups/2261107397601516/" },
  { name: "Reservas Vuelos Cuba - Brasil", url: "https://www.facebook.com/groups/2163845177296476/" },
  { name: "Reservas Vuelos Cuba - Guyana 3", url: "https://www.facebook.com/groups/1760352071445266/" },
  { name: "Envíos a Cuba desde Kentucky", url: "https://www.facebook.com/groups/1710976649688975/" },
  { name: "Cubanos en Kentucky-2", url: "https://www.facebook.com/groups/1704354747044774/" },
  { name: "Cubanos en Montreal Canadá-1", url: "https://www.facebook.com/groups/1985567971886403/" },
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

// ── Fetch HTML de un grupo ─────────────────────────────────────
function fetchGroupPage(url, cookieHeader) {
  return new Promise((resolve) => {
    const options = {
      hostname: "www.facebook.com",
      path: "/" + url.replace("https://www.facebook.com/", ""),
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
        "Accept-Encoding": "identity",
        "Cookie": cookieHeader,
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Cache-Control": "no-cache",
      },
    };

    const req = https.request(options, (res) => {
      // Seguir redirecciones simples (no hacia login)
      if ((res.statusCode === 301 || res.statusCode === 302)) {
        const redirectUrl = res.headers.location || "";
        if (redirectUrl.includes("login") || redirectUrl.includes("checkpoint")) {
          resolve({ html: "", error: "redirect_login" });
          return;
        }
      }

      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ html: data, status: res.statusCode }));
    });

    req.on("error", (err) => resolve({ html: "", error: err.message }));
    req.setTimeout(20000, () => { req.destroy(); resolve({ html: "", error: "timeout" }); });
    req.end();
  });
}

// ── Extraer memberCount del HTML de Facebook ──────────────────
// ESTRATEGIA: Facebook embebe "member_count":NÚMERO muchas veces en el HTML,
// pero la mayoría son valores internos pequeños (IDs de config, etc.).
// El conteo REAL de miembros es siempre el valor MÁS ALTO entre todos los
// matches de "member_count", ya que un grupo tiene miles/millones de miembros
// y los valores falsos son típicamente < 100.
function extractMemberCount(html) {
  if (!html || html.length < 100) return null;

  const candidates = [];

  // ── Estrategia 1: Todos los "member_count":N del JSON embebido ──
  // Tomamos TODOS los valores y nos quedamos con el máximo
  const memberCountMatches = [...html.matchAll(/"member_count"\s*:\s*(\d+)/g)];
  for (const m of memberCountMatches) {
    const n = parseInt(m[1], 10);
    if (n >= 10 && n <= 50_000_000) candidates.push(n);
  }

  const memberCountTextMatches = [...html.matchAll(/"members_count"\s*:\s*(\d+)/g)];
  for (const m of memberCountTextMatches) {
    const n = parseInt(m[1], 10);
    if (n >= 10 && n <= 50_000_000) candidates.push(n);
  }

  // ── Estrategia 2: Texto visible en la página ──
  // "67.400 miembros", "1,234 members", "67,4 mil miembros", "12.5K members"
  const textPatterns = [
    // Español — "X mil miembros" (ej: "67,4 mil miembros" → 67400)
    { re: /([\d]+[.,][\d]+)\s*mil\s*miembros/gi, factor: 1000, decimal: true },
    { re: /(\d+)\s*mil\s*miembros/gi, factor: 1000, decimal: false },
    // Inglés — "X.XK members" (ej: "12.5K members" → 12500)
    { re: /([\d]+[.,][\d]+)\s*[Kk]\s*members?/g, factor: 1000, decimal: true },
    { re: /(\d+)\s*[Kk]\s*members?/g, factor: 1000, decimal: false },
    // Número completo con separadores de miles (punto o coma como separador)
    // Español: "67.400 miembros"
    { re: /(\d{1,3}(?:\.\d{3})+)\s*miembros/gi, factor: 1, decimal: false, dotThousands: true },
    // Inglés: "67,400 members"
    { re: /(\d{1,3}(?:,\d{3})+)\s*members?/gi, factor: 1, decimal: false, commaThousands: true },
    // Sin separador: "67400 miembros" / "67400 members"
    { re: /(\d{4,})\s*miembros/gi, factor: 1, decimal: false },
    { re: /(\d{4,})\s*members?/gi, factor: 1, decimal: false },
  ];

  for (const { re, factor, decimal, dotThousands, commaThousands } of textPatterns) {
    for (const m of [...html.matchAll(re)]) {
      let raw = m[1];
      let val;

      if (dotThousands) {
        // "67.400" → quitar puntos → 67400
        val = parseInt(raw.replace(/\./g, ""), 10);
      } else if (commaThousands) {
        // "67,400" → quitar comas → 67400
        val = parseInt(raw.replace(/,/g, ""), 10);
      } else if (decimal) {
        // "67,4" o "67.4" → float → * factor
        val = Math.round(parseFloat(raw.replace(",", ".")) * factor);
      } else {
        val = parseInt(raw, 10) * factor;
      }

      if (!isNaN(val) && val >= 10 && val <= 50_000_000) candidates.push(val);
    }
  }

  // ── Estrategia 3: "member_count_text" con texto como "67,4 mil" ──
  const memberCountTextStr = [...html.matchAll(/"member_count_text"\s*:\s*"([^"]+)"/g)];
  for (const m of memberCountTextStr) {
    const text = m[1];
    // "67,4 mil" o "67.4K" o "1,234"
    const milMatch = text.match(/([\d]+[.,][\d]+)\s*mil/i);
    const kMatch = text.match(/([\d]+[.,][\d]+)\s*[Kk]/i);
    const plainMatch = text.match(/^([\d.,]+)$/);

    if (milMatch) {
      const val = Math.round(parseFloat(milMatch[1].replace(",", ".")) * 1000);
      if (val >= 10 && val <= 50_000_000) candidates.push(val);
    } else if (kMatch) {
      const val = Math.round(parseFloat(kMatch[1].replace(",", ".")) * 1000);
      if (val >= 10 && val <= 50_000_000) candidates.push(val);
    } else if (plainMatch) {
      const val = parseInt(plainMatch[1].replace(/[.,]/g, ""), 10);
      if (val >= 10 && val <= 50_000_000) candidates.push(val);
    }
  }

  if (candidates.length === 0) return null;

  // El conteo real de miembros es el valor MÁS ALTO entre todos los candidatos.
  // Los valores falsos (config interna de Facebook) son siempre pequeños.
  return Math.max(...candidates);
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

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
  console.log(`\n⏳ Procesando grupos...\n`);

  const today = new Date().toISOString().split("T")[0];
  const results = [];
  let debugSaved = false;

  for (let i = 0; i < GRUPOS.length; i++) {
    const grupo = GRUPOS[i];
    process.stdout.write(`[${String(i + 1).padStart(2, "0")}/${GRUPOS.length}] ${grupo.name}... `);

    const { html, error, status } = await fetchGroupPage(grupo.url, cookieHeader);

    if (error === "redirect_login") {
      console.log("⚠️  redirigido a login (cookies expiradas)");
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

        // Guardar HTML del primer grupo sin datos para diagnóstico
        if (!debugSaved) {
          debugSaved = true;
          fs.writeFileSync("/tmp/debug_html.txt", html.slice(0, 5000));
          // Mostrar todos los "member_count" encontrados para diagnóstico
          const allMC = [...html.matchAll(/"member_count"\s*:\s*(\d+)/g)].map(m => m[1]);
          if (allMC.length) {
            console.log(`   🔍 "member_count" values en HTML: ${allMC.join(", ")}`);
          } else {
            console.log(`   🔍 No se encontró "member_count" en el HTML`);
          }
        }

        results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado: "sin_datos" });
      }
    }

    // Pausa entre requests para evitar bloqueo
    if (i < GRUPOS.length - 1) await sleep(1500);
  }

  // ── Resumen ────────────────────────────────────────────────
  const totalMiembros = results.reduce((s, r) => s + (r.miembros || 0), 0);
  const conDatos = results.filter((r) => r.estado === "ok").length;
  const sinDatos = results.filter((r) => r.estado !== "ok").length;

  console.log("\n════════════════════════════════════════════");
  console.log(`📅 Fecha         : ${today}`);
  console.log(`👥 TOTAL MIEMBROS: ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Con datos     : ${conDatos}/${GRUPOS.length}`);
  console.log(`⚠️  Sin datos     : ${sinDatos}/${GRUPOS.length}`);
  console.log("════════════════════════════════════════════");

  // ── Guardar archivos ───────────────────────────────────────
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  // history.json — acumula todas las ejecuciones
  const historyFile = path.join(dataDir, "history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    try { history = JSON.parse(fs.readFileSync(historyFile, "utf8")); } catch { }
  }
  history.push({ fecha: today, total: totalMiembros, conDatos, grupos: results });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  // CSV diario
  const csv = "fecha,nombre,url,miembros,estado\n" +
    results.map((r) => `${r.fecha},"${r.nombre}","${r.url}",${r.miembros ?? ""},${r.estado}`).join("\n");
  fs.writeFileSync(path.join(dataDir, `miembros_${today}.csv`), csv);

  // latest.json — snapshot del último run
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
