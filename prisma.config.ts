/**
 * Config Prisma minimale (Prisma 6).
 * Pas d'import @prisma/internals pour éviter les erreurs en build (ex. Hostinger).
 * La vraie config est dans prisma/schema.prisma et .env (DATABASE_URL).
 */
export default {
  schema: 'prisma/schema.prisma',
}
