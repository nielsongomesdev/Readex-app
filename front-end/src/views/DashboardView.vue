<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nowReading = ref({
  title: 'Atelier of Witch Hat',
  author: 'Kamome Shirahama',
  pagesRead: 456,
  totalPages: 672,
  progress: 68
})

const shortcuts = [
  { name: '+ Livro', icon: 'plus' },
  { name: 'Estante', icon: 'bookshelf' },
  { name: 'Feed Social', icon: 'community' },
  { name: 'Progresso', icon: 'progress' }
]

const suggestion = ref({
  title: 'Duna',
  author: 'Frank Herbert',
  genre: 'Ficção Científica'
})

const communityReviews = [
  { name: 'Carlos M.', action: 'Está lendo 1984', quote: 'O Grande Irmão me perturbou profundamente' },
  { name: 'Ana L.', action: 'Terminou Duna', quote: 'Construção de mundo épica e envolvente!' }
]

const navigateShortcut = (icon: string) => {
  if (icon === 'bookshelf') {
    router.push('/estante')
  } else if (icon === 'community') {
    router.push('/comunidade')
  } else if (icon === 'progress') {
    router.push('/progresso')
  }
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    
    <div class="hidden lg:flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-[#B06E02]">Bom dia, Anderson!</h1>
        <p class="text-xs text-gray-400 font-semibold">Domingo, 3 de maio de 2026</p>
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

    
    <div class="flex lg:hidden items-center gap-5 py-2 px-1">
      <div class="w-24 h-24 flex-shrink-0">
        <img 
          src="../assets/images/mascote-1.png" 
          alt="Mascote Readex feliz" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-[#E09A1C]">Bom dia, Anderson!</h1>
        <p class="text-sm text-gray-400 font-medium mt-1">Domingo, 3 de maio de 2026</p>
      </div>
    </div>

    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      
      <div class="lg:col-span-2 space-y-6">
        
        
        <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Lendo agora</h2>
          
          <div class="flex gap-5">
            
            <img 
              src="../assets/images/atelier_cover.png" 
              alt="Atelier of Witch Hat"
              class="w-24 h-36 object-cover rounded-xl shadow-md border border-[#B06E02]/10 flex-shrink-0"
            />
            
            
            <div class="flex-1 min-w-0 flex flex-col justify-between py-1">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-base font-bold text-[#806602] leading-snug">{{ nowReading.title }}</h3>
                  <p class="text-xs text-gray-400 font-semibold mt-0.5">{{ nowReading.author }}</p>
                </div>
                <span class="text-sm font-bold text-[#806602] flex-shrink-0 ml-2">{{ nowReading.progress }}%</span>
              </div>

              <div>
                <span class="text-[11px] font-bold text-gray-400 block mb-1.5">{{ nowReading.pagesRead }} de {{ nowReading.totalPages }} páginas</span>
                
                <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
                  <div class="bg-[#FCAE1E] h-2 rounded-full" :style="{ width: nowReading.progress + '%' }"></div>
                </div>
              </div>

              
              <router-link to="/livro/2" class="hidden lg:block w-full border border-[#B06E02]/40 text-[#B06E02] hover:bg-[#FFF5CD]/30 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center mt-3">
                Acompanhar progresso
              </router-link>
            </div>
          </div>
        </div>

        
        <div class="block lg:hidden bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-3.5">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Meta do mês</h2>
          <div class="flex justify-between items-center text-[#806602]">
            <div>
              <span class="text-base font-bold">5 de 8</span>
              <span class="text-sm font-medium ml-1.5">livros lidos</span>
            </div>
            <span class="text-sm font-bold">63%</span>
          </div>
          
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" style="width: 63%"></div>
          </div>
        </div>

        
        <router-link to="/livro/2" class="block lg:hidden w-full bg-white border border-[#E09A1C]/60 text-[#E09A1C] hover:bg-[#FFF5CD]/20 text-xs font-bold py-3.5 rounded-xl transition cursor-pointer text-center">
          Acompanhar progresso
        </router-link>

        
        <div class="space-y-3">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Atalhos rápidos</h2>
          
          
          <div class="hidden lg:grid grid-cols-4 gap-4">
            <button 
              v-for="item in shortcuts" 
              :key="item.name"
              @click="navigateShortcut(item.icon)"
              class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-bold text-xs py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(19,33,60,0.1)] transition duration-150 cursor-pointer"
            >
              <svg v-if="item.icon === 'plus'" class="w-4 h-4 text-[#FCAE1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <svg v-else-if="item.icon === 'bookshelf'" class="w-4 h-4 text-[#FCAE1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
              </svg>
              <svg v-else-if="item.icon === 'community'" class="w-4 h-4 text-[#FCAE1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <svg v-else-if="item.icon === 'progress'" class="w-4 h-4 text-[#FCAE1E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {{ item.name }}
            </button>
          </div>

          
          <div class="lg:hidden flex overflow-x-auto gap-3 pb-2 scrollbar-none select-none">
            <button 
              v-for="item in shortcuts" 
              :key="item.name + '-mobile'"
              @click="navigateShortcut(item.icon)"
              class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-bold text-xs py-2.5 px-5 rounded-full flex items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <svg v-if="item.icon === 'plus'" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              {{ item.name }}
            </button>
          </div>
        </div>

        
        <div class="space-y-3">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Da comunidade</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="review in communityReviews" 
              :key="review.name"
              class="bg-[#FFFBEA] border border-[#B06E02]/10 p-4 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] flex gap-3.5"
            >
              <div class="w-12 h-12 bg-[#13213C] rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-sm select-none">
                {{ review.name.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-[#13213C] truncate">{{ review.name }}</h4>
                <p class="text-[11px] text-gray-400 font-semibold mt-0.5">{{ review.action }}</p>
                <p class="text-[11px] italic text-gray-400 mt-2.5 font-medium leading-relaxed">
                  "{{ review.quote }}"
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      
      <div class="hidden lg:block space-y-6">
        
        
        <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest mb-2">Meta do mês</h2>
              <span class="text-xl font-bold text-[#806602]">5 de 8</span>
              <span class="text-xs text-gray-400 font-semibold block mt-0.5">livros lidos</span>
            </div>
            <span class="text-sm font-bold text-[#806602] mt-6">63%</span>
          </div>
          
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" style="width: 63%"></div>
          </div>
        </div>

        
        <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Sugerido para você</h2>
          
          <div class="flex gap-4 p-1">
            
            <img 
              src="../assets/images/duna_cover.png" 
              alt="Duna"
              class="w-14 h-20 object-cover rounded-lg shadow-sm border border-[#B06E02]/10 flex-shrink-0"
            />
            <div class="flex-1 min-w-0 flex flex-col justify-center">
              <h3 class="text-xs font-bold text-[#806602] truncate">{{ suggestion.title }}</h3>
              <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{{ suggestion.author }}</p>
              <span class="inline-block self-start text-[8px] font-bold text-[#B06E02] bg-[#FFF5CD]/50 px-2 py-0.5 rounded-full mt-1.5">
                {{ suggestion.genre }}
              </span>
            </div>
          </div>

          <button class="w-full bg-[#13213C] hover:bg-[#13213C]/95 text-white font-semibold text-xs py-2.5 rounded-xl transition cursor-pointer text-center">
            Adicionar à estante
          </button>
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
