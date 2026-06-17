<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import dunaCover from '../assets/images/duna_cover.png'
import orwellCover from '../assets/images/1984_cover.png'
import hobbitCover from '../assets/images/o_hobbit_cover.png'
import alquimistaCover from '../assets/images/o_alquimista_cover.png'
import nomeVentoCover from '../assets/images/o_nome_do_vento_cover.png'

const router = useRouter()
const route = useRoute()

interface BookInfo {
  title: string
  author: string
  cover: string
  genre: string
  pages: number
  startDate: string
  endDate: string
}

const booksDatabase: Record<string, BookInfo> = {
  '1': { title: '1984', author: 'George Orwell', cover: orwellCover, genre: 'Distopia', pages: 416, startDate: '10 de março, 2026', endDate: '20 de março, 2026' },
  '2': { title: 'O Nome do Vento', author: 'Patrick Rothfuss', cover: nomeVentoCover, genre: 'Fantasia', pages: 672, startDate: '1 de abril, 2026', endDate: '12 de abril, 2026' },
  '3': { title: 'Duna', author: 'Frank Herbert', cover: dunaCover, genre: 'Ficção', pages: 688, startDate: '15 de março, 2026', endDate: '2 de maio, 2026' },
  '4': { title: '1984', author: 'George Orwell', cover: orwellCover, genre: 'Distopia', pages: 416, startDate: '10 de março, 2026', endDate: '20 de março, 2026' },
  '5': { title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', cover: hobbitCover, genre: 'Fantasia', pages: 1216, startDate: '1 de janeiro, 2026', endDate: '25 de janeiro, 2026' },
  '9': { title: 'O Alquimista', author: 'Paulo Coelho', cover: alquimistaCover, genre: 'Romance', pages: 200, startDate: '5 de abril, 2026', endDate: '10 de abril, 2026' }
}

const bookId = (route.params.id as string) || '3'
const book = computed(() => (booksDatabase[bookId] || booksDatabase['3']) as BookInfo)

const reviewRating = ref(4)
const reviewText = ref('')
const tags = ref(['Fantasia', 'Magia', 'Épico'])

const desktopPlaceholder = `O que você achou do livro? Compartilhe sua experiência com a comunidade...

Dicas do que escrever:
• Pontos fortes e fracos
• Personagens favoritos
• Citações marcantes
• Recomenda para quem?`

const mobilePlaceholder = `O que você achou do livro? Compartilhe sua experiência com a comunidade...`

const addTag = () => {
  const newTag = prompt('Digite a nova tag:')
  if (newTag && newTag.trim()) {
    tags.value.push(newTag.trim())
  }
}

const goBack = () => {
  router.push('/livro/' + bookId)
}

const publishReview = () => {
  if (!reviewText.value.trim()) {
    alert('Por favor, escreva sua resenha antes de publicar!')
    return
  }
  alert('Resenha publicada com sucesso na comunidade!')
  router.push('/comunidade')
}
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6">

    <!-- ===================================================================== -->
    <!-- ========================= DESKTOP LAYOUT ============================ -->
    <!-- ===================================================================== -->
    <div class="hidden lg:block space-y-6">
      
      <!-- Desktop Header Row -->
      <div class="flex items-center justify-between pb-3 border-b border-[#B06E02]/10 mb-6">
        <div class="flex items-center gap-4">
          <button 
            @click="goBack" 
            class="p-2 text-[#13213C] hover:text-[#B06E02] transition-colors cursor-pointer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span class="text-3xl font-bold text-[#13213C]">Escrever Resenha</span>
        </div>
        <!-- Right Icons -->
        <div class="flex items-center gap-3 text-[#FCAE1E]">
          <button class="p-2 hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="p-2 hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Two-Column Layout Grid -->
      <div class="grid grid-cols-3 gap-8">
        
        <!-- Left Column (Sub Cards) -->
        <div class="col-span-1 space-y-6">
          
          <!-- Book Info Card -->
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs flex gap-4 items-center">
            <img :src="book.cover" :alt="book.title" class="w-16 h-24 object-cover rounded-lg flex-shrink-0 shadow-xs border border-gray-100" />
            <div class="min-w-0 flex-1">
              <h2 class="text-lg font-bold text-[#13213C] truncate leading-snug">{{ book.title }}</h2>
              <p class="text-xs text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
              <span class="inline-block bg-[#FFF5CD] text-[#B06E02] text-xs font-bold px-3 py-1 rounded-full mt-2.5">
                Concluído
              </span>
            </div>
          </div>

          <!-- Rating Card -->
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua avaliação</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                <!-- Stars clickable interaction -->
                <svg 
                  v-for="star in 5" 
                  :key="star"
                  @click="reviewRating = star"
                  class="w-7 h-7 cursor-pointer transition-all duration-200"
                  viewBox="0 0 24 24"
                >
                  <path 
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    :fill="star <= reviewRating ? '#FCAE1E' : '#FFF9E6'"
                    :stroke="star <= reviewRating ? '#FCAE1E' : '#D1C2A5'"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
              <span class="text-xl font-bold text-[#13213C]">{{ reviewRating }}/5</span>
            </div>
          </div>

          <!-- Sua Leitura dates Card -->
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua leitura</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="block text-[10px] text-gray-400 font-semibold uppercase">Início</span>
                <span class="text-xs font-bold text-[#13213C] block mt-1">{{ book.startDate }}</span>
              </div>
              <div>
                <span class="block text-[10px] text-gray-400 font-semibold uppercase">Conclusão</span>
                <span class="text-xs font-bold text-[#13213C] block mt-1">{{ book.endDate }}</span>
              </div>
            </div>
          </div>

          <!-- Tags Card -->
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(tag, idx) in tags" 
                :key="tag"
                class="text-xs font-bold px-3.5 py-1.5 rounded-full"
                :class="idx === 0 ? 'bg-[#13213C] text-white' : 'bg-[#E5ECF6] text-[#13213C]'"
              >
                {{ tag }}
              </span>
              <button 
                @click="addTag"
                class="bg-[#E5ECF6] text-[#13213C] text-xs font-bold px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-[#DCE5F4] transition duration-200 select-none outline-hidden"
              >
                + Adicionar
              </button>
            </div>
          </div>

        </div>

        <!-- Right Column (Review input area) -->
        <div class="col-span-2 space-y-6">
          
          <!-- Sua resenha box -->
          <div class="bg-white border border-[#B06E02]/5 p-6 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest mb-1.5">Sua resenha</h3>
              <p class="text-xs text-gray-400 font-semibold">Compartilhe sua experiência sobre o livro com a comunidade.</p>
            </div>

            <!-- Custom bordered text area container -->
            <div class="border border-[#E5DED1] rounded-2xl p-5 bg-white">
              <textarea 
                v-model="reviewText"
                maxlength="1000"
                :placeholder="desktopPlaceholder"
                rows="12"
                class="w-full h-[320px] bg-transparent text-sm font-semibold text-[#13213C] border-none outline-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400/80 leading-relaxed"
              ></textarea>
            </div>

            <!-- Bottom Row -->
            <div class="flex justify-between items-center pt-1">
              <span class="text-xs text-gray-400 font-semibold">{{ reviewText.length }}/1000 caracteres</span>
              <button 
                @click="publishReview"
                class="bg-[#FCAE1E] hover:bg-[#E09612] text-white font-bold text-xs py-3.5 px-6 rounded-xl transition duration-200 cursor-pointer select-none"
              >
                Publicar resenha
              </button>
            </div>
          </div>

          <!-- Anotações Card -->
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs flex flex-col space-y-3">
            <div>
              <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest mb-1.5">Anotações do livro</h3>
              <p class="text-xs text-gray-400 font-semibold">Você tem 18 anotações neste livro. Adicione-as à sua resenha?</p>
            </div>
            <button class="text-xs font-bold text-[#B06E02] hover:underline flex items-center gap-1.5 transition cursor-pointer select-none self-start">
              &gt; Ver minhas anotações
            </button>
          </div>

        </div>

      </div>

    </div>

    <!-- ===================================================================== -->
    <!-- ========================== MOBILE LAYOUT ============================ -->
    <!-- ===================================================================== -->
    <div class="lg:hidden flex flex-col space-y-4">
      
      <!-- Sticky Mobile Top Header Bar -->
      <div class="sticky top-0 z-40 bg-[#FFFDF3] px-6 py-4 border-b border-[#B06E02]/10 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 flex items-center gap-4 select-none">
        <button @click="goBack" class="p-1 text-[#13213C] hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <span class="text-xl font-bold text-[#13213C]">Escrever Resenha</span>
      </div>

      <!-- Content Stack -->
      <div class="space-y-4 pb-6">
        
        <!-- Book Info Card -->
        <div class="bg-white border border-[#B06E02]/5 p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <img :src="book.cover" :alt="book.title" class="w-14 h-20 object-cover rounded-lg flex-shrink-0 shadow-xs border border-gray-50" />
          <div class="flex-1 min-w-0 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-[#13213C] truncate leading-snug">{{ book.title }}</h2>
              <p class="text-[11px] text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
            </div>
            <span class="bg-[#FFF5CD] text-[#B06E02] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Concluído
            </span>
          </div>
        </div>

        <!-- Rating Card -->
        <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-3.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua avaliação</h3>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <svg 
                v-for="star in 5" 
                :key="star"
                @click="reviewRating = star"
                class="w-7 h-7 cursor-pointer transition duration-200 select-none"
                viewBox="0 0 24 24"
              >
                <path 
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  :fill="star <= reviewRating ? '#FCAE1E' : 'none'"
                  :stroke="star <= reviewRating ? '#FCAE1E' : '#B4A996'"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <span class="text-lg font-bold text-[#13213C]">{{ reviewRating }}/5</span>
          </div>
        </div>

        <!-- Dates Card -->
        <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-3.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua leitura</h3>
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <span class="block text-[10px] text-gray-400 font-semibold uppercase">Início</span>
              <span class="text-xs font-bold text-[#13213C] block mt-1">{{ book.startDate }}</span>
            </div>
            <div class="w-px h-8 bg-[#FCAE1E] mx-4"></div>
            <div class="flex-1">
              <span class="block text-[10px] text-gray-400 font-semibold uppercase">Conclusão</span>
              <span class="text-xs font-bold text-[#13213C] block mt-1">{{ book.endDate }}</span>
            </div>
          </div>
        </div>

        <!-- Tags Card -->
        <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-3.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(tag, idx) in tags" 
              :key="tag"
              class="text-[11px] font-bold px-3.5 py-1.5 rounded-full"
              :class="idx === 0 ? 'bg-[#13213C] text-white' : 'bg-[#E5ECF6] text-[#13213C]'"
            >
              {{ tag }}
            </span>
            <button 
              @click="addTag"
              class="bg-[#E5ECF6] text-[#13213C] text-[11px] font-bold px-3.5 py-1.5 rounded-full cursor-pointer select-none"
            >
              + Adicionar
            </button>
          </div>
        </div>

        <!-- Review Textarea Card (Titled "Sua leitura" to match Figma mobile screenshot) -->
        <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua leitura</h3>
          
          <!-- Orange bordered box -->
          <div class="border border-[#FCAE1E] rounded-2xl p-4">
            <textarea 
              v-model="reviewText"
              maxlength="1000"
              :placeholder="mobilePlaceholder"
              rows="8"
              class="w-full h-[220px] bg-transparent text-sm font-semibold text-[#13213C] border-none outline-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400/80 leading-relaxed"
            ></textarea>
          </div>

          <!-- Submit button -->
          <button 
            @click="publishReview"
            class="w-full bg-[#FCAE1E] hover:bg-[#E09612] text-white font-bold text-xs py-3.5 rounded-xl transition duration-200 cursor-pointer select-none text-center"
          >
            Publicar resenha
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
</style>
