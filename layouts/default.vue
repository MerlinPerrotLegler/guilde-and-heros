<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="border-b border-slate-200 bg-white">
      <nav class="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="text-xl font-semibold text-slate-800">
          Guildes
        </NuxtLink>
        <div class="flex gap-4">
          <NuxtLink
            to="/"
            class="text-slate-600 hover:text-slate-900"
            active-class="text-slate-900 font-medium"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
            to="/example"
            class="text-slate-600 hover:text-slate-900"
            active-class="text-slate-900 font-medium"
          >
            Exemple
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="mx-auto max-w-4xl px-4 py-8">
      <slot />
    </main>
  </div>
</template>
