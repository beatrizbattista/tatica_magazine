import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

// Test the built Worker, not the development server. No cloud credentials needed.
const remote = process.env.SMOKE_BASE_URL;
let server;
let logs = "";
let base;
if (remote) {
  base = new URL(remote);
} else {
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const { port } = reservation.address();
  await new Promise((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()));
  base = new URL(`http://127.0.0.1:${port}`);
  server = spawn(process.execPath, [
    "node_modules/wrangler/bin/wrangler.js", "dev", "--config", "dist/server/wrangler.json",
    "--local", "--ip", "127.0.0.1", "--port", String(port), "--inspector-port", "0",
  ], {
    env: { ...process.env, WRANGLER_SEND_METRICS: "false", CLOUDFLARE_CF_FETCH_ENABLED: "false" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.on("error", error => { logs += error.message; });
  for (const stream of [server.stdout, server.stderr]) {
    stream.on("data", chunk => { logs = (logs + chunk.toString()).slice(-12000); });
  }
}

async function get(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response;
}

try {
  let html;
  let lastError;
  const deadline = Date.now() + 90000;
  while (Date.now() < deadline) {
    if (server && (server.exitCode !== null || server.signalCode !== null)) {
      throw new Error(`Worker encerrou antes do teste.\n${logs}`);
    }
    try {
      const response = await get("/");
      if (!response.headers.get("content-type")?.includes("text/html")) throw new Error("Resposta nao e HTML");
      html = await response.text();
      break;
    } catch (error) { lastError = error; await delay(500); }
  }
  if (!html) throw new Error(`Aplicacao indisponivel: ${lastError}\n${logs}`);
  for (const expected of ["Quem Está Olhando?", 'lang="pt-BR"', 'id="inicio"', 'id="equipe"', "ABRIR SUMÁRIO"]) {
    if (!html.includes(expected)) throw new Error(`Conteudo esperado ausente: ${expected}`);
  }
  const resources = [...html.matchAll(/(?:src|href)="([^"#?]+\.(?:js|css)(?:\?[^" ]*)?)"/g)]
    .map(match => new URL(match[1].replaceAll("&amp;", "&"), base))
    .filter(url => url.origin === base.origin);
  if (!resources.some(url => url.pathname.endsWith(".js")) || !resources.some(url => url.pathname.endsWith(".css"))) {
    throw new Error("HTML sem os recursos JavaScript e CSS esperados");
  }
  for (const resource of new Set(resources.map(url => url.href))) {
    const response = await get(resource);
    const type = response.headers.get("content-type") || "";
    if (type.includes("text/html")) throw new Error(`Recurso retornou HTML: ${resource}`);
    if ((await response.arrayBuffer()).byteLength === 0) throw new Error(`Recurso vazio: ${resource}`);
  }
  console.log(`OK: pagina principal, idioma, sumario, equipe e ${resources.length} recursos JS/CSS em ${base.origin}`);
} finally {
  if (server?.pid && server.exitCode === null) {
    if (process.platform === "win32") {
      // Wrangler launches workerd as a child; stop the entire test process tree.
      const stop = spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
      await once(stop, "close");
    } else {
      server.kill("SIGTERM");
      await Promise.race([once(server, "close"), delay(5000)]);
      if (server.exitCode === null) server.kill("SIGKILL");
    }
  }
}
