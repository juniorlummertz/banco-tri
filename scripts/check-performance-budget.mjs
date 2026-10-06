import { readdirSync, readFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import { join } from "node:path"

// Orçamento inicial para os arquivos gerados pelo Vite; ajustar com justificativa no PR.
const limits = { js: 150 * 1024, css: 30 * 1024 }
const assetsDir = join(process.cwd(), "dist", "assets")
const totals = { js: 0, css: 0 }

for (const name of readdirSync(assetsDir)) {
  const type = name.endsWith(".js") ? "js" : name.endsWith(".css") ? "css" : null
  if (type) totals[type] += gzipSync(readFileSync(join(assetsDir, name))).byteLength
}

if (totals.js === 0) throw new Error("Nenhum arquivo JavaScript foi encontrado em dist/assets.")

let exceeded = false
for (const [type, size] of Object.entries(totals)) {
  const limit = limits[type]
  console.log(`${type.toUpperCase()}: ${(size / 1024).toFixed(1)} KiB gzip / ${(limit / 1024).toFixed(0)} KiB`)
  if (size > limit) exceeded = true
}
if (exceeded) process.exitCode = 1
