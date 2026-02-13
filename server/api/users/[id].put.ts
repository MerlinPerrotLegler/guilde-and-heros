import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing user id' })
  }
  const body = await readBody<{ name?: string; email?: string }>(event)
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(body?.name != null && { name: body.name }),
      ...(body?.email != null && { email: body.email }),
    },
  })
  return user
})
