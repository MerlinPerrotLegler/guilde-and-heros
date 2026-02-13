/**
 * Point d'entrée à la racine pour hébergeurs qui lancent "node server.mjs".
 * Charge .env depuis la racine du projet puis le serveur Nitro.
 */
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const entry = join(__dirname, '.output', 'server', 'index.mjs')
await import(pathToFileURL(entry).href)
