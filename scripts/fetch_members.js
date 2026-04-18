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
      // Manejar redirecciones
      if (res.statusCode === 301 || res.statusCode === 302) {
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
function extractMemberCount(html) {
  if (!html || html.length < 1000) return null;

  // 🔒 1. JSON fiable (mejor fuente)
  const jsonMatch = html.match(/"member_count"\s*:\s*(\d{2,})/);
  if (jsonMatch) {
    const val = parseInt(jsonMatch[1], 10);
    if (val > 50) return val;
  }

  // 🔒 2. numberOfMembers (schema)
  const schemaMatch = html.match(/"numberOfMembers"\s*:\s*(\d{2,})/);
  if (schemaMatch) {
    const val = parseInt(schemaMatch[1], 10);
    if (val > 50) return val;
  }

  // 🔒 3. Texto completo (ej: 12,345 miembros)
  const fullText = html.match(/(\d{1,3}(?:[.,]\d{3})+)\s*(miembros|members)/i);
  if (fullText) {
    const val = parseInt(fullText[1].replace(/[.,]/g, ""), 10);
    if (val > 50) return val;
  }

  // 🔒 4. Formato abreviado (ej: 12.3K o 12,3 mil)
  const shortText = html.match(/([\d,.]+)\s*(K|mil)\s*(miembros|members)?/i);
  if (shortText) {
    const num = parseFloat(shortText[1].replace(",", "."));
    const val = Math.round(num * 1000);
    if (val > 50) return val;
  }

  // ❌ Si no encontramos nada fiable → null
  return null;
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
  console.log(`\n⏳ Procesando grupos (1 por segundo para no ser bloqueado)...\n`);

  const today = new Date().toISOString().split("T")[0];
  const results = [];

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
        // Debug para el primer grupo sin datos
        if (results.filter((r) => r.estado === "sin_datos").length === 0) {
          console.log(`⚠️  N/A (HTTP ${status})`);
          // Guardar fragmento del HTML para diagnóstico
          const snippet = html.slice(0, 3000);
          fs.writeFileSync("/tmp/debug_html.txt", snippet);
          console.log("   🔍 Fragmento HTML guardado en /tmp/debug_html.txt");

          // Buscar cualquier número grande en el HTML como pista
          const bigNumbers = [...html.matchAll(/\b(\d{3,})\b/g)]
            .map((m) => parseInt(m[1]))
            .filter((n) => n > 100 && n < 10000000)
            .slice(0, 10);
          if (bigNumbers.length) {
            console.log(`   🔢 Números encontrados en HTML: ${bigNumbers.join(", ")}`);
          }
        } else {
          process.stdout.write(`⚠️  N/A\n`);
        }
        results.push({ fecha: today, nombre: grupo.name, url: grupo.url, miembros: null, estado: "sin_datos" });
      }
    }

    // Pausa entre requests para evitar bloqueo
    if (i < GRUPOS.length - 1) await sleep(1500);
  }

  // Resumen
  const totalMiembros = results.reduce((s, r) => s + (r.miembros || 0), 0);
  const conDatos = results.filter((r) => r.estado === "ok").length;
  const sinDatos = results.filter((r) => r.estado !== "ok").length;

  console.log("\n════════════════════════════════════════════");
  console.log(`📅 Fecha         : ${today}`);
  console.log(`👥 TOTAL MIEMBROS: ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Con datos     : ${conDatos}/${GRUPOS.length}`);
  console.log(`⚠️  Sin datos     : ${sinDatos}/${GRUPOS.length}`);
  console.log("════════════════════════════════════════════");

  // Guardar archivos
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const historyFile = path.join(dataDir, "history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    try { history = JSON.parse(fs.readFileSync(historyFile, "utf8")); } catch { }
  }
  history.push({ fecha: today, total: totalMiembros, conDatos, grupos: results });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  const csv = "fecha,nombre,url,miembros,estado\n" +
    results.map((r) => `${r.fecha},"${r.nombre}","${r.url}",${r.miembros ?? ""},${r.estado}`).join("\n");
  fs.writeFileSync(path.join(dataDir, `miembros_${today}.csv`), csv);
  fs.writeFileSync(
    path.join(dataDir, "latest.json"),
    JSON.stringify({ fecha: today, total: totalMiembros, conDatos, sinDatos, grupos: results }, null, 2)
  );

  console.log(`\n💾 Guardado: data/history.json | data/latest.json | data/miembros_${today}.csv`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const summary = `## 📊 Miembros de Grupos - ${today}\n| | |\n|---|---|\n| 👥 **Total** | **${totalMiembros.toLocaleString()}** |\n| ✅ Con datos | ${conDatos}/${GRUPOS.length} |\n| ⚠️ Sin datos | ${sinDatos}/${GRUPOS.length} |\n\n<details><summary>Ver detalle por grupo</summary>\n\n| Grupo | Miembros | Estado |\n|---|---|---|\n${results.map((r) => `| ${r.nombre} | ${r.miembros?.toLocaleString() ?? "N/A"} | ${r.estado === "ok" ? "✅" : "⚠️"} |`).join("\n")}\n</details>\n`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  console.log("\n✅ Completado");
}

main().catch((err) => { console.error("💥", err); process.exit(1); });
