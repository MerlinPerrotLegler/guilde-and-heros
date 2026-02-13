<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
    <div class="max-w-4xl mx-auto">
      <NuxtLink to="/" class="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8">
        ← Retour
      </NuxtLink>

      <div class="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h1 class="text-3xl font-bold text-white mb-8">🗄️ Test MySQL</h1>

        <!-- Test de connexion -->
        <div class="mb-8">
          <button 
            @click="testConnection"
            :disabled="loading"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-semibold"
          >
            {{ loading ? 'Test en cours...' : 'Tester la connexion MySQL' }}
          </button>
        </div>

        <!-- Résultat du test -->
        <div v-if="connectionResult" 
          :class="[
            'p-4 rounded-lg mb-8',
            connectionResult.success 
              ? 'bg-green-900 text-green-100 border border-green-700'
              : 'bg-red-900 text-red-100 border border-red-700'
          ]"
        >
          <p class="font-semibold mb-2">{{ connectionResult.message }}</p>
          <p v-if="connectionResult.count !== undefined" class="text-sm">
            Utilisateurs trouvés: {{ connectionResult.count }}
          </p>
          <p v-if="connectionResult.error" class="text-sm">{{ connectionResult.error }}</p>
        </div>

        <!-- Créer un nouvel utilisateur -->
        <div v-if="connectionResult?.success" class="mb-8 p-6 bg-slate-700 rounded-lg border border-slate-600">
          <h2 class="text-xl font-bold text-white mb-4">➕ Ajouter un utilisateur</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-white mb-2">Nom</label>
              <input 
                v-model="newUser.name"
                type="text"
                placeholder="John Doe"
                class="w-full bg-slate-900 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-white mb-2">Email</label>
              <input 
                v-model="newUser.email"
                type="email"
                placeholder="john@example.com"
                class="w-full bg-slate-900 text-white px-4 py-2 rounded border border-slate-600 focus:border-blue-500"
              />
            </div>
            <button 
              @click="createUser"
              :disabled="!newUser.name || !newUser.email || creating"
              class="w-full px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white rounded-lg font-semibold"
            >
              {{ creating ? 'Création...' : 'Créer l\'utilisateur' }}
            </button>
          </div>
        </div>

        <!-- Liste des utilisateurs -->
        <div v-if="connectionResult?.success && users.length > 0" class="mt-8">
          <h2 class="text-xl font-bold text-white mb-4">👥 Utilisateurs ({{ users.length }})</h2>
          <div class="space-y-2">
            <div v-for="user in users" :key="user.id" class="bg-slate-700 p-4 rounded border border-slate-600">
              <p class="font-semibold text-white">{{ user.name }}</p>
              <p class="text-slate-400 text-sm">{{ user.email }}</p>
              <p class="text-slate-500 text-xs mt-2">{{ new Date(user.createdAt).toLocaleDateString('fr-FR') }}</p>
            </div>
          </div>
        </div>

        <!-- Code d'exemple -->
        <div class="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-600">
          <h3 class="text-white font-semibold mb-4">📝 Code d'exemple (API)</h3>
          <pre class="text-green-400 text-sm overflow-auto"><code>// server/api/users.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  return await prisma.user.findMany()
})</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const connectionResult = ref<any>(null)
const users = ref<any[]>([])
const loading = ref(false)
const creating = ref(false)
const newUser = ref({
  name: '',
  email: ''
})

const testConnection = async () => {
  loading.value = true
  try {
    const result = await $fetch('/api/db-test')
    connectionResult.value = result
    if (result.success && result.users) {
      users.value = result.users
    }
  } catch (error: any) {
    connectionResult.value = {
      success: false,
      error: error.message || 'Erreur de connexion'
    }
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  if (!newUser.value.name || !newUser.value.email) return

  creating.value = true
  try {
    const result = await $fetch('/api/users/create', {
      method: 'POST',
      body: {
        name: newUser.value.name,
        email: newUser.value.email
      }
    })
    
    if (result.success) {
      users.value.unshift(result.user)
      newUser.value = { name: '', email: '' }
      alert('Utilisateur créé avec succès! ✅')
    }
  } catch (error: any) {
    alert('Erreur: ' + (error.message || 'Impossible de créer l\'utilisateur'))
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  testConnection()
})
</script>
