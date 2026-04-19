const https = require("https");
const fs = require("fs");
const path = require("path");

const APIFY_TOKEN = process.env.APIFY_TOKEN;

const GRUPOS = [
  { name: "Cubanos en Florida-1",                    url: "https://www.facebook.com/groups/cubanosenflorida1/" },
  { name: "Reserva de Vuelos Cuba - Rusia",           url: "https://www.facebook.com/groups/8856301654435091/" },
  { name: "Cubanos en Dubai-1",                       url: "https://www.facebook.com/groups/8481964255255929/" },
  { name: "Cubanos en Nicaragua-1",                   url: "https://www.facebook.com/groups/cubanosennicaragua1/" },
  { name: "Revolico Matanzas",                        url: "https://www.facebook.com/groups/6166833830005702/" },
  { name: "REVOLICO CIEGO DE AVILA",                  url: "https://www.facebook.com/groups/5111591572270244/" },
  { name: "Reservas de Vuelos Cuba - Panamá",         url: "https://www.facebook.com/groups/2938946762934546/" },
  { name: "Revolico En la Habana",                    url: "https://www.facebook.com/groups/revolicoenlahabanacu/" },
  { name: "Cubanos en CDMX-1",                       url: "https://www.facebook.com/groups/cubanosencdmx1/" },
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

// ── Apify HTTP helper ──────────────────────────────────────────
function apifyRequest(method, urlPath, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.apify.com",
      path: urlPath,
      method,
      headers: { "Content-Type": "application/json" },
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(Buffer.concat(chunks).toString()) }); }
        catch { resolve({ status: res.statusCode, data: null }); }
      });
    });
    req.on("error", reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error("timeout")); });
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Lanzar actor ───────────────────────────────────────────────
async function startRun(actorId, input) {
  const { status, data } = await apifyRequest(
    "POST",
    `/v2/acts/${actorId}/runs?token=${APIFY_TOKEN}`,
    input
  );
  if (status !== 201 || !data?.data?.id) {
    throw new Error(`HTTP ${status}: ${JSON.stringify(data?.error || data)}`);
  }
  return data.data.id;
}

// ── Esperar resultado ──────────────────────────────────────────
async function waitForRun(runId, timeoutMs = 30 * 60 * 1000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await sleep(15000);
    const { status, data } = await apifyRequest("GET", `/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
    if (status !== 200) throw new Error(`HTTP ${status} consultando run`);
    const s = data?.data?.status;
    const elapsed = Math.round((Date.now() - start) / 1000);
    process.stdout.write(`\r⏳ ${elapsed}s | estado: ${s}          `);
    if (["SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"].includes(s)) {
      console.log();
      return data.data;
    }
  }
  throw new Error("Timeout esperando Apify");
}

// ── Obtener items del dataset ──────────────────────────────────
async function getItems(datasetId) {
  const { status, data } = await apifyRequest(
    "GET",
    `/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=500&clean=true`
  );
  if (status !== 200) throw new Error(`HTTP ${status} obteniendo dataset`);
  return Array.isArray(data) ? data : (data?.items || []);
}

// ── Extraer memberCount de un item (estructura flexible) ───────
function extractCount(item) {
  // Recorrer recursivamente el objeto buscando claves de conteo
  const keys = ["memberCount", "member_count", "membersCount", "members_count",
                 "totalMembers", "total_members", "members", "groupMembers"];
  for (const k of keys) {
    if (typeof item[k] === "number" && item[k] > 0) return item[k];
    if (typeof item[k] === "string" && /^\d+$/.test(item[k])) return parseInt(item[k]);
  }
  // Buscar en subobjetos comunes
  for (const sub of ["info", "groupInfo", "about", "details", "group"]) {
    if (item[sub] && typeof item[sub] === "object") {
      const v = extractCount(item[sub]);
      if (v) return v;
    }
  }
  return null;
}

// ── Mapear items Apify → grupos ────────────────────────────────
function mapResults(items, grupos) {
  // Índice por URL normalizada e ID
  const byUrl = new Map();
  const byId  = new Map();

  for (const item of items) {
    const count = extractCount(item);
    if (!count) continue;

    const rawUrl = item.url || item.pageUrl || item.groupUrl || item.inputUrl || "";
    const normUrl = rawUrl.replace(/\/$/, "").toLowerCase();
    if (normUrl) byUrl.set(normUrl, count);

    const id = String(item.id || item.groupId || item.group_id || "");
    if (id) byId.set(id, count);

    // A veces la URL de input viene en item.input
    if (item.input?.url) {
      const u = item.input.url.replace(/\/$/, "").toLowerCase();
      byUrl.set(u, count);
    }
  }

  console.log(`\n📦 Items Apify: ${items.length} | Con memberCount: ${byUrl.size + byId.size}`);

  return grupos.map(g => {
    const normUrl = g.url.replace(/\/$/, "").toLowerCase();
    let count = byUrl.get(normUrl);

    if (!count) {
      const idM = g.url.match(/groups\/(\d+)/);
      if (idM) count = byId.get(idM[1]);
    }

    if (!count) {
      // Búsqueda parcial por slug
      const slugM = g.url.match(/groups\/([^/?#]+)/);
      if (slugM) {
        for (const [k, v] of byUrl.entries()) {
          if (k.includes(slugM[1].toLowerCase())) { count = v; break; }
        }
      }
    }

    return { nombre: g.name, url: g.url, miembros: count || null, estado: count ? "ok" : "sin_datos" };
  });
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  if (!APIFY_TOKEN) { console.error("❌ Falta APIFY_TOKEN"); process.exit(1); }

  console.log(`📋 Grupos: ${GRUPOS.length} | Token: ${APIFY_TOKEN.slice(0,8)}...`);

  const today = new Date().toISOString().split("T")[0];
  const groupUrls = GRUPOS.map(g => g.url);

  // ── Configuraciones de actores a intentar (en orden) ────────
  // Apify tiene varios actores para Facebook Groups; probamos el más
  // confiable primero y caemos al siguiente si falla.
  const ACTOR_CONFIGS = [
    {
      id: "apify~facebook-groups-scraper",
      label: "facebook-groups-scraper (oficial)",
      input: {
        startUrls: groupUrls.map(url => ({ url })),
        maxPosts: 0,
        maxPostComments: 0,
        scrapeAbout: true,
        scrapePosts: false,
      },
    },
    {
      id: "zuzka~facebook-group-scraper",
      label: "facebook-group-scraper (zuzka)",
      input: {
        groupUrls: groupUrls,
        maxItems: 1,
      },
    },
    {
      id: "curious_coder~facebook-groups-scraper",
      label: "facebook-groups-scraper (curious_coder)",
      input: {
        startUrls: groupUrls.map(url => ({ url })),
        maxPosts: 0,
      },
    },
  ];

  let runData = null;
  let usedActor = null;

  for (const cfg of ACTOR_CONFIGS) {
    try {
      console.log(`\n🚀 Intentando: ${cfg.label}`);
      const runId = await startRun(cfg.id, cfg.input);
      console.log(`   Run ID: ${runId}`);
      const result = await waitForRun(runId);

      if (result.status === "SUCCEEDED" && result.defaultDatasetId) {
        runData = result;
        usedActor = cfg.label;
        break;
      } else {
        console.warn(`   ⚠️  Terminó con estado: ${result.status}`);
      }
    } catch (err) {
      console.warn(`   ⚠️  Error: ${err.message}`);
    }
  }

  if (!runData) {
    console.error("\n❌ Todos los actores de Apify fallaron.");
    console.error("Verifica que APIFY_TOKEN tiene saldo y acceso a actores de Facebook.");
    process.exit(1);
  }

  console.log(`\n✅ Actor exitoso: ${usedActor}`);
  console.log(`📥 Obteniendo dataset: ${runData.defaultDatasetId}`);

  const items = await getItems(runData.defaultDatasetId);
  console.log(`📦 Items recibidos: ${items.length}`);

  // Debug: estructura del primer item
  if (items.length > 0) {
    console.log(`\n🔍 Claves del primer item: ${Object.keys(items[0]).join(", ")}`);
    const sample = {};
    for (const k of Object.keys(items[0]).slice(0, 15)) sample[k] = items[0][k];
    console.log(JSON.stringify(sample, null, 2).slice(0, 800));
  }

  const mapped = mapResults(items, GRUPOS);
  const results = mapped.map(r => ({ fecha: today, ...r }));

  const totalMiembros = results.reduce((s, r) => s + (r.miembros || 0), 0);
  const conDatos  = results.filter(r => r.estado === "ok").length;
  const sinDatos  = results.filter(r => r.estado !== "ok").length;

  // Tabla de resultados
  console.log("\n" + "═".repeat(55));
  for (const r of results) {
    const tag = r.miembros ? `✅ ${r.miembros.toLocaleString()}` : "⚠️  N/A";
    console.log(`${r.nombre.slice(0,38).padEnd(40)} ${tag}`);
  }
  console.log("═".repeat(55));
  console.log(`📅 Fecha:          ${today}`);
  console.log(`👥 TOTAL MIEMBROS: ${totalMiembros.toLocaleString()}`);
  console.log(`✅ Con datos:      ${conDatos}/${GRUPOS.length}`);
  console.log(`⚠️  Sin datos:      ${sinDatos}/${GRUPOS.length}`);
  console.log("═".repeat(55));

  // ── Guardar archivos ───────────────────────────────────────
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const historyFile = path.join(dataDir, "history.json");
  let history = [];
  if (fs.existsSync(historyFile)) {
    try { history = JSON.parse(fs.readFileSync(historyFile, "utf8")); } catch {}
  }
  history.push({ fecha: today, total: totalMiembros, conDatos, grupos: results });
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));

  const csv = "fecha,nombre,url,miembros,estado\n" +
    results.map(r => `${r.fecha},"${r.nombre}","${r.url}",${r.miembros ?? ""},${r.estado}`).join("\n");
  fs.writeFileSync(path.join(dataDir, `miembros_${today}.csv`), csv);

  fs.writeFileSync(path.join(dataDir, "latest.json"),
    JSON.stringify({ fecha: today, total: totalMiembros, conDatos, sinDatos, grupos: results }, null, 2));

  // Raw Apify para debug
  fs.writeFileSync(path.join(dataDir, `apify_raw_${today}.json`), JSON.stringify(items, null, 2));

  console.log(`\n💾 data/history.json | data/latest.json | data/miembros_${today}.csv`);

  // GitHub Actions Summary
  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = results.map(r =>
      `| ${r.nombre} | ${r.miembros?.toLocaleString() ?? "N/A"} | ${r.estado === "ok" ? "✅" : "⚠️"} |`
    ).join("\n");
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      `## 📊 Miembros de Grupos - ${today}\n` +
      `| | |\n|---|---|\n` +
      `| 👥 **Total** | **${totalMiembros.toLocaleString()}** |\n` +
      `| ✅ Con datos | ${conDatos}/${GRUPOS.length} |\n` +
      `| ⚠️ Sin datos | ${sinDatos}/${GRUPOS.length} |\n` +
      `| 🤖 Actor | ${usedActor} |\n\n` +
      `<details><summary>Ver detalle</summary>\n\n` +
      `| Grupo | Miembros | Estado |\n|---|---|---|\n${rows}\n</details>\n`
    );
  }

  console.log("\n✅ Completado");
  if (conDatos === 0) {
    console.error("❌ Ningún grupo con datos. Revisa APIFY_TOKEN y saldo.");
    process.exit(1);
  }
}

main().catch(err => { console.error("💥", err); process.exit(1); });
