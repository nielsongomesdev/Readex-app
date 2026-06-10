<script setup lang="ts">
const discussions = [
  { id: 1, title: 'Opiniões sobre o final de 1984', replies: 24, user: 'Julia F.' },
  { id: 2, title: 'Qual o melhor livro de Fantasia da década?', replies: 87, user: 'Marcos R.' },
  { id: 3, title: 'Clube do Livro: Iniciando Dom Casmurro', replies: 12, user: 'Ana C.' }
]
</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    <h1 class="text-2xl md:text-3xl font-bold text-[#13213C]">Comunidade</h1>

    <!-- Clubs and Groups list -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-[#13213C]">Fóruns de Discussão</h2>
      <div class="space-y-3">
        <div 
          v-for="item in discussions" 
          :key="item.id"
          class="bg-white border border-[#B06E02]/10 rounded-2xl p-5 hover:shadow-sm transition flex items-center justify-between gap-4"
        >
          <div class="min-w-0">
            <h3 class="text-sm font-bold text-[#13213C] hover:text-[#B06E02] transition cursor-pointer truncate">
              {{ item.title }}
            </h3>
            <span class="text-xs text-gray-400 mt-1 block">Iniciado por {{ item.user }}</span>
          </div>
          
          <div class="flex items-center gap-1.5 text-gray-400 flex-shrink-0 text-xs font-semibold">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {{ item.replies }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
