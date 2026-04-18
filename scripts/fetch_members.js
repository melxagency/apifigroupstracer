const https = require("https");
const fs = require("fs");
const path = require("path");
 
// ── Configuración ──────────────────────────────────────────────
const APIFY_TOKEN = process.env.APIFY_TOKEN;
 
// ✅ Actor GRATUITO oficial de Apify para grupos de Facebook
const ACTOR_ID = "apify~facebook-groups-scraper";
 
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
      res.on("data", (chunk) => (data += chunk));
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
 
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
 
async function waitForRun(runId) {
  console.log(`⏳ Esperando que el run termine...`);
  for (let i = 0; i < 80; i++) {
    await sleep(15000);
    const res = await apiRequest("GET", `/v2/acts/${encodeURIComponent(ACTOR_ID)}/runs/${runId}`);
    const status = res?.data?.status;
    process.stdout.write(`   [${i * 15}s] Status: ${status}\n`);
    if (status === "SUCCEEDED") return res.data.defaultDatasetId;
    if (["FAILED", "ABORTED", "TIMED-OUT"].includes(status)) {
      console.error(`❌ Run terminó con: ${status}`);
      console.error(JSON.stringify(res?.data, null, 2));
      return null;
    }
  }
  console.error("❌ Timeout: el run tardó demasiado");
  return null;
}
 
// Extrae el número de miembros desde cualquier campo que devuelva el actor
function extractMemberCount(item) {
  const fields = [
    "memberCount", "members", "membersCount", "totalMembers",
    "membersNumber", "groupMembers", "numberOfMembers",
    "stats.members", "groupInfo.memberCount",
  ];
  for (const f of fields) {
    const parts = f.split(".");
    let val = item;
    for (const p of parts) val = val?.[p];
    if (val !== undefined && val !== null && !isNaN(Number(val))) {
      return Number(val);
    }
  }
  // Buscar recursivamente cualquier campo que contenga "member" y sea número
  for (const [key, val] of Object.entries(item || {})) {
    if (key.toLowerCase().includes("member") && !isNaN(Number(val)) && Number(val) > 0) {
      return Number(val);
    }
  }
  return null;
}
 
// ── Main ───────────────────────────────────────────────────────
async function main() {
  if (!APIFY_TOKEN) {
    console.error("❌ Falta APIFY_TOKEN");
    process.exit(1);
  }
 
  // Parsear cookies
  let cookies = [];
  if (FB_COOKIES) {
    try {
      cookies = JSON.parse(FB_COOKIES);
      console.log(`🍪 Cookies cargadas: ${cookies.length} cookies`);
    } catch {
      console.warn("⚠️ FB_COOKIES no es JSON válido");
    }
  }
 
  const startUrls = GRUPOS.map((g) => ({ url: g.url }));
 
  // Input para el actor oficial de Apify
  const input = {
    startUrls,
    maxPosts: 0,          // Solo queremos info del grupo, no posts
    maxPostComments: 0,
    maxReviews: 0,
    ...(cookies.length > 0 && { cookies }),
  };
 
  console.log(`🚀 Lanzando actor: ${ACTOR_ID}`);
  console.log(`📋 Grupos a procesar: ${GRUPOS.length}`);
 
  const runRes = await apiRequest(
    "POST",
    `/v2/acts/${encodeURIComponent(ACTOR_ID)}/runs`,
    input
  );
 
  const runId = runRes?.data?.id;
  if (!runId) {
    console.error("❌ No se obtuvo runId. Respuesta completa:");
    console.error(JSON.stringify(runRes, null, 2));
    process.exit(1);
  }
 
  console.log(`✅ Run iniciado: ${runId}`);
 
  const datasetId = await waitForRun(runId);
  if (!datasetId) process.exit(1);
 
  // Descargar resultados
  console.log(`\n📥 Descargando resultados del dataset: ${datasetId}`);
  const dataRes = await apiRequest("GET", `/v2/datasets/${datasetId}/items?format=json&clean=true`);
  const items = Array.isArray(dataRes) ? dataRes : (dataRes?.data?.items || []);
  console.log(`📦 Items recibidos del actor: ${items.length}`);
 
  // Debug: mostrar estructura del primer item para diagnóstico
  if (items.length > 0) {
    console.log("\n🔍 Estructura del primer item (para debug):");
    console.log(JSON.stringify(items[0], null, 2).slice(0, 800));
  }
 
  // Cruzar resultados con la lista de grupos
  const today = new Date().toISOString().split("T")[0];
  const results = GRUPOS.map((grupo) => {
    const groupId = grupo.url
      .replace("https://www.facebook.com/groups/", "")
      .replace(/\/$/, "")
      .toLowerCase();
 
    const match = items.find((item) => {
      const itemUrl = (item.url || item.groupUrl || item.inputUrl || item.pageUrl || "").toLowerCase();
      return itemUrl.includes(groupId);
    });
 
    const miembros = match ? extractMemberCount(match) : null;
 
    return {
      fecha: today,
      nombre: grupo.name,
      url: grupo.url,
      miembros,
      estado: match ? (miembros !== null ? "ok" : "sin_miembros") : "sin_datos",
    };
  });
 
  // Totales
  const totalMiembros = results.reduce((s, r) => s + (r.miembros || 0), 0);
  const conDatos = results.filter((r) => r.estado === "ok").length;
  const sinDatos = results.filter((r) => r.estado !== "ok").length;
 
  console.log("\n════════════════════════════════════════════");
  console.log(`📅 Fecha       : ${today}`);
  console.log(`👥 TOTAL MIEMBROS: ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Con datos   : ${conDatos}/${GRUPOS.length}`);
  console.log(`⚠️  Sin datos   : ${sinDatos}/${GRUPOS.length}`);
  console.log("════════════════════════════════════════════\n");
 
  results.forEach((r) => {
    const mem = r.miembros !== null ? r.miembros.toLocaleString().padStart(10) : "       N/A";
    const icon = r.estado === "ok" ? "✅" : "⚠️ ";
    console.log(`${icon} ${mem}  ${r.nombre}`);
  });
 
  // Guardar archivos
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
 
  // history.json
  const historyFile = path.join(dataDir, "history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    try { history = JSON.parse(fs.readFileSync(historyFile, "utf8")); }
    catch { history = []; }
  }
  history.push({ fecha: today, total: totalMiembros, conDatos, grupos: results });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
 
  // CSV del día
  const csvFile = path.join(dataDir, `miembros_${today}.csv`);
  const csv = "fecha,nombre,url,miembros,estado\n" +
    results.map((r) => `${r.fecha},"${r.nombre}","${r.url}",${r.miembros ?? ""},${r.estado}`).join("\n");
  fs.writeFileSync(csvFile, csv);
 
  // latest.json
  fs.writeFileSync(
    path.join(dataDir, "latest.json"),
    JSON.stringify({ fecha: today, total: totalMiembros, conDatos, sinDatos, grupos: results }, null, 2)
  );
 
  console.log(`\n💾 Guardado en data/history.json, data/latest.json, data/miembros_${today}.csv`);
 
  // GitHub Step Summary
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summary = `## 📊 Miembros de Grupos - ${today}
| | |
|---|---|
| 👥 **Total miembros** | **${totalMiembros.toLocaleString()}** |
| ✅ Grupos con datos | ${conDatos} / ${GRUPOS.length} |
| ⚠️ Sin datos | ${sinDatos} / ${GRUPOS.length} |
 
<details><summary>Ver detalle por grupo</summary>
 
| Grupo | Miembros | Estado |
|---|---|---|
${results.map((r) => `| ${r.nombre} | ${r.miembros?.toLocaleString() ?? "N/A"} | ${r.estado === "ok" ? "✅" : "⚠️"} |`).join("\n")}
</details>
`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }
 
  console.log("\n✅ Completado exitosamente");
}
 
main().catch((err) => {
  console.error("💥 Error fatal:", err);
  process.exit(1);
});
