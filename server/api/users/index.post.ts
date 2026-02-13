import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name: string; email: string }>(event)
  if (!body?.name || !body?.email) {
    throw createError({ statusCode: 400, message: 'Name and email are required' })
  }
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  })
  return user
})
