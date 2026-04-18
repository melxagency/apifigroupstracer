const https = require("https");
const fs = require("fs");
const path = require("path");

// ── Configuración ──────────────────────────────────────────────
const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "scrapebase/facebook-group-profile-scraper";
const FB_COOKIES = process.env.FB_COOKIES; // JSON string con cookies de Facebook

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

// ── Helpers HTTP ───────────────────────────────────────────────
function apiRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.apify.com",
      path,
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
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
        }
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

// ── Esperar que el run termine ─────────────────────────────────
async function waitForRun(runId) {
  console.log(`⏳ Esperando run ${runId}...`);
  for (let i = 0; i < 60; i++) {
    await sleep(15000); // cada 15 segundos
    const res = await apiRequest("GET", `/v2/acts/${encodeURIComponent(ACTOR_ID)}/runs/${runId}?token=${APIFY_TOKEN}`);
    const status = res?.data?.status;
    console.log(`   Status: ${status}`);
    if (status === "SUCCEEDED") return true;
    if (["FAILED", "ABORTED", "TIMED-OUT"].includes(status)) {
      console.error(`❌ Run terminó con status: ${status}`);
      return false;
    }
  }
  console.error("❌ Timeout esperando el run");
  return false;
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  if (!APIFY_TOKEN) {
    console.error("❌ Falta APIFY_TOKEN en las variables de entorno");
    process.exit(1);
  }

  const startUrls = GRUPOS.map((g) => ({ url: g.url }));
  let cookies = [];
  if (FB_COOKIES) {
    try {
      cookies = JSON.parse(FB_COOKIES);
    } catch {
      console.warn("⚠️ FB_COOKIES no es JSON válido, se intentará sin cookies");
    }
  }

  // Input para el Actor
  const input = {
    startUrls,
    ...(cookies.length > 0 && { cookies }),
    maxRequestsPerCrawl: GRUPOS.length + 10,
  };

  console.log(`🚀 Iniciando Actor con ${GRUPOS.length} grupos...`);

  // Lanzar el run
  const runRes = await apiRequest(
    "POST",
    `/v2/acts/${encodeURIComponent(ACTOR_ID)}/runs?token=${APIFY_TOKEN}`,
    input
  );

  const runId = runRes?.data?.id;
  const datasetId = runRes?.data?.defaultDatasetId;

  if (!runId) {
    console.error("❌ No se pudo obtener runId:", JSON.stringify(runRes, null, 2));
    process.exit(1);
  }

  console.log(`✅ Run iniciado: ${runId}`);
  console.log(`📦 Dataset: ${datasetId}`);

  // Esperar resultado
  const ok = await waitForRun(runId);
  if (!ok) process.exit(1);

  // Obtener resultados del dataset
  console.log("📥 Descargando resultados...");
  const dataRes = await apiRequest(
    "GET",
    `/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&format=json`
  );

  const items = Array.isArray(dataRes) ? dataRes : dataRes?.data?.items || [];
  console.log(`📊 Items recibidos: ${items.length}`);

  // Mapear resultados con los grupos originales
  const today = new Date().toISOString().split("T")[0];
  const results = GRUPOS.map((grupo) => {
    // Buscar el item que corresponde a este grupo
    const match = items.find((item) => {
      const itemUrl = (item.url || item.groupUrl || item.inputUrl || "").toLowerCase();
      return itemUrl.includes(grupo.url.replace("https://www.facebook.com/groups/", "").replace("/", ""));
    });

    return {
      fecha: today,
      nombre: grupo.name,
      url: grupo.url,
      miembros: match?.memberCount ?? match?.members ?? match?.membersCount ?? match?.totalMembers ?? null,
      estado: match ? "ok" : "sin_datos",
    };
  });

  // Calcular total
  const totalMiembros = results.reduce((sum, r) => sum + (r.miembros || 0), 0);
  const gruposConDatos = results.filter((r) => r.miembros !== null).length;

  console.log("\n════════════════════════════════════════");
  console.log(`📅 Fecha: ${today}`);
  console.log(`👥 Total miembros (suma): ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Grupos con datos: ${gruposConDatos}/${GRUPOS.length}`);
  console.log("════════════════════════════════════════\n");

  results.forEach((r) => {
    const mem = r.miembros !== null ? r.miembros.toLocaleString() : "N/A";
    console.log(`  ${r.nombre}: ${mem}`);
  });

  // Guardar resultados en JSON
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  // Histórico acumulado
  const historyFile = path.join(dataDir, "history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
  }
  history.push({ fecha: today, total: totalMiembros, grupos: results });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  // Resultado del día en CSV
  const csvFile = path.join(dataDir, `miembros_${today}.csv`);
  const csvHeader = "fecha,nombre,url,miembros,estado\n";
  const csvRows = results
    .map((r) => `${r.fecha},"${r.nombre}","${r.url}",${r.miembros ?? ""},${r.estado}`)
    .join("\n");
  fs.writeFileSync(csvFile, csvHeader + csvRows);

  // Último resultado en latest.json
  const latestFile = path.join(dataDir, "latest.json");
  fs.writeFileSync(
    latestFile,
    JSON.stringify({ fecha: today, total: totalMiembros, gruposConDatos, grupos: results }, null, 2)
  );

  console.log(`\n💾 Archivos guardados:`);
  console.log(`   data/history.json`);
  console.log(`   data/miembros_${today}.csv`);
  console.log(`   data/latest.json`);

  // Output para GitHub Actions summary
  const summary = `## 📊 Reporte de Miembros - ${today}

| Métrica | Valor |
|---|---|
| 👥 Total miembros | **${totalMiembros.toLocaleString()}** |
| ✅ Grupos con datos | ${gruposConDatos}/${GRUPOS.length} |
| 📅 Fecha | ${today} |

### Detalle por grupo

| Grupo | Miembros | Estado |
|---|---|---|
${results.map((r) => `| ${r.nombre} | ${r.miembros !== null ? r.miembros.toLocaleString() : "N/A"} | ${r.estado === "ok" ? "✅" : "⚠️"} |`).join("\n")}
`;

  // Escribir al GitHub Step Summary si estamos en Actions
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
  }

  console.log("\n✅ Proceso completado exitosamente");
}

main().catch((err) => {
  console.error("💥 Error fatal:", err);
  process.exit(1);
});
