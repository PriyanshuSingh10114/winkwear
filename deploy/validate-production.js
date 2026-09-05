// ==============================================================================
// WinkWear — Automated Post-Deployment Production Validator & Benchmark
// ==============================================================================
// Usage:
//   node deploy/validate-production.js https://api.winkwear.com https://winkwear.com
// ==============================================================================

const https = require("https");
const http = require("http");

const backendUrl = process.argv[2] || process.env.AWS_BACKEND_URL || "http://localhost:5000";
const frontendUrl = process.argv[3] || process.env.AWS_FRONTEND_URL || "http://localhost:5173";

function fetchUrl(url, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const lib = url.startsWith("https") ? https : http;
    const parsed = new URL(url);

    const req = lib.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || (url.startsWith("https") ? 443 : 80),
        path: parsed.pathname + parsed.search,
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip",
          "User-Agent": "WinkWear-Production-Validator/1.0",
        },
      },
      (res) => {
        let chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const duration = performance.now() - start;
          const buffer = Buffer.concat(chunks);
          resolve({
            status: res.statusCode,
            duration,
            size: buffer.length,
            headers: res.headers,
            body: buffer.toString("utf8"),
          });
        });
      }
    );

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runValidation() {
  console.log("==================================================");
  console.log("   WINKWEAR — AWS POST-DEPLOYMENT VALIDATION      ");
  console.log("==================================================");
  console.log(`Backend Target:  ${backendUrl}`);
  console.log(`Frontend Target: ${frontendUrl}\n`);

  const tests = [
    { name: "Health Check", url: `${backendUrl}/health`, expectedStatus: 200 },
    { name: "New Collection API", url: `${backendUrl}/newcollection`, expectedStatus: 200 },
    { name: "Popular in Women API", url: `${backendUrl}/popularinwomen`, expectedStatus: 200 },
    { name: "All Products (Paginated)", url: `${backendUrl}/allproducts?page=1&limit=5`, expectedStatus: 200 },
    { name: "Robots.txt", url: `${backendUrl}/robots.txt`, expectedStatus: 200 },
    { name: "Sitemap.xml", url: `${backendUrl}/sitemap.xml`, expectedStatus: 200 },
  ];

  console.log("[1] ENDPOINT HEALTH & FUNCTIONAL VALIDATION:\n");
  for (const t of tests) {
    try {
      const res = await fetchUrl(t.url);
      const pass = res.status === t.expectedStatus;
      const icon = pass ? "✓" : "❌";
      console.log(`  ${icon} ${t.name.padEnd(28)} -> HTTP ${res.status} (${res.duration.toFixed(1)}ms, ${res.size} bytes)`);
    } catch (err) {
      console.log(`  ❌ ${t.name.padEnd(28)} -> FAILED: ${err.code || err.message}`);
    }

  }

  console.log("\n[2] MULTI-RUN PRODUCTION LATENCY BENCHMARK (10 runs):\n");
  const benchmarkEndpoints = [
    { name: "GET /health", url: `${backendUrl}/health` },
    { name: "GET /newcollection", url: `${backendUrl}/newcollection` },
    { name: "GET /allproducts?page=1&limit=5", url: `${backendUrl}/allproducts?page=1&limit=5` },
  ];

  for (const ep of benchmarkEndpoints) {
    const times = [];
    let last = null;
    for (let i = 0; i < 10; i++) {
      try {
        const res = await fetchUrl(ep.url);
        times.push(res.duration);
        last = res;
      } catch (e) {}
    }
    if (times.length) {
      times.sort((a, b) => a - b);
      const min = times[0].toFixed(1);
      const max = times[times.length - 1].toFixed(1);
      const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1);
      const median = times[Math.floor(times.length / 2)].toFixed(1);
      const p95 = times[Math.floor(times.length * 0.95)].toFixed(1);
      console.log(`  ${ep.name}:`);
      console.log(`    Min: ${min}ms | Avg: ${avg}ms | Median: ${median}ms | P95: ${p95}ms | Max: ${max}ms | Size: ${last.size} bytes`);
    }
  }

  console.log("\n==================================================");
  console.log("   VALIDATION COMPLETED                           ");
  console.log("==================================================");
}

runValidation().catch(console.error);
