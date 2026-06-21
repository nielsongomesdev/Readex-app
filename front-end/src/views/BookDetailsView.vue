<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from '../services/api'
import { googleBooksApi } from '../services/googleBooks'
import { getMockBookDetails } from '../services/mockBooks'

import mascotReading from '../assets/images/mascote-3.png'

const router = useRouter()
const route = useRoute()
const activeTabMobile = ref('detalhes') 
const loading = ref(true)
const shelfStatus = ref('')
const pagesRead = ref(0)
const savingShelf = ref(false)
const errorOccurred = ref(false)
const errorMessage = ref('')

const book = ref({
  title: '',
  author: '',
  cover: '',
  rating: 4.5,
  reviewsCount: '1.2k',
  tags: [] as string[],
  editora: '',
  ano: 2026,
  paginas: 0,
  genero: '',
  progress: 0,
  pagesRead: 0,
  synopsis: '',
  reviews: [
    { name: 'Maria S.', date: '12/04/2026', rating: 5, text: 'Leitura transformadora! Me fez repensar meus sonhos e objetivos de vida. Recomendo muito.' },
    { name: 'João P.', date: '05/04/2026', rating: 4, text: 'Livro muito inspirador, porém a narrativa é um pouco lenta no meio. Ainda assim vale muito a leitura.' },
    { name: 'Ana L.', date: '01/04/2026', rating: 5, text: 'Um clássico que todo mundo deveria ler! A história é simples mas profunda e muito bem escrita.' }
  ]
})

const fetchBookDetails = async () => {
  const id = route.params.id
  if (!id) return

  loading.value = true
  errorOccurred.value = false
  errorMessage.value = ''
  try {
    const response = await googleBooksApi.getVolume(id as string)
    const volumeInfo = response.data.volumeInfo || {}
    
    let publishedYear = 2026
    if (volumeInfo.publishedDate) {
      const parts = volumeInfo.publishedDate.split('-')
      if (parts[0]) {
        publishedYear = parseInt(parts[0]) || 2026
      }
    }

    book.value = {
      title: volumeInfo.title || 'Título desconhecido',
      author: volumeInfo.authors ? volumeInfo.authors[0] : 'Autor desconhecido',
      cover: volumeInfo.imageLinks?.thumbnail || '',
      rating: volumeInfo.averageRating || 4.5,
      reviewsCount: volumeInfo.ratingsCount ? volumeInfo.ratingsCount.toLocaleString() : '1.2k',
      tags: volumeInfo.categories || ['Livros'],
      editora: volumeInfo.publisher || 'Editora desconhecida',
      ano: publishedYear,
      paginas: volumeInfo.pageCount || 250,
      genero: volumeInfo.categories ? volumeInfo.categories[0] : 'Geral',
      progress: 0,
      pagesRead: 0,
      synopsis: volumeInfo.description ? volumeInfo.description.replace(/<[^>]*>/g, '') : 'Sinopse não disponível.',
      reviews: book.value.reviews
    }
  } catch (error: any) {
    console.error('Erro ao buscar detalhes do livro:', error)
    errorOccurred.value = true
    const is429 = error.response?.status === 429 || error.message?.includes('429')
    if (is429) {
      errorMessage.value = 'Muitas requisições (Limite da API atingido). Exibindo detalhes simulados offline.'
    } else {
      errorMessage.value = 'Erro de rede ao carregar detalhes. Exibindo detalhes simulados offline.'
    }
    
    const mock = getMockBookDetails(id as string)
    book.value = {
      title: mock.title,
      author: mock.author,
      cover: mock.cover,
      rating: mock.rating,
      reviewsCount: mock.reviewsCount,
      tags: mock.tags,
      editora: mock.editora,
      ano: mock.ano,
      paginas: mock.pages,
      genero: mock.genre,
      progress: 0,
      pagesRead: 0,
      synopsis: mock.synopsis,
      reviews: book.value.reviews
    }
  } finally {
    loading.value = false
  }
}

const fetchShelfStatus = async () => {
  try {
    const res = await api.get('/shelf')
    const shelfItems = res.data || []
    const item = shelfItems.find((ub: any) => ub.bookId === route.params.id)
    if (item) {
      shelfStatus.value = item.status
      pagesRead.value = item.pagesRead || 0
      book.value.progress = book.value.paginas > 0 ? Math.round((pagesRead.value / book.value.paginas) * 100) : 0
      book.value.pagesRead = pagesRead.value
    }
  } catch (err) {
    console.error('Erro ao buscar status na estante:', err)
  }
}

const updateShelfStatus = async (status: string) => {
  savingShelf.value = true
  try {
    // Ensure book exists in the backend DB first
    try {
      await api.post('/books', {
        id: route.params.id,
        title: book.value.title,
        author: book.value.author,
        description: book.value.synopsis,
        coverUrl: book.value.cover
      })
    } catch (err) {
      console.log('Book may already exist', err)
    }

    await api.post('/shelf', {
      bookId: route.params.id,
      status: status,
      pagesRead: status === 'Lido' ? book.value.paginas : (status === 'Quero Ler' ? 0 : pagesRead.value)
    })

    shelfStatus.value = status
    if (status === 'Lido') {
      pagesRead.value = book.value.paginas
    } else if (status === 'Quero Ler') {
      pagesRead.value = 0
    }
    book.value.pagesRead = pagesRead.value
    book.value.progress = book.value.paginas > 0 ? Math.round((pagesRead.value / book.value.paginas) * 100) : 0
    
    alert(`Livro adicionado/atualizado na estante como: ${status}`)
  } catch (err) {
    console.error('Erro ao atualizar estante:', err)
    alert('Erro ao atualizar estante.')
  } finally {
    savingShelf.value = false
  }
}

const updateReadingProgress = async () => {
  if (pagesRead.value > book.value.paginas) {
    alert(`O número de páginas lidas não pode exceder o total de páginas (${book.value.paginas})`)
    return
  }
  savingShelf.value = true
  try {
    try {
      await api.post('/books', {
        id: route.params.id,
        title: book.value.title,
        author: book.value.author,
        description: book.value.synopsis,
        coverUrl: book.value.cover
      })
    } catch (err) {
      // Swallowed
    }

    const newStatus = pagesRead.value === book.value.paginas ? 'Lido' : 'Lendo'

    await api.post('/shelf', {
      bookId: route.params.id,
      status: newStatus,
      pagesRead: pagesRead.value
    })

    shelfStatus.value = newStatus
    book.value.pagesRead = pagesRead.value
    book.value.progress = book.value.paginas > 0 ? Math.round((pagesRead.value / book.value.paginas) * 100) : 0
    
    alert('Progresso de leitura atualizado com sucesso!')
  } catch (err) {
    console.error('Erro ao atualizar progresso:', err)
    alert('Erro ao atualizar progresso de leitura.')
  } finally {
    savingShelf.value = false
  }
}

onMounted(async () => {
  await fetchBookDetails()
  await fetchShelfStatus()
})

const goBack = () => {
  router.push('/estante')
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- Loading State -->
    <div v-if="loading" class="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <svg class="animate-spin h-10 w-10 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-sm text-gray-400 font-bold uppercase tracking-wider animate-pulse">Carregando detalhes do livro...</span>
    </div>

    <!-- Main Content -->
    <template v-else>


      <div class="hidden lg:flex items-center justify-between pb-3 border-b border-[#B06E02]/10">
      <div class="flex items-center text-sm font-medium">
        <button 
          @click="goBack" 
          class="flex items-center gap-2 text-gray-400 hover:text-[#B06E02] transition cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Minha Estante
        </button>
        <span class="text-gray-300 mx-2.5">/</span>
        <span class="text-sm font-bold text-[#13213C]">Detalhes do Livro</span>
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

    
    <div class="flex lg:hidden items-center justify-between py-2 border-b border-[#B06E02]/10 mb-2">
      <button @click="goBack" class="p-1 text-[#13213C] hover:bg-gray-100 rounded-lg transition cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <span class="text-base font-bold text-[#13213C]">Detalhes do livro</span>
      <button class="p-1 text-[#13213C] hover:bg-gray-100 rounded-lg transition cursor-pointer">
        
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l1.99 1.99a3 3 0 004.243 0l1.99-1.99a3 3 0 000-4.243l-1.99-1.99a3 3 0 00-4.243 0l-1.99 1.99a3 3 0 000 4.243z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21V12" />
        </svg>
      </button>
    </div>

    
    
    <div class="hidden lg:flex bg-[#13213C] rounded-3xl p-8 gap-8 items-center text-white">
      
      <img 
        v-if="book.cover"
        :src="book.cover" 
        :alt="book.title"
        class="w-40 h-60 object-cover rounded-2xl shadow-xl border border-white/10 flex-shrink-0"
      />
      <div 
        v-else
        class="w-40 h-60 rounded-2xl bg-white/10 border border-white/10 flex-shrink-0 flex flex-col items-center justify-center text-center p-3 shadow-xl"
      >
        <svg class="w-12 h-12 text-[#FCAE1E]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-xs text-white/60 font-bold uppercase tracking-wider mt-3">Sem capa</span>
      </div>
      
      <div class="flex-1 space-y-4">
        <div>
          <h1 class="text-3xl lg:text-4xl font-bold tracking-tight">{{ book.title }}</h1>
          <p class="text-base text-white/80 mt-1.5">{{ book.author }}</p>
        </div>
        
        
        <div class="flex items-center gap-2 text-xs text-white/80">
          <div class="flex items-center text-[#FCAE1E]">
            <svg v-for="i in 4" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <svg class="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span class="font-bold ml-1">{{ book.rating }}</span>
          <span>({{ book.reviewsCount }} avaliações)</span>
        </div>

        
        <div class="flex flex-wrap gap-2.5">
          <span 
            v-for="tag in book.tags" 
            :key="tag"
            class="bg-white/10 hover:bg-white/15 border border-white/5 text-[#FFF5CD] text-xs font-semibold px-4 py-1.5 rounded-full select-none"
          >
            {{ tag }}
          </span>
        </div>

        
        <div class="flex flex-col gap-4 pt-2">
          <div class="flex flex-wrap items-center gap-4">
            <!-- Status Dropdown/Selector -->
            <div class="flex items-center gap-2 bg-[#FFF5CD]/60 border border-[#FCAE1E]/30 rounded-xl px-4 py-2">
              <span class="text-xs font-bold text-[#806602] uppercase tracking-wider">Estante:</span>
              <select 
                v-model="shelfStatus" 
                @change="updateShelfStatus(shelfStatus)"
                :disabled="savingShelf"
                class="bg-transparent text-xs font-bold text-[#13213C] outline-none border-none py-0.5 cursor-pointer focus:ring-0"
              >
                <option value="">(Não Adicionado)</option>
                <option value="Quero Ler">Quero Ler</option>
                <option value="Lendo">Lendo</option>
                <option value="Lido">Lido</option>
              </select>
            </div>

            <!-- Add Review Button -->
            <router-link :to="'/livro/' + $route.params.id + '/resenha'" class="bg-[#FCAE1E] hover:bg-[#FCAE1E]/95 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition cursor-pointer select-none text-center">
              Adicionar resenha
            </router-link>
          </div>

          <!-- Reading Progress Editor (only if status is Lendo) -->
          <div v-if="shelfStatus === 'Lendo'" class="bg-white border border-[#B06E02]/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xs w-full max-w-md">
            <div class="flex-1 w-full">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold text-[#806602]">Páginas lidas:</span>
                <span class="text-xs font-bold text-[#13213C]">{{ pagesRead }} / {{ book.paginas }}</span>
              </div>
              <input 
                type="range" 
                v-model.number="pagesRead" 
                min="0" 
                :max="book.paginas" 
                class="w-full accent-[#FCAE1E]" 
              />
            </div>
            <button 
              @click="updateReadingProgress" 
              :disabled="savingShelf"
              class="bg-[#13213C] hover:bg-[#13213C]/90 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer flex-shrink-0 w-full sm:w-auto text-center"
            >
              Salvar Progresso
            </button>
          </div>
        </div>
      </div>
    </div>

    
    <div class="flex lg:hidden bg-[#13213C] rounded-3xl p-6 flex-col items-center text-center text-white pt-8">
      <img 
        v-if="book.cover"
        :src="book.cover" 
        :alt="book.title"
        class="w-28 h-40 object-cover rounded-xl shadow-md border border-white/10 mb-4"
      />
      <div 
        v-else
        class="w-28 h-40 rounded-xl bg-white/10 border border-white/10 flex flex-col items-center justify-center text-center p-3 shadow-md mb-4"
      >
        <svg class="w-10 h-10 text-[#FCAE1E]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-[10px] text-white/60 font-bold uppercase tracking-wider mt-2">Sem capa</span>
      </div>
      <h1 class="text-xl font-bold">{{ book.title }}</h1>
      <p class="text-sm text-white/80 mt-1">{{ book.author }}</p>
    </div>

    
    <div class="flex lg:hidden flex-col gap-4 bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs">
      <div class="flex justify-between items-center">
        
        <img 
          :src="mascotReading" 
          alt="Mascote Readex"
          class="w-10 h-10 object-contain"
        />
        
        <div class="flex items-center gap-1.5 text-xs text-[#806602]">
          <div class="flex items-center text-[#FCAE1E]">
            <svg v-for="i in 4" :key="i" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <svg class="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <span class="font-bold">{{ book.rating }}</span>
          <span class="text-gray-400">({{ book.reviewsCount }})</span>
        </div>
      </div>
      
      <div>
        <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
          <div class="bg-[#FCAE1E] h-2 rounded-full" :style="{ width: book.progress + '%' }"></div>
        </div>
        <p class="text-xs text-gray-400 font-semibold text-center mt-2.5">
          {{ book.progress }}% • {{ book.pagesRead }} de {{ book.paginas }} páginas
        </p>
      </div>

      <!-- Mobile Shelf Status Selector -->
      <div class="flex items-center justify-between gap-2 pt-2 border-t border-[#B06E02]/5">
        <span class="text-xs font-bold text-[#806602] uppercase tracking-wider">Estante:</span>
        <select 
          v-model="shelfStatus" 
          @change="updateShelfStatus(shelfStatus)"
          :disabled="savingShelf"
          class="bg-transparent text-xs font-bold text-[#13213C] outline-none border border-[#B06E02]/10 rounded-xl px-2 py-1.5 cursor-pointer focus:ring-0"
        >
          <option value="">(Não Adicionado)</option>
          <option value="Quero Ler">Quero Ler</option>
          <option value="Lendo">Lendo</option>
          <option value="Lido">Lido</option>
        </select>
      </div>

      <!-- Mobile Reading Progress Editor (only if status is Lendo) -->
      <div v-if="shelfStatus === 'Lendo'" class="pt-2 border-t border-[#B06E02]/5 space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-[11px] font-bold text-[#806602]">Ajustar páginas lidas:</span>
          <input 
            type="number" 
            v-model.number="pagesRead" 
            min="0" 
            :max="book.paginas"
            class="w-16 text-center text-xs font-bold bg-[#E5ECF6] border border-[#B06E02]/10 rounded-lg py-1 px-1.5 focus:outline-none"
          />
        </div>
        <input 
          type="range" 
          v-model.number="pagesRead" 
          min="0" 
          :max="book.paginas" 
          class="w-full accent-[#FCAE1E]" 
        />
        <button 
          @click="updateReadingProgress" 
          :disabled="savingShelf"
          class="w-full bg-[#13213C] text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer text-center"
        >
          Salvar Progresso
        </button>
      </div>
    </div>

    
    <div class="flex lg:hidden border-b border-[#B06E02]/10 w-full mb-2">
      <button 
        @click="activeTabMobile = 'detalhes'"
        class="flex-1 text-center pb-2.5 text-xs font-bold transition relative cursor-pointer"
        :class="activeTabMobile === 'detalhes' ? 'text-[#13213C]' : 'text-gray-400'"
      >
        Detalhes
        <span v-if="activeTabMobile === 'detalhes'" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B06E02]"></span>
      </button>
      <button 
        @click="activeTabMobile = 'anotacoes'"
        class="flex-1 text-center pb-2.5 text-xs font-bold transition relative cursor-pointer"
        :class="activeTabMobile === 'anotacoes' ? 'text-[#13213C]' : 'text-gray-400'"
      >
        Anotações
        <span v-if="activeTabMobile === 'anotacoes'" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B06E02]"></span>
      </button>
      <button 
        @click="activeTabMobile = 'resenhas'"
        class="flex-1 text-center pb-2.5 text-xs font-bold transition relative cursor-pointer"
        :class="activeTabMobile === 'resenhas' ? 'text-[#13213C]' : 'text-gray-400'"
      >
        Resenhas
        <span v-if="activeTabMobile === 'resenhas'" class="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B06E02]"></span>
      </button>
    </div>

    
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      
      <div 
        class="space-y-6 lg:col-span-1"
        :class="[activeTabMobile === 'detalhes' ? 'block' : 'hidden lg:block']"
      >
        
        <div class="hidden lg:block bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Informações</h2>
          
          <div class="space-y-3.5 divide-y divide-[#B06E02]/10">
            <div class="flex justify-between items-center py-2 text-xs">
              <span class="text-gray-400 font-semibold">Editora</span>
              <span class="font-bold text-[#13213C]">{{ book.editora }}</span>
            </div>
            <div class="flex justify-between items-center pt-3 pb-1 text-xs">
              <span class="text-gray-400 font-semibold">Ano</span>
              <span class="font-bold text-[#13213C]">{{ book.ano }}</span>
            </div>
            <div class="flex justify-between items-center pt-3 pb-1 text-xs">
              <span class="text-gray-400 font-semibold">Páginas</span>
              <span class="font-bold text-[#13213C]">{{ book.paginas }}</span>
            </div>
            <div class="flex justify-between items-center pt-3 pb-1 text-xs">
              <span class="text-gray-400 font-semibold">Gênero</span>
              <span class="font-bold text-[#13213C]">{{ book.genero }}</span>
            </div>
          </div>
        </div>

        
        <div class="hidden lg:block bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-3.5">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Seu progresso</h2>
          
          <div class="flex justify-between items-center">
            <div>
              <span class="text-lg font-bold text-[#13213C]">{{ book.pagesRead }} / {{ book.paginas }} páginas</span>
              <span class="text-[11px] text-gray-400 font-semibold block mt-0.5">{{ book.paginas - book.pagesRead }} páginas restantes</span>
            </div>
            <span class="text-sm font-bold text-[#806602]">{{ book.progress }}%</span>
          </div>
          
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" :style="{ width: book.progress + '%' }"></div>
          </div>
        </div>
      </div>

      
      <div class="lg:col-span-2 space-y-6">
        
        
        <div 
          class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs space-y-3.5"
          :class="[activeTabMobile === 'detalhes' ? 'block' : 'hidden lg:block']"
        >
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Sinopse</h2>
          <p class="text-xs lg:text-sm text-gray-400 font-medium leading-relaxed whitespace-pre-line">
            {{ book.synopsis }}
          </p>
        </div>

        
        <div 
          class="block lg:hidden bg-[#FFFBEA]/40 border border-[#B06E02]/10 p-4 rounded-2xl shadow-xs text-center"
          :class="[activeTabMobile === 'detalhes' ? 'block' : 'hidden']"
        >
          <div class="grid grid-cols-4 gap-2">
            <div>
              <span class="block text-xs font-bold text-[#13213C] truncate">{{ book.editora }}</span>
              <span class="text-[10px] text-gray-400 font-semibold block mt-0.5">Editora</span>
            </div>
            <div>
              <span class="block text-xs font-bold text-[#13213C]">{{ book.ano }}</span>
              <span class="text-[10px] text-gray-400 font-semibold block mt-0.5">Ano</span>
            </div>
            <div>
              <span class="block text-xs font-bold text-[#13213C]">{{ book.paginas }}</span>
              <span class="text-[10px] text-gray-400 font-semibold block mt-0.5">Páginas</span>
            </div>
            <div>
              <span class="block text-xs font-bold text-[#13213C] truncate">{{ book.genero }}</span>
              <span class="text-[10px] text-gray-400 font-semibold block mt-0.5">Gênero</span>
            </div>
          </div>
        </div>

        
        <div 
          class="space-y-4"
          :class="[activeTabMobile === 'resenhas' ? 'block' : 'hidden lg:block']"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Resenhas da comunidade</h2>
            <span class="text-xs text-gray-400 font-semibold hover:text-[#B06E02] transition cursor-pointer select-none">
              Ver todas ({{ book.reviewsCount }}) →
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="review in book.reviews" 
              :key="review.name"
              class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl shadow-xs flex flex-col justify-between"
            >
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  
                  <div class="w-8 h-8 bg-[#13213C] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                    {{ review.name.charAt(0) }}
                  </div>
                  <div>
                    <h4 class="text-xs font-bold text-[#13213C]">{{ review.name }}</h4>
                    <span class="text-[9px] text-gray-400 block">{{ review.date }}</span>
                  </div>
                </div>
                
                <div class="flex items-center text-[#FCAE1E]">
                  <svg v-for="s in review.rating" :key="s" class="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                
                <p class="text-[10px] text-gray-400/90 leading-relaxed font-medium">
                  "{{ review.text }}"
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

    </template>
  </div>
</template>

<style scoped>
</style>
