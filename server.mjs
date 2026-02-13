/**
 * Point d'entrée à la racine pour hébergeurs qui lancent "node server.mjs".
 * Charge .env depuis la racine du projet puis le serveur Nitro.
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import 'dotenv/config'

// Binding explicite pour éviter 503 sur hébergeurs (proxy doit joindre l'app)
// Nitro lit NITRO_HOST/HOST et NITRO_PORT/PORT au démarrage
if (!process.env.HOST) process.env.HOST = '0.0.0.0'
if (!process.env.NITRO_HOST) process.env.NITRO_HOST = '0.0.0.0'
if (!process.env.PORT && !process.env.NITRO_PORT) process.env.PORT = '3000'

const __dirname = dirname(fileURLToPath(import.meta.url))
const entry = join(__dirname, '.output', 'server', 'index.mjs')

console.log('[Guildes] Démarrage du serveur…', entry, 'HOST=' + process.env.HOST, 'PORT=' + (process.env.PORT || process.env.NITRO_PORT))
try {
  await import(pathToFileURL(entry).href)
  console.log('[Guildes] Serveur Nitro chargé.')
} catch (err) {
  console.error('[Guildes] Erreur au démarrage:', err)
  process.exit(1)
}
