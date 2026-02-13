#!/usr/bin/env node
/**
 * Crée la table users dans la base MySQL (alternative à prisma db push)
 * Usage: node scripts/create-users-table.mjs
 */

import { createConnection } from 'mysql2/promise'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Charger .env
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
} catch (e) {}

const host = process.env.DATABASE_HOST || 'localhost'
const port = parseInt(process.env.DATABASE_PORT || '3306')
const user = process.env.DATABASE_USER || 'root'
const password = process.env.DATABASE_PASSWORD || ''
const database = process.env.DATABASE_NAME || 'test'

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(25) NOT NULL PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE KEY users_email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`

console.log('Création de la table users...')

try {
  const conn = await createConnection({
    host,
    port,
    user,
    password,
    database,
  })

  await conn.execute(SQL)
  console.log('✅ Table users créée avec succès!')
  await conn.end()
  process.exit(0)
} catch (err) {
  console.error('❌ Erreur:', err.message)
  process.exit(1)
}
