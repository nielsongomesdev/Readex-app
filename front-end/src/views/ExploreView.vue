<script setup lang="ts">
const categories = ['Ficção', 'Fantasia', 'Mistério', 'Biografia', 'Autoajuda', 'História']
const recommended = [
  { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis', rating: 4.8 },
  { id: 2, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', rating: 4.9 },
  { id: 3, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', rating: 4.7 }
]
</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    <h1 class="text-2xl md:text-3xl font-bold text-[#13213C]">Explorar novos livros</h1>

    <!-- Categories Filters -->
    <div class="flex flex-wrap gap-2.5">
      <button 
        v-for="cat in categories" 
        :key="cat"
        class="bg-white border border-[#B06E02]/10 hover:border-[#B06E02] text-xs font-semibold px-4 py-2 rounded-xl text-[#13213C] transition cursor-pointer"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Recommendations Section -->
    <div class="space-y-4">
      <h2 class="text-lg font-bold text-[#13213C]">Recomendados para você</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div 
          v-for="book in recommended" 
          :key="book.id"
          class="bg-white border border-[#B06E02]/10 rounded-2xl p-4 flex gap-4 hover:shadow-sm transition"
        >
          <div class="w-16 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-gray-400 text-[10px] shadow-xs">
            Capa
          </div>
          <div class="flex flex-col justify-between py-1 min-w-0">
            <div>
              <h3 class="text-sm font-bold text-[#13213C] truncate">{{ book.title }}</h3>
              <p class="text-xs text-gray-400 truncate mt-0.5">{{ book.author }}</p>
            </div>
            <div class="flex items-center gap-1 text-[#B06E02]">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span class="text-xs font-bold">{{ book.rating }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
