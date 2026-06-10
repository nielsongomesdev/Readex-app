<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('todos')

const books = ref([
  { id: 1, title: 'O Hobbit', author: 'J.R.R. Tolkien', status: 'lendo', progress: 65, coverBg: 'bg-gradient-to-tr from-[#B06E02] to-[#FFF0CC]' },
  { id: 2, title: '1984', author: 'George Orwell', status: 'lendo', progress: 25, coverBg: 'bg-gradient-to-tr from-[#13213C] to-[#DCE5F4]' },
  { id: 3, title: 'Dom Casmurro', author: 'Machado de Assis', status: 'lidos', progress: 100, coverBg: 'bg-gradient-to-tr from-[#794C02] to-[#FEF6D0]' },
  { id: 4, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', status: 'quero', progress: 0, coverBg: 'bg-gradient-to-tr from-gray-500 to-gray-200' },
  { id: 5, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', status: 'quero', progress: 0, coverBg: 'bg-gradient-to-tr from-amber-500 to-amber-100' }
])

const setTab = (tab: string) => {
  activeTab.value = tab
}

const filteredBooks = () => {
  if (activeTab.value === 'todos') {
    return books.value
  }
  return books.value.filter(book => book.status === activeTab.value)
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- Title & Add Action -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl md:text-3xl font-bold text-[#806602]">Minha Estante</h1>
        <p class="text-sm text-gray-400 font-medium">Gerencie sua coleção de livros e progresso de leitura.</p>
      </div>
      <button class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition cursor-pointer flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Adicionar livro
      </button>
    </div>

    <!-- Shelves Filter Tabs -->
    <div class="flex border-b border-[#B06E02]/10 gap-6 text-sm">
      <button 
        @click="setTab('todos')" 
        class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer text-xs uppercase tracking-wider"
        :class="[activeTab === 'todos' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
      >
        Todos ({{ books.length }})
      </button>
      <button 
        @click="setTab('lendo')" 
        class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer text-xs uppercase tracking-wider"
        :class="[activeTab === 'lendo' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
      >
        Lendo ({{ books.filter(b => b.status === 'lendo').length }})
      </button>
      <button 
        @click="setTab('quero')" 
        class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer text-xs uppercase tracking-wider"
        :class="[activeTab === 'quero' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
      >
        Quero ler ({{ books.filter(b => b.status === 'quero').length }})
      </button>
    </div>

    <!-- Books Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <div 
        v-for="book in filteredBooks()" 
        :key="book.id"
        class="bg-white border border-[#B06E02]/10 rounded-2xl p-4 flex flex-col items-center text-center gap-3.5 hover:shadow-[0_4px_16px_rgba(176,110,2,0.04)] hover:scale-[1.02] active:scale-[0.98] transition duration-200 cursor-pointer"
      >
        <!-- Mock Book Cover with background gradient -->
        <div 
          class="w-full aspect-[3/4] rounded-xl flex items-center justify-center font-bold text-white text-xs text-center p-3 shadow-xs select-none"
          :class="book.coverBg"
        >
          {{ book.title }}
        </div>
        
        <!-- Book Details -->
        <div class="w-full min-w-0">
          <h3 class="text-xs font-bold text-[#13213C] truncate leading-tight">{{ book.title }}</h3>
          <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
        </div>

        <!-- Book Reading Progress bar -->
        <div class="w-full mt-auto">
          <div v-if="book.progress > 0 && book.progress < 100" class="flex items-center gap-2">
            <div class="flex-1 bg-gray-100 rounded-full h-1">
              <div class="bg-[#B06E02] h-1 rounded-full" :style="{ width: book.progress + '%' }"></div>
            </div>
            <span class="text-[9px] font-bold text-[#B06E02]">{{ book.progress }}%</span>
          </div>
          <span 
            v-else-if="book.progress === 100" 
            class="inline-block text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
          >
            Lido
          </span>
          <span 
            v-else 
            class="inline-block text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full"
          >
            Não iniciado
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
