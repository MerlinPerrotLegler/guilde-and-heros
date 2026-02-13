#!/usr/bin/env node
/**
 * Test de connexion MySQL direct (sans Prisma)
 * Usage: node scripts/test-db-connection.mjs
 *
 * Charge .env via dotenv si disponible, sinon utilise les vars d'environnement.
 */

import { createConnection } from 'mysql2/promise'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Charger .env manuellement si présent
try {
  const envPath = join(__dirname, '..', '.env')
  const env = readFileSync(envPath, 'utf-8')
  for (const line of env.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = value
    }
  }
} catch (e) {
  // .env optionnel
}

const host = process.env.DATABASE_HOST || 'localhost'
const port = parseInt(process.env.DATABASE_PORT || '3306')
const user = process.env.DATABASE_USER || 'root'
const password = process.env.DATABASE_PASSWORD || ''
const database = process.env.DATABASE_NAME || 'test'

console.log('Test connexion MySQL...')
console.log(`  Host: ${host}:${port}`)
console.log(`  User: ${user}`)
console.log(`  Database: ${database}`)
console.log('')

try {
  const conn = await createConnection({
    host,
    port,
    user,
    password,
    database,
    connectTimeout: 10000,
  })

  const [rows] = await conn.execute('SELECT 1 + 1 AS result, VERSION() AS version')
  console.log('✅ Connexion réussie!')
  console.log(`   MySQL version: ${rows[0].version}`)

  await conn.end()
  process.exit(0)
} catch (err) {
  console.error('❌ Erreur de connexion:')
  console.error(`   ${err.message}`)
  if (err.code) console.error(`   Code: ${err.code}`)
  process.exit(1)
}
