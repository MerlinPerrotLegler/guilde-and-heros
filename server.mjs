/**
 * Point d'entrée à la racine pour hébergeurs qui lancent "node server.mjs".
 * Charge le serveur Nitro (.output/server/index.mjs) en résolvant le chemin
 * depuis l'emplacement de ce fichier (pas le CWD).
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const entry = join(__dirname, '.output', 'server', 'index.mjs')
await import(pathToFileURL(entry).href)
