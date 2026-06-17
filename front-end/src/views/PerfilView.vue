<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import dunaCover from '../assets/images/duna_cover.png'
import orwellCover from '../assets/images/1984_cover.png'
import hobbitCover from '../assets/images/o_hobbit_cover.png'
import alquimistaCover from '../assets/images/o_alquimista_cover.png'
import nomeVentoCover from '../assets/images/o_nome_do_vento_cover.png'
import objetosCortantesCover from '../assets/images/objetos_cortantes_cover.png'
import sapiensCover from '../assets/images/sapiens_cover.png'
import atomicHabitsCover from '../assets/images/atomic_habits_cover.png'
import andersonAvatar from '../assets/images/anderson_avatar.png'

import { name, handle, bio } from '../store/userStore'

const activeTab = ref('lendo')

const lendoBooks = [
  { title: 'Duna', author: 'Frank Herbert', cover: dunaCover },
  { title: 'O Nome do Vento', author: 'Patrick Rothfuss', cover: nomeVentoCover }
]

const lidosBooks = [
  { title: '1984', author: 'George Orwell', cover: orwellCover },
  { title: 'O Hobbit', author: 'J.R.R. Tolkien', cover: hobbitCover },
  { title: 'Objetos Cortantes', author: 'Gillian Flynn', cover: objetosCortantesCover },
  { title: 'Sapiens', author: 'Y.N. Harari', cover: sapiensCover },
  { title: 'Atomic Habits', author: 'James Clear', cover: atomicHabitsCover },
  { title: 'O Alquimista', author: 'Paulo Coelho', cover: alquimistaCover }
]

const userReviews = [
  { title: 'Duna', author: 'Frank Herbert', cover: dunaCover, rating: 4, text: 'Uma obra-prima da ficção científica. A construção de mundo de Frank Herbert é incomparável.' },
  { title: '1984', author: 'George Orwell', cover: orwellCover, rating: 5, text: 'Um clássico distópico atemporal. Uma crítica brilhante que continua relevante até hoje.' },
  { title: 'O Hobbit', author: 'J.R.R. Tolkien', cover: hobbitCover, rating: 4, text: 'Uma aventura fantástica e divertida, cheia de carisma e lições de vida.' }
]

const activities = [
  { id: 1, action: 'Adicionou', target: 'Duna', meta: '', time: 'há 2 dias' },
  { id: 2, action: 'Concluiu', target: 'O Alquimista', meta: '', time: 'há 5 dias' },
  { id: 3, action: 'Avaliou', target: 'Sapiens', meta: 'com ⭐ 4.9', time: 'há 1 semana' }
]

const router = useRouter()

const editProfile = () => {
  router.push('/configuracoes?edit=true')
}
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6">

    
    <div class="bg-[#13213C] text-white -mx-6 -mt-6 md:-mx-8 md:-mt-8 p-6 lg:mx-0 lg:mt-0 lg:rounded-2xl lg:p-8 flex flex-col lg:flex-row lg:justify-between lg:items-center relative gap-6 shadow-xs">
      
      
      <button @click="router.push('/configuracoes')" class="absolute top-4 right-4 text-[#FCAE1E] hover:text-[#FCAE1E]/80 transition-colors cursor-pointer lg:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      
      <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 flex-1 min-w-0">
        <img :src="andersonAvatar" alt="Avatar" class="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white/20 object-cover shadow-sm flex-shrink-0" />
        <div class="min-w-0 flex-1 space-y-1">
          <h2 class="text-xl lg:text-2xl font-bold text-[#FCAE1E] leading-tight truncate">{{ name }}</h2>
          <span class="text-xs text-gray-300 font-semibold block leading-none">{{ handle }}</span>
          <p class="hidden sm:block text-xs lg:text-sm text-gray-300 font-medium leading-relaxed mt-2 max-w-lg">
            {{ bio }}
          </p>
        </div>
      </div>

      
      <div class="flex flex-col items-center lg:items-end justify-between gap-5 self-stretch lg:self-auto select-none">
        
        
        <button 
          @click="editProfile"
          class="hidden lg:flex items-center gap-1.5 bg-white text-[#13213C] hover:bg-gray-100 transition-colors font-bold text-xs px-4 py-2 rounded-xl cursor-pointer select-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Editar perfil
        </button>

        
        <div class="flex items-center justify-around w-full sm:w-auto sm:justify-center gap-8 lg:gap-6 pt-2 lg:pt-0">
          <div class="text-center">
            <span class="block text-2xl font-bold text-white leading-none">47</span>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">Lidos</span>
          </div>
          <div class="text-center">
            <span class="block text-2xl font-bold text-white leading-none">23</span>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">Seguindo</span>
          </div>
          <div class="text-center">
            <span class="block text-2xl font-bold text-white leading-none">89</span>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">Seguidores</span>
          </div>
        </div>

      </div>

      
      <div class="lg:hidden flex border-t border-white/10 w-full mt-4 pt-4">
        <button 
          @click="activeTab = 'lendo'"
          class="flex-1 text-center py-2 text-sm font-bold relative transition select-none cursor-pointer"
          :class="activeTab === 'lendo' ? 'text-white' : 'text-gray-400'"
        >
          Lendo
          <span v-if="activeTab === 'lendo'" class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#FCAE1E]"></span>
        </button>
        
        <button 
          @click="activeTab = 'lidos'"
          class="flex-1 text-center py-2 text-sm font-bold relative transition select-none cursor-pointer"
          :class="activeTab === 'lidos' ? 'text-white' : 'text-gray-400'"
        >
          Lidos
          <span v-if="activeTab === 'lidos'" class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#FCAE1E]"></span>
        </button>

        <button 
          @click="activeTab = 'resenhas'"
          class="flex-1 text-center py-2 text-sm font-bold relative transition select-none cursor-pointer"
          :class="activeTab === 'resenhas' ? 'text-white' : 'text-gray-400'"
        >
          Resenhas
          <span v-if="activeTab === 'resenhas'" class="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#FCAE1E]"></span>
        </button>
      </div>

    </div>

    
    <div class="hidden lg:flex items-center gap-3 mt-6">
      <button 
        @click="activeTab = 'lendo'"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition cursor-pointer select-none"
        :class="activeTab === 'lendo' ? 'bg-[#13213C] text-white border-[#13213C]' : 'bg-white text-[#13213C] border-[#B06E02]/10 hover:bg-gray-50'"
      >
        <span>Lendo</span>
        <span class="px-2 py-0.5 text-xs rounded-full" :class="activeTab === 'lendo' ? 'bg-white/20 text-white' : 'bg-[#E5ECF6] text-[#13213C]'">2</span>
      </button>
      
      <button 
        @click="activeTab = 'lidos'"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition cursor-pointer select-none"
        :class="activeTab === 'lidos' ? 'bg-[#13213C] text-white border-[#13213C]' : 'bg-white text-[#13213C] border-[#B06E02]/10 hover:bg-gray-50'"
      >
        <span>Lidos</span>
        <span class="px-2 py-0.5 text-xs rounded-full" :class="activeTab === 'lidos' ? 'bg-white/20 text-white' : 'bg-[#E5ECF6] text-[#13213C]'">47</span>
      </button>

      <button 
        @click="activeTab = 'resenhas'"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition cursor-pointer select-none"
        :class="activeTab === 'resenhas' ? 'bg-[#13213C] text-white border-[#13213C]' : 'bg-white text-[#13213C] border-[#B06E02]/10 hover:bg-gray-50'"
      >
        <span>Resenhas</span>
        <span class="px-2 py-0.5 text-xs rounded-full" :class="activeTab === 'resenhas' ? 'bg-white/20 text-white' : 'bg-[#E5ECF6] text-[#13213C]'">15</span>
      </button>
    </div>

    
    <div v-if="activeTab === 'lendo' || activeTab === 'lidos'" class="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-6 mt-6">
      <div 
        v-for="book in (activeTab === 'lendo' ? lendoBooks : lidosBooks)" 
        :key="book.title" 
        class="flex flex-col min-w-0"
      >
        <img :src="book.cover" :alt="book.title" class="w-full aspect-[2/3] object-cover rounded-lg shadow-xs border border-gray-100 hover:scale-102 transition duration-200" />
        <h4 class="text-sm font-bold text-[#13213C] truncate mt-2 leading-tight">{{ book.title }}</h4>
        <p class="text-[11px] text-gray-400 font-semibold truncate leading-none mt-0.5">{{ book.author }}</p>
      </div>
    </div>

    
    <div v-if="activeTab === 'resenhas'" class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <div 
        v-for="review in userReviews" 
        :key="review.title" 
        class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between"
      >
        <div class="flex gap-4">
          <img :src="review.cover" :alt="review.title" class="w-12 h-18 object-cover rounded-lg flex-shrink-0" />
          <div class="min-w-0 flex-1">
            <h4 class="text-sm font-bold text-[#13213C] truncate leading-tight">{{ review.title }}</h4>
            <p class="text-[11px] text-gray-400 font-semibold mt-0.5">{{ review.author }}</p>
            <div class="flex items-center gap-0.5 mt-1.5">
              <svg v-for="star in 5" :key="star" class="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path 
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  :fill="star <= review.rating ? '#FCAE1E' : '#E5ECF6'"
                />
              </svg>
            </div>
          </div>
        </div>
        <p class="text-xs text-gray-500 font-medium italic mt-2">"{{ review.text }}"</p>
      </div>
    </div>

    
    <div class="hidden lg:block space-y-4 mt-8">
      <h3 class="text-lg font-bold text-[#B06E02]">Atividade recente</h3>
      <div class="space-y-3">
        <div 
          v-for="act in activities" 
          :key="act.id" 
          class="bg-white border border-[#B06E02]/5 p-4 rounded-2xl shadow-xs flex items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <img :src="andersonAvatar" alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
            <p class="text-sm font-semibold text-[#13213C]">
              <span class="text-gray-400">{{ act.action }} </span>
              <span class="font-bold">{{ act.target }}</span>
              <span v-if="act.meta" class="text-gray-400"> {{ act.meta }}</span>
            </p>
          </div>
          <span class="text-xs text-gray-400 font-semibold whitespace-nowrap">{{ act.time }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
