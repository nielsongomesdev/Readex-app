<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('lendo')
const books = [
  { id: 1, title: 'O Hobbit', author: 'J.R.R. Tolkien', status: 'lendo', progress: 65 },
  { id: 2, title: '1984', author: 'George Orwell', status: 'lendo', progress: 25 },
  { id: 3, title: 'Dom Casmurro', author: 'Machado de Assis', status: 'lidos', progress: 100 },
  { id: 4, title: 'O Alquimista', author: 'Paulo Coelho', status: 'quero', progress: 0 }
]
</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-[#13213C]">Minha Estante</h1>
      <button class="bg-[#13213C] text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-[#13213C]/90 text-sm transition">
        + Adicionar livro
      </button>
    </div>

    <!-- Shelves Tabs -->
    <div class="flex border-b border-[#B06E02]/10 gap-6 text-sm">
      <button 
        @click="activeTab = 'lendo'" 
        class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer"
        :class="[activeTab === 'lendo' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
      >
        Lendo (2)
      </button>
      <button 
        @click="activeTab = 'quero'" 
        class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer"
        :class="[activeTab === 'quero' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
      >
        Quero ler (1)
      </button>
      <button 
        @click="activeTab = 'lidos'" 
        class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer"
        :class="[activeTab === 'lidos' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
      >
        Lidos (1)
      </button>
    </div>

    <!-- Books Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div 
        v-for="book in books.filter(b => b.status === activeTab)" 
        :key="book.id"
        class="bg-white border border-[#B06E02]/10 rounded-2xl p-4 flex flex-col items-center text-center space-y-3 hover:shadow-sm transition"
      >
        <!-- Mock Cover Book Shape -->
        <div class="w-full aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400 text-sm shadow-xs">
          Capa
        </div>
        <div class="w-full">
          <h3 class="text-sm font-bold text-[#13213C] truncate">{{ book.title }}</h3>
          <p class="text-xs text-gray-400 truncate mt-0.5">{{ book.author }}</p>
        </div>
        <!-- Reading Progress bar -->
        <div v-if="book.progress > 0" class="w-full flex items-center gap-2">
          <div class="flex-1 bg-gray-100 rounded-full h-1">
            <div class="bg-[#B06E02] h-1 rounded-full" :style="{ width: book.progress + '%' }"></div>
          </div>
          <span class="text-[10px] font-bold text-[#B06E02]">{{ book.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
