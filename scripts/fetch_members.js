const https = require("https");
const fs = require("fs");
const path = require("path");

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const FB_COOKIES = process.env.FB_COOKIES;

// Actor gratuito que devuelve info del grupo incluyendo memberCount
// https://apify.com/easyapi/facebook-group-members-scraper
// Usamos el actor de búsqueda de grupos que devuelve member_count
const ACTOR_ID = "easyapi~facebook-group-members-scraper";

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

// ── Helpers ────────────────────────────────────────────────────
function apiRequest(method, urlPath, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.apify.com",
      path: urlPath,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIFY_TOKEN}`,
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function waitForRun(actorId, runId) {
  console.log(`⏳ Esperando run ${runId}...`);
  for (let i = 0; i < 80; i++) {
    await sleep(15000);
    const res = await apiRequest("GET", `/v2/acts/${encodeURIComponent(actorId)}/runs/${runId}`);
    const status = res?.data?.status;
    process.stdout.write(`   [${(i + 1) * 15}s] Status: ${status}\n`);
    if (status === "SUCCEEDED") return res.data.defaultDatasetId;
    if (["FAILED", "ABORTED", "TIMED-OUT"].includes(status)) {
      console.error(`❌ Run terminó con: ${status}`);
      console.error(JSON.stringify(res?.data?.stats || res?.data, null, 2));
      return null;
    }
  }
  return null;
}

// Busca recursivamente el campo memberCount en cualquier nivel del objeto
function findMemberCount(obj, depth = 0) {
  if (depth > 5 || !obj || typeof obj !== "object") return null;
  const memberKeys = [
    "memberCount","members","membersCount","totalMembers",
    "member_count","membersNumber","numberOfMembers","memberTotal",
    "groupMembers","numMembers","numOfMembers","subscriberCount",
  ];
  for (const key of memberKeys) {
    if (obj[key] !== undefined && obj[key] !== null) {
      const val = Number(obj[key]);
      if (!isNaN(val) && val > 0) return val;
    }
  }
  // Buscar en subkeys que contengan "member"
  for (const [key, val] of Object.entries(obj)) {
    if (key.toLowerCase().includes("member") && !isNaN(Number(val)) && Number(val) > 0) {
      return Number(val);
    }
  }
  // Recursivo en objetos anidados
  for (const val of Object.values(obj)) {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      const found = findMemberCount(val, depth + 1);
      if (found !== null) return found;
    }
  }
  return null;
}

function normalizeGroupId(url) {
  return url
    .replace("https://www.facebook.com/groups/", "")
    .replace(/\/$/, "")
    .toLowerCase()
    .trim();
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  if (!APIFY_TOKEN) { console.error("❌ Falta APIFY_TOKEN"); process.exit(1); }

  let cookies = [];
  if (FB_COOKIES) {
    try {
      cookies = JSON.parse(FB_COOKIES);
      console.log(`🍪 Cookies: ${cookies.length} cargadas`);
    } catch { console.warn("⚠️ FB_COOKIES inválido"); }
  }

  // ── Input para easyapi~facebook-group-members-scraper ────────
  // Este actor recibe groupUrls y devuelve info del grupo + memberCount
  const input = {
    groupUrls: GRUPOS.map((g) => g.url),
    ...(cookies.length > 0 && { cookies }),
    proxyConfiguration: { useApifyProxy: true },
  };

  console.log(`\n🚀 Actor: ${ACTOR_ID}`);
  console.log(`📋 Grupos: ${GRUPOS.length}`);

  const runRes = await apiRequest(
    "POST",
    `/v2/acts/${encodeURIComponent(ACTOR_ID)}/runs`,
    input
  );

  const runId = runRes?.data?.id;
  if (!runId) {
    console.error("❌ No se obtuvo runId:");
    console.error(JSON.stringify(runRes, null, 2));
    process.exit(1);
  }
  console.log(`✅ Run: ${runId}`);

  const datasetId = await waitForRun(ACTOR_ID, runId);
  if (!datasetId) process.exit(1);

  // Descargar resultados
  console.log(`\n📥 Descargando dataset: ${datasetId}`);
  const dataRes = await apiRequest("GET", `/v2/datasets/${datasetId}/items?format=json&clean=true`);
  const items = Array.isArray(dataRes) ? dataRes : (dataRes?.data?.items || []);
  console.log(`📦 Items: ${items.length}`);

  // Debug: estructura completa del primer item
  if (items.length > 0) {
    console.log("\n🔍 DEBUG — Primer item completo:");
    console.log(JSON.stringify(items[0], null, 2).slice(0, 1500));
    console.log("--- fin debug ---\n");
  }

  const today = new Date().toISOString().split("T")[0];

  const results = GRUPOS.map((grupo) => {
    const grupoId = normalizeGroupId(grupo.url);
    const match = items.find((item) => {
      const urls = [
        item.url, item.groupUrl, item.inputUrl, item.pageUrl,
        item.facebookUrl, item.groupLink, item.link,
      ].filter(Boolean).map((u) => u.toLowerCase());
      return urls.some((u) => u.includes(grupoId));
    });

    const miembros = match ? findMemberCount(match) : null;
    return {
      fecha: today,
      nombre: grupo.name,
      url: grupo.url,
      miembros,
      estado: match ? (miembros !== null ? "ok" : "sin_miembros") : "sin_datos",
    };
  });

  const totalMiembros = results.reduce((s, r) => s + (r.miembros || 0), 0);
  const conDatos = results.filter((r) => r.estado === "ok").length;
  const sinDatos = results.filter((r) => r.estado !== "ok").length;

  console.log("════════════════════════════════════════════");
  console.log(`📅 Fecha         : ${today}`);
  console.log(`👥 TOTAL MIEMBROS: ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Con datos     : ${conDatos}/${GRUPOS.length}`);
  console.log(`⚠️  Sin datos     : ${sinDatos}/${GRUPOS.length}`);
  console.log("════════════════════════════════════════════\n");
  results.forEach((r) => {
    const mem = r.miembros !== null ? r.miembros.toLocaleString().padStart(10) : "       N/A";
    console.log(`${r.estado === "ok" ? "✅" : "⚠️ "} ${mem}  ${r.nombre}`);
  });

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
    const summary = `## 📊 Miembros de Grupos - ${today}\n| | |\n|---|---|\n| 👥 **Total** | **${totalMiembros.toLocaleString()}** |\n| ✅ Con datos | ${conDatos}/${GRUPOS.length} |\n| ⚠️ Sin datos | ${sinDatos}/${GRUPOS.length} |\n\n<details><summary>Ver detalle</summary>\n\n| Grupo | Miembros |\n|---|---|\n${results.map((r) => `| ${r.nombre} | ${r.miembros?.toLocaleString() ?? "N/A"} |`).join("\n")}\n</details>\n`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  console.log("\n✅ Completado");
}

main().catch((err) => { console.error("💥", err); process.exit(1); });
