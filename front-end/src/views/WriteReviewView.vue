<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from '../services/api'
import { googleBooksApi } from '../services/googleBooks'
import { getMockBookDetails } from '../services/mockBooks'

import dunaCover from '../assets/images/duna_cover.png'
import orwellCover from '../assets/images/1984_cover.png'
import hobbitCover from '../assets/images/o_hobbit_cover.png'
import alquimistaCover from '../assets/images/o_alquimista_cover.png'
import nomeVentoCover from '../assets/images/o_nome_do_vento_cover.png'
import atelierCover from '../assets/images/atelier_cover.png'
import objetosCover from '../assets/images/objetos_cortantes_cover.png'
import sapiensCover from '../assets/images/sapiens_cover.png'
import atomicCover from '../assets/images/atomic_habits_cover.png'

const coverMapping: Record<string, string> = {
  'oN-ODwAAQBAJ': atelierCover,
  'L_SjAgAAQBAJ': nomeVentoCover,
  'oT9-DwAAQBAJ': dunaCover,
  '1N8zEAAAQBAJ': orwellCover,
  '0s1u9iT788AC': hobbitCover,
  'qjZPAAAAMAAJ': objetosCover,
  'w9P3BAAAQBAJ': sapiensCover,
  'W1_LDQAAQBAJ': atomicCover,
  'o3v8AgAAQBAJ': alquimistaCover
}

const router = useRouter()
const route = useRoute()

const bookId = route.params.id as string
const loading = ref(true)
const book = ref({
  title: '',
  author: '',
  cover: '',
  pages: 0,
  startDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
  endDate: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
})

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

const fetchBookDetails = async () => {
  loading.value = true
  try {
    const response = await googleBooksApi.getVolume(bookId)
    const volumeInfo = response.data.volumeInfo || {}
    book.value = {
      title: volumeInfo.title || 'Título desconhecido',
      author: volumeInfo.authors ? volumeInfo.authors[0] : 'Autor desconhecido',
      cover: volumeInfo.imageLinks?.thumbnail || coverMapping[bookId] || '',
      pages: volumeInfo.pageCount || 250,
      startDate: book.value.startDate,
      endDate: book.value.endDate
    }
  } catch (err) {
    console.error('Erro ao buscar detalhes do livro para resenha:', err)
    // Fallback to offline mock book details
    const mock = getMockBookDetails(bookId)
    book.value = {
      title: mock.title,
      author: mock.author,
      cover: mock.cover || coverMapping[bookId] || '',
      pages: mock.pages,
      startDate: book.value.startDate,
      endDate: book.value.endDate
    }
  } finally {
    loading.value = false
  }
}

const addTag = () => {
  const newTag = prompt('Digite a nova tag:')
  if (newTag && newTag.trim()) {
    tags.value.push(newTag.trim())
  }
}

const goBack = () => {
  router.push('/livro/' + bookId)
}

const publishReview = async () => {
  if (!reviewText.value.trim()) {
    alert('Por favor, escreva sua resenha antes de publicar!')
    return
  }
  
  try {
    // Ensure book exists in backend DB first
    try {
      await api.post('/books', {
        id: bookId,
        title: book.value.title,
        author: book.value.author,
        description: '',
        coverUrl: book.value.cover
      })
    } catch (err) {
      console.log('Book might already exist', err)
    }

    // Add review
    await api.post('/reviews', {
      bookId: bookId,
      rating: reviewRating.value,
      comment: reviewText.value
    })

    alert('Resenha publicada com sucesso na comunidade!')
    router.push('/comunidade')
  } catch (err) {
    console.error('Erro ao publicar resenha:', err)
    alert('Erro ao publicar resenha.')
  }
}

onMounted(() => {
  fetchBookDetails()
})
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6">

    <!-- Loading State -->
    <div v-if="loading" class="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <svg class="animate-spin h-10 w-10 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-sm text-gray-400 font-bold uppercase tracking-wider animate-pulse">Carregando livro para resenha...</span>
    </div>

    <!-- Main Content -->
    <template v-else>
      <div class="hidden lg:block space-y-6">
      
      
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

      
      <div class="grid grid-cols-3 gap-8">
        
        
        <div class="col-span-1 space-y-6">
          
          
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs flex gap-4 items-center">
            <img v-if="book.cover" :src="book.cover" :alt="book.title" class="w-16 h-24 object-cover rounded-lg flex-shrink-0 shadow-xs border border-gray-100" />
            <div v-else class="w-16 h-24 bg-[#E5ECF6] rounded-lg flex-shrink-0 flex items-center justify-center text-center p-1 border border-gray-200">
              <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide">Sem capa</span>
            </div>
            <div class="min-w-0 flex-1">
              <h2 class="text-lg font-bold text-[#13213C] truncate leading-snug">{{ book.title }}</h2>
              <p class="text-xs text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
              <span class="inline-block bg-[#FFF5CD] text-[#B06E02] text-xs font-bold px-3 py-1 rounded-full mt-2.5">
                Concluído
              </span>
            </div>
          </div>

          
          <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua avaliação</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1">
                
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

        
        <div class="col-span-2 space-y-6">
          
          
          <div class="bg-white border border-[#B06E02]/5 p-6 rounded-2xl shadow-xs space-y-4">
            <div>
              <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest mb-1.5">Sua resenha</h3>
              <p class="text-xs text-gray-400 font-semibold">Compartilhe sua experiência sobre o livro com a comunidade.</p>
            </div>

            
            <div class="border border-[#E5DED1] rounded-2xl p-5 bg-white">
              <textarea 
                v-model="reviewText"
                maxlength="1000"
                :placeholder="desktopPlaceholder"
                rows="12"
                class="w-full h-[320px] bg-transparent text-sm font-semibold text-[#13213C] border-none outline-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400/80 leading-relaxed"
              ></textarea>
            </div>

            
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

    
    
    
    <div class="lg:hidden flex flex-col space-y-4">
      
      
      <div class="sticky top-0 z-40 bg-[#FFFDF3] px-6 py-4 border-b border-[#B06E02]/10 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 flex items-center gap-4 select-none">
        <button @click="goBack" class="p-1 text-[#13213C] hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <span class="text-xl font-bold text-[#13213C]">Escrever Resenha</span>
      </div>

      
      <div class="space-y-4 pb-6">
        
        
        <div class="bg-white border border-[#B06E02]/5 p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <img v-if="book.cover" :src="book.cover" :alt="book.title" class="w-14 h-20 object-cover rounded-lg flex-shrink-0 shadow-xs border border-gray-50" />
          <div v-else class="w-14 h-20 bg-[#E5ECF6] rounded-lg flex-shrink-0 flex items-center justify-center text-center p-1 border border-gray-200">
            <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide">Sem capa</span>
          </div>
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

        
        <div class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-4">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest">Sua leitura</h3>
          
          
          <div class="border border-[#FCAE1E] rounded-2xl p-4">
            <textarea 
              v-model="reviewText"
              maxlength="1000"
              :placeholder="mobilePlaceholder"
              rows="8"
              class="w-full h-[220px] bg-transparent text-sm font-semibold text-[#13213C] border-none outline-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400/80 leading-relaxed"
            ></textarea>
          </div>

          
          <button 
            @click="publishReview"
            class="w-full bg-[#FCAE1E] hover:bg-[#E09612] text-white font-bold text-xs py-3.5 rounded-xl transition duration-200 cursor-pointer select-none text-center"
          >
            Publicar resenha
          </button>
        </div>

      </div>

    </div>

    </template>
  </div>
</template>

<style scoped>
</style>
