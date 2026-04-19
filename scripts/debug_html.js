const https = require("https");
const fs = require("fs");

const FB_COOKIES = process.env.FB_COOKIES;

// Solo el primer grupo para diagnóstico
const TEST_GROUP = {
  name: "Cubanos en Florida-1",
  id: "cubanosenflorida1",
  numericId: null, // no tiene ID numérico, solo slug
};

function buildCookieHeader(cookiesJson) {
  try {
    const parsed = JSON.parse(cookiesJson);
    if (Array.isArray(parsed)) return parsed.map((c) => `${c.name}=${c.value}`).join("; ");
    return Object.entries(parsed).map(([k, v]) => `${k}=${v}`).join("; ");
  } catch {
    if (typeof cookiesJson === "string" && cookiesJson.includes("=")) return cookiesJson;
    return "";
  }
}

function fetchPage(url, cookieHeader, ua) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const req = https.request({
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers: {
        "User-Agent": ua,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en-US;q=0.8",
        "Accept-Encoding": "identity",
        "Cookie": cookieHeader,
        "Cache-Control": "no-cache",
      },
    }, (res) => {
      // Seguir redirección una vez
      if ([301,302,303,307].includes(res.statusCode)) {
        const loc = res.headers.location || "";
        console.log(`  → Redirige a: ${loc}`);
        if (loc.includes("login") || loc.includes("checkpoint")) {
          resolve({ html: "", status: res.statusCode, redirectTo: loc, error: "login_redirect" });
          return;
        }
        const next = loc.startsWith("http") ? loc : `https://${urlObj.hostname}${loc}`;
        fetchPage(next, cookieHeader, ua).then(resolve);
        return;
      }
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve({ html: Buffer.concat(chunks).toString("utf8"), status: res.statusCode, error: null }));
    });
    req.on("error", e => resolve({ html: "", status: 0, error: e.message }));
    req.setTimeout(20000, () => { req.destroy(); resolve({ html: "", status: 0, error: "timeout" }); });
    req.end();
  });
}

async function main() {
  const cookieHeader = buildCookieHeader(FB_COOKIES);
  
  const UA_IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
  const UA_ANDROID = "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36";
  const UA_DESKTOP = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  const tests = [
    { url: "https://m.facebook.com/groups/cubanosenflorida1/", ua: UA_IPHONE,  label: "m.facebook + iPhone UA" },
    { url: "https://m.facebook.com/groups/cubanosenflorida1/", ua: UA_ANDROID, label: "m.facebook + Android UA" },
    { url: "https://mbasic.facebook.com/groups/cubanosenflorida1/", ua: UA_ANDROID, label: "mbasic + Android UA" },
    { url: "https://www.facebook.com/groups/cubanosenflorida1/", ua: UA_DESKTOP, label: "www + Desktop UA" },
  ];

  for (const test of tests) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Probando: ${test.label}`);
    console.log(`URL: ${test.url}`);
    
    const { html, status, error, redirectTo } = await fetchPage(test.url, cookieHeader, test.ua);
    
    console.log(`Status: ${status} | HTML length: ${html.length} | Error: ${error || "none"}`);
    if (redirectTo) console.log(`Redirect: ${redirectTo}`);
    
    if (html.length > 0) {
      // Guardar HTML completo para inspección
      const filename = `debug_${test.label.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.html`;
      fs.writeFileSync(filename, html);
      console.log(`HTML guardado: ${filename}`);
      
      // Buscar "member" en contexto
      const memberMatches = [...html.matchAll(/.{0,80}(?:member|miembro|membre).{0,80}/gi)];
      console.log(`\nOcurrencias de "member/miembro" (primeras 5):`);
      memberMatches.slice(0, 5).forEach(m => 
        console.log(`  …${m[0].replace(/\s+/g, " ").trim()}…`)
      );
      
      // Buscar números grandes (posibles conteos)
      const bigNumbers = [];
      for (const m of html.matchAll(/\b(\d{4,})\b/g)) {
        const n = parseInt(m[1]);
        if (n >= 1000 && n <= 10_000_000) {
          const ctx = html.slice(Math.max(0, m.index-30), m.index+50).replace(/\s+/g, " ");
          bigNumbers.push(`${n.toLocaleString()} → …${ctx}…`);
          if (bigNumbers.length >= 5) break;
        }
      }
      console.log(`\nNúmeros grandes encontrados (primeros 5):`);
      bigNumbers.forEach(n => console.log(`  ${n}`));
      
      // Buscar JSON member_count
      const jsonMatches = [...html.matchAll(/"(?:member|members?)_?[Cc]ount[^"]*"\s*:\s*(\d+)/g)];
      console.log(`\nJSON member_count:`);
      jsonMatches.slice(0, 5).forEach(m => console.log(`  ${m[0]}`));
      
      // ¿Está logueado?
      const isLoggedIn = html.includes("logout") || html.includes("log_out") || 
                         html.includes("c_user") || html.includes("profile.php");
      console.log(`\n¿Parece estar logueado?: ${isLoggedIn ? "SÍ ✅" : "NO ❌"}`);
      
      // Primeros 500 chars del body para ver qué tipo de página es
      const bodyMatch = html.match(/<body[^>]*>([\s\S]{0,500})/i);
      if (bodyMatch) {
        console.log(`\nInicio del body:`);
        console.log(bodyMatch[1].replace(/\s+/g, " ").trim());
      }
    }
    
    // Pausa entre requests
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log(`\n${"=".repeat(60)}`);
  console.log("✅ Debug completado. Revisa los archivos .html generados.");
}

main().catch(e => { console.error("💥", e); process.exit(1); });
