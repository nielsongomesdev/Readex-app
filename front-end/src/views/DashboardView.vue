<script setup lang="ts">
import { ref } from 'vue'

const nowReading = ref({
  title: 'O Hobbit',
  author: 'J.R.R. Tolkien',
  pagesRead: 195,
  totalPages: 300,
  progress: 65,
  coverBg: 'bg-gradient-to-tr from-[#B06E02] to-[#FFF0CC]'
})

const shortcuts = [
  { name: 'Adicionar Livro', icon: 'plus' },
  { name: 'Nova Resenha', icon: 'pencil' },
  { name: 'Metas de Leitura', icon: 'trophy' },
  { name: 'Minhas Anotações', icon: 'notebook' }
]

const suggestions = [
  { id: 1, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', pages: 448, genre: 'Realismo Mágico' },
  { id: 2, title: '1984', author: 'George Orwell', pages: 328, genre: 'Distopia' },
  { id: 3, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', pages: 96, genre: 'Fábula' }
]
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- Greeting Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="text-2xl md:text-3xl font-bold text-[#806602]">Bom dia, Anderson! 👋</h1>
      <p class="text-sm text-gray-500 font-medium">Pronto para a sua leitura diária hoje?</p>
    </div>

    <!-- Main Content layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left columns: Now Reading & Shortcuts -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Now Reading (Lendo Agora) Card -->
        <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] space-y-4">
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Lendo agora</h2>
          
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <!-- Mock Cover -->
            <div 
              class="w-24 h-36 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white shadow-md text-center p-3 select-none text-xs"
              :class="nowReading.coverBg"
            >
              {{ nowReading.title }}
            </div>
            
            <!-- Book Details & Progress -->
            <div class="flex-1 w-full space-y-3">
              <div>
                <h3 class="text-lg font-bold text-[#13213C]">{{ nowReading.title }}</h3>
                <p class="text-sm text-gray-400 font-medium">{{ nowReading.author }}</p>
              </div>

              <!-- Pages numbers and percent -->
              <div class="flex items-center justify-between text-xs font-bold text-[#806602]">
                <span>{{ nowReading.pagesRead }} de {{ nowReading.totalPages }} páginas</span>
                <span>{{ nowReading.progress }}% concluído</span>
              </div>

              <!-- Progress bar -->
              <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  class="bg-[#B06E02] h-2 rounded-full transition-all duration-500"
                  :style="{ width: nowReading.progress + '%' }"
                ></div>
              </div>

              <!-- Action button inside Lendo Agora -->
              <div class="pt-2">
                <button class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer">
                  Atualizar Progresso
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Shortcuts Grid -->
        <div class="space-y-4">
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Atalhos rápidos</h2>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button 
              v-for="item in shortcuts" 
              :key="item.name"
              type="button"
              class="bg-white border border-[#B06E02]/10 hover:border-[#B06E02]/30 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:shadow-xs transition duration-200 cursor-pointer group"
            >
              <!-- Icon Container -->
              <div class="w-10 h-10 rounded-xl bg-[#FFF8D6] text-[#B06E02] flex items-center justify-center transition duration-200 group-hover:scale-105">
                <!-- Plus Icon -->
                <svg v-if="item.icon === 'plus'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <!-- Pencil Icon -->
                <svg v-else-if="item.icon === 'pencil'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <!-- Trophy Icon -->
                <svg v-else-if="item.icon === 'trophy'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0H4m8 0h8m-8 0v13m-8 0h16" />
                </svg>
                <!-- Notebook Icon -->
                <svg v-else-if="item.icon === 'notebook'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <!-- Text -->
              <span class="text-xs font-bold text-[#13213C]">{{ item.name }}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Right column: Suggestions -->
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] space-y-4 flex flex-col justify-between">
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Sugestões de leitura</h2>
          
          <div class="space-y-4">
            <div 
              v-for="book in suggestions" 
              :key="book.id"
              class="flex gap-4 p-2 hover:bg-gray-50 rounded-xl transition duration-150"
            >
              <!-- Mock Cover -->
              <div class="w-12 h-18 bg-[#FFF8D6]/60 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-[#806602]/50 text-[10px] text-center p-1.5 shadow-xs border border-[#B06E02]/5">
                Capa
              </div>
              <div class="flex-1 min-w-0 flex flex-col justify-center">
                <h3 class="text-xs font-bold text-[#13213C] truncate">{{ book.title }}</h3>
                <p class="text-[10px] text-gray-400 font-medium truncate mt-0.5">{{ book.author }}</p>
                <span class="inline-block self-start text-[8px] font-bold text-[#806602] bg-[#FFF8D6] px-2 py-0.5 rounded-full mt-1.5">
                  {{ book.genre }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button class="w-full bg-transparent hover:bg-[#FFF8D6]/40 text-[#B06E02] border border-[#B06E02]/30 font-bold text-xs py-3 rounded-xl transition cursor-pointer mt-4 text-center">
          Ver mais sugestões
        </button>
      </div>

    </div>

  </div>
</template>

<style scoped>
</style>
