import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Tester la connexion et lire les utilisateurs
    const users = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      message: 'Connexion MySQL réussie! ✅',
      count: users.length,
      users: users
    }
  } catch (error: any) {
    console.error('Erreur MySQL:', error)
    return {
      success: false,
      error: error.message || 'Erreur de connexion à la base de données'
    }
  }
})
