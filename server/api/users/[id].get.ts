import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing user id' })
  }
  const user = await prisma.user.findUnique({
    where: { id },
  })
  if (!user) {
    throw createError({ statusCode: 404, message: 'User not found' })
  }
  return user
})
