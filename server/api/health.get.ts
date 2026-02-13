/**
 * Health check sans DB — pour vérifier que le serveur répond (dépannage 503).
 * Si /api/health renvoie 200, le processus Node est bien lancé.
 */
export default defineEventHandler(() => ({
  ok: true,
  time: new Date().toISOString(),
}))
