<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

const { data: users, pending, error } = await useFetch<User[]>('/api/users')
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-slate-800">
      Page exemple
    </h1>
    <p class="text-slate-600">
      Cette page récupère les utilisateurs via <code class="rounded bg-slate-200 px-1">useFetch('/api/users')</code>.
    </p>

    <div v-if="pending" class="rounded-lg bg-slate-100 py-8 text-center text-slate-500">
      Chargement...
    </div>
    <div v-else-if="error" class="rounded-lg bg-red-50 py-4 text-center text-red-600">
      Erreur : {{ error.message }}
    </div>
    <div v-else class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <ul class="divide-y divide-slate-200">
        <li
          v-for="user in users"
          :key="user.id"
          class="py-3"
        >
          <span class="font-medium text-slate-800">{{ user.name }}</span>
          <span class="ml-2 text-slate-500">{{ user.email }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
