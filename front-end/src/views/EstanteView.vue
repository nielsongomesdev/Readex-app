<script setup lang="ts">
import { ref } from 'vue'

import atelierCover from '../assets/images/atelier_cover.png'
import nomeVentoCover from '../assets/images/o_nome_do_vento_cover.png'
import dunaCover from '../assets/images/duna_cover.png'
import orwellCover from '../assets/images/1984_cover.png'
import hobbitCover from '../assets/images/o_hobbit_cover.png'
import objetosCover from '../assets/images/objetos_cortantes_cover.png'
import sapiensCover from '../assets/images/sapiens_cover.png'
import atomicCover from '../assets/images/atomic_habits_cover.png'
import alquimistaCover from '../assets/images/o_alquimista_cover.png'

const activeTab = ref('todos') 

const tabs = [
  { id: 'todos', name: 'Todos', count: 47 },
  { id: 'lendo', name: 'Lendo', count: 2 },
  { id: 'quero', name: 'Quero Ler', count: 12 },
  { id: 'lidos', name: 'Lidos', count: 33 }
]

const lendoBooks = ref([
  { id: 1, title: 'Atelier of Witch Hat', author: 'Kamome Shirahama', pagesRead: 24, totalPages: 38, progress: 68, cover: atelierCover },
  { id: 2, title: 'O Nome do Vento', author: 'Patrick Rothfuss', pagesRead: 456, totalPages: 672, progress: 65, cover: nomeVentoCover }
])

const queroBooks = ref([
  { id: 3, title: 'Duna', author: 'Frank Herbert', cover: dunaCover },
  { id: 4, title: '1984', author: 'George Orwell', cover: orwellCover },
  { id: 5, title: 'O Hobbit', author: 'J.R.R. Tolkien', cover: hobbitCover },
  { id: 6, title: 'Objetos Cortantes', author: 'Gillian Flynn', cover: objetosCover },
  { id: 7, title: 'Sapiens', author: 'Y.N. Harari', cover: sapiensCover },
  { id: 8, title: 'Atomic Habits', author: 'James Clear', cover: atomicCover }
])

const lidosBooks = ref([
  { id: 9, title: 'O Alquimista', author: 'Paulo Coelho', cover: alquimistaCover, rating: 4.8, date: '12 Abr 2026', statusText: 'Lido' }
])
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    
    <div class="hidden lg:flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-[#13213C]">Minha Estante</h1>
        <p class="text-xs text-gray-400 font-semibold">Acompanhe sua jornada de leitura</p>
      </div>
      
      <div class="flex items-center gap-3">
        
        <button type="button" class="p-2 text-[#B06E02] hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        <button type="button" class="p-2 text-[#B06E02] hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>

    
    <div class="block lg:hidden pt-2">
      <h1 class="text-2xl font-bold text-[#13213C]">Minha Estante</h1>
    </div>

    
    <div class="hidden lg:flex gap-4 items-center">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        @click="activeTab = tab.id"
        class="flex items-center px-5 py-2.5 rounded-full text-xs font-bold transition shadow-xs cursor-pointer border"
        :class="activeTab === tab.id 
          ? 'bg-[#13213C] border-[#13213C] text-white' 
          : 'bg-white border-gray-200 text-gray-400 hover:text-[#B06E02]'"
      >
        {{ tab.name }}
        <span 
          class="rounded-full px-2 py-0.5 ml-2 text-[10px] font-bold"
          :class="activeTab === tab.id 
            ? 'bg-white text-[#13213C]' 
            : 'bg-gray-100 text-gray-500'"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    
    <div class="flex lg:hidden border-b border-[#B06E02]/10 w-full">
      <button 
        v-for="tab in tabs" 
        :key="tab.id + '-mobile'" 
        @click="activeTab = tab.id"
        class="flex-1 text-center pb-2.5 text-xs font-bold tracking-wide transition relative cursor-pointer"
        :class="activeTab === tab.id ? 'text-[#B06E02]' : 'text-gray-400'"
      >
        {{ tab.name }}
        <span 
          v-if="activeTab === tab.id" 
          class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B06E02]"
        ></span>
      </button>
    </div>

    
    <div class="space-y-8 mt-4">
      
      
      <div v-if="activeTab === 'todos' || activeTab === 'lendo'" class="space-y-4">
        <h2 class="text-sm md:text-base font-bold text-[#806602]">Lendo ({{ lendoBooks.length }})</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link 
            v-for="book in lendoBooks" 
            :key="book.id"
            :to="'/livro/2'"
            class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] flex gap-5 hover:scale-[1.01] transition duration-150 cursor-pointer"
          >
            
            <img 
              :src="book.cover" 
              :alt="book.title"
              class="w-20 h-28 lg:w-24 lg:h-36 object-cover rounded-xl shadow-md border border-[#B06E02]/10 flex-shrink-0"
            />
            
            
            <div class="flex-1 min-w-0 flex flex-col justify-between py-1">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-sm lg:text-base font-bold text-[#806602] leading-snug truncate">{{ book.title }}</h3>
                  <p class="text-xs text-gray-400 font-semibold mt-0.5 truncate">{{ book.author }}</p>
                </div>
                <span class="text-xs lg:text-sm font-bold text-[#806602] flex-shrink-0 ml-2">{{ book.progress }}%</span>
              </div>

              <div>
                <span class="text-[10px] lg:text-[11px] font-bold text-gray-400 block mb-1.5">{{ book.pagesRead }} de {{ book.totalPages }} páginas</span>
                
                <div class="w-full bg-gray-200/60 rounded-full h-1.5 lg:h-2 overflow-hidden">
                  <div class="bg-[#FCAE1E] h-1.5 lg:h-2 rounded-full" :style="{ width: book.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      
      <div v-if="activeTab === 'todos' || activeTab === 'quero'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-sm md:text-base font-bold text-[#806602]">Quero ler (12)</h2>
          <span class="text-xs text-gray-400 font-semibold hover:text-[#B06E02] transition cursor-pointer select-none">Ver tudo →</span>
        </div>
        
        
        <div 
          :class="[
            activeTab === 'todos' 
              ? 'hidden lg:grid lg:grid-cols-6 gap-6' 
              : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'
          ]"
        >
          <router-link 
            v-for="book in queroBooks" 
            :key="book.id"
            :to="'/livro/2'"
            class="flex flex-col items-center text-center gap-2 select-none cursor-pointer hover:scale-[1.02] transition duration-150"
          >
            <img 
              :src="book.cover" 
              :alt="book.title"
              class="w-[110px] h-[160px] object-cover rounded-xl shadow-xs border border-[#B06E02]/10 hover:scale-[1.02] transition"
            />
            <div class="w-full min-w-0 px-1 mt-1">
              <h4 class="text-xs font-bold text-[#806602] truncate leading-tight">{{ book.title }}</h4>
              <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
            </div>
          </router-link>
        </div>

        
        <div 
          v-if="activeTab === 'todos'"
          class="lg:hidden flex overflow-x-auto gap-4 pb-2 scrollbar-none select-none"
        >
          <router-link 
            v-for="book in queroBooks" 
            :key="book.id + '-mobile'"
            :to="'/livro/2'"
            class="flex flex-col items-center flex-shrink-0 text-center gap-2 cursor-pointer w-[110px] hover:scale-[1.02] transition duration-150"
          >
            <img 
              :src="book.cover" 
              :alt="book.title"
              class="w-[110px] h-[160px] object-cover rounded-xl shadow-xs border border-[#B06E02]/10"
            />
            <div class="w-full min-w-0 px-1 mt-1">
              <h4 class="text-xs font-bold text-[#806602] truncate leading-tight">{{ book.title }}</h4>
              <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
            </div>
          </router-link>
        </div>
      </div>

      
      <div v-if="activeTab === 'todos' || activeTab === 'lidos'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-sm md:text-base font-bold text-[#806602]">Lidos (33)</h2>
          <span class="text-xs text-gray-400 font-semibold hover:text-[#B06E02] transition cursor-pointer select-none">Ver tudo →</span>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
          <router-link 
            v-for="book in lidosBooks" 
            :key="book.id"
            :to="'/livro/2'"
            class="bg-[#FFFBEA] border border-[#B06E02]/10 p-3.5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] flex items-center justify-between hover:scale-[1.01] transition duration-150 cursor-pointer"
          >
            <div class="flex items-center gap-4 min-w-0">
              
              <img 
                :src="book.cover" 
                :alt="book.title"
                class="w-10 h-14 object-cover rounded-lg shadow-sm border border-[#B06E02]/10 flex-shrink-0"
              />
              <div class="min-w-0">
                <h4 class="text-sm font-bold text-[#806602] truncate">{{ book.title }}</h4>
                <p class="text-xs text-gray-400 font-semibold mt-0.5 truncate">{{ book.author }}</p>
              </div>
            </div>

            
            <div class="flex items-center gap-4 flex-shrink-0">
              <span class="hidden sm:inline text-xs text-gray-400 font-medium">Concluído em {{ book.date }}</span>
              <div class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-[#FCAE1E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span class="text-xs font-bold text-[#B06E02]">{{ book.rating }}</span>
              </div>
              <span class="bg-[#137333] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                {{ book.statusText }}
              </span>
            </div>
          </router-link>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}
</style>
