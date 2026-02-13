<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

const { data: users, refresh } = await useFetch<User[]>('/api/users')

const form = reactive({
  name: '',
  email: '',
})
const loading = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

async function addUser() {
  if (!form.name.trim() || !form.email.trim()) {
    message.value = { type: 'error', text: 'Nom et email requis.' }
    return
  }
  loading.value = true
  message.value = null
  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: { name: form.name, email: form.email },
    })
    form.name = ''
    form.email = ''
    await refresh()
    message.value = { type: 'success', text: 'Utilisateur ajouté.' }
  } catch (e: unknown) {
    const err = e as { data?: { message?: string } }
    message.value = {
      type: 'error',
      text: err?.data?.message ?? 'Erreur lors de l\'ajout.',
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-3xl font-bold text-slate-800">
        Boilerplate Nuxt.js + MySQL
      </h1>
      <p class="mt-2 text-slate-600">
        Page d'accueil avec liste des utilisateurs et formulaire d'ajout.
      </p>
    </div>

    <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-800">
        Ajouter un utilisateur
      </h2>
      <form class="flex flex-col gap-4 sm:flex-row sm:items-end" @submit.prevent="addUser">
        <div class="flex-1 space-y-1">
          <label for="name" class="block text-sm font-medium text-slate-700">Nom</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Jean Dupont"
          />
        </div>
        <div class="flex-1 space-y-1">
          <label for="email" class="block text-sm font-medium text-slate-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="jean@example.com"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-700 disabled:opacity-50"
        >
          {{ loading ? 'Ajout...' : 'Ajouter' }}
        </button>
      </form>
      <p
        v-if="message"
        :class="[
          'mt-3 text-sm',
          message.type === 'success' ? 'text-green-600' : 'text-red-600',
        ]"
      >
        {{ message.text }}
      </p>
    </section>

    <section class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg font-semibold text-slate-800">
        Liste des utilisateurs
      </h2>
      <div v-if="!users?.length" class="rounded-lg bg-slate-100 py-8 text-center text-slate-500">
        Aucun utilisateur. Ajoutez-en un ci-dessus ou exécutez
        <code class="rounded bg-slate-200 px-1">npm run db:seed</code>.
      </div>
      <ul v-else class="divide-y divide-slate-200">
        <li
          v-for="user in users"
          :key="user.id"
          class="flex items-center justify-between py-3 first:pt-0"
        >
          <div>
            <span class="font-medium text-slate-800">{{ user.name }}</span>
            <span class="ml-2 text-slate-500">{{ user.email }}</span>
          </div>
          <span class="text-sm text-slate-400">
            {{ new Date(user.createdAt).toLocaleDateString('fr-FR') }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
