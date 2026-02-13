import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.name || !body.email) {
      throw new Error('Nom et email sont requis')
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (existingUser) {
      throw new Error('Cet email existe déjà')
    }

    // Créer le nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email
      }
    })

    return {
      success: true,
      message: 'Utilisateur créé avec succès',
      user: user
    }
  } catch (error: any) {
    console.error('Erreur création utilisateur:', error)
    throw createError({
      statusCode: 400,
      statusMessage: error.message || 'Erreur lors de la création'
    })
  }
})
