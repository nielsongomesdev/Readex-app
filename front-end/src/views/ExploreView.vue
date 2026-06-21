<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { googleBooksApi } from '../services/googleBooks'

import dunaCover from '../assets/images/duna_cover.png'
import orwellCover from '../assets/images/1984_cover.png'
import hobbitCover from '../assets/images/o_hobbit_cover.png'
import alquimistaCover from '../assets/images/o_alquimista_cover.png'

import { getMockBooks } from '../services/mockBooks'

const searchQuery = ref('')
const selectedCategory = ref('Ficção Científica')
const books = ref<any[]>([])
const loading = ref(false)
const errorOccurred = ref(false)
const errorMessage = ref('')
const hasSearched = ref(false)

const categories = [
  'Ficção Científica', 
  'Fantasia', 
  'Romance', 
  'Não-ficção', 
  'Terror', 
  'Clássicos'
]

const loadRecentSearches = () => {
  try {
    const saved = localStorage.getItem('recent-searches')
    return saved ? JSON.parse(saved) : ['Ficção científica', 'Patrick Rothfuss', 'Duna Sequel']
  } catch {
    return ['Ficção científica', 'Patrick Rothfuss', 'Duna Sequel']
  }
}

const recentSearches = ref<string[]>(loadRecentSearches())

const saveRecentSearches = () => {
  localStorage.setItem('recent-searches', JSON.stringify(recentSearches.value))
}

const popularBooks = [
  {
    id: 'oT9-DwAAQBAJ', 
    title: 'Duna',
    author: 'Frank Herbert',
    rating: 4.8,
    pages: 688,
    genre: 'Ficção',
    cover: dunaCover
  },
  {
    id: '1N8zEAAAQBAJ', 
    title: '1984',
    author: 'George Orwell',
    rating: 4.6,
    pages: 416,
    genre: 'Distopia',
    cover: orwellCover
  },
  {
    id: '0s1u9iT788AC', 
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    rating: 4.9,
    pages: 1216,
    genre: 'Fantasia',
    cover: hobbitCover
  },
  {
    id: 'o3v8AgAAQBAJ', 
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    rating: 4.5,
    pages: 200,
    genre: 'Romance',
    cover: alquimistaCover
  }
]

const filteredBooks = computed(() => {
  return hasSearched.value ? books.value : popularBooks
})

const searchBooks = async () => {
  const query = (searchQuery.value || '').trim()
  console.log('Iniciando busca do livro:', query)
  
  if (!query) {
    books.value = []
    hasSearched.value = false
    errorOccurred.value = false
    errorMessage.value = ''
    return
  }

  loading.value = true
  hasSearched.value = true
  errorOccurred.value = false
  errorMessage.value = ''
  try {
    const response = await googleBooksApi.searchVolumes(query)
    const items = response.data.items || []
    console.log('Resultados obtidos:', items.length)
    
    books.value = items.map((item: any) => {
      const volumeInfo = item.volumeInfo || {}
      return {
        id: item.id,
        title: volumeInfo.title || 'Título desconhecido',
        author: volumeInfo.authors ? volumeInfo.authors[0] : 'Autor desconhecido',
        rating: volumeInfo.averageRating || 4.5,
        pages: volumeInfo.pageCount || 250,
        genre: volumeInfo.categories ? volumeInfo.categories[0] : 'Geral',
        cover: volumeInfo.imageLinks?.thumbnail || ''
      }
    })

    if (!recentSearches.value.includes(query)) {
      recentSearches.value.unshift(query)
      if (recentSearches.value.length > 5) {
        recentSearches.value.pop()
      }
      saveRecentSearches()
    }
  } catch (error: any) {
    console.error('Erro de busca:', error)
    errorOccurred.value = true
    const is429 = error.response?.status === 429 || error.message?.includes('429')
    if (is429) {
      errorMessage.value = 'Muitas requisições (Limite da API atingido). Carregando resultados simulados offline.'
    } else {
      errorMessage.value = 'Erro de rede ou ao conectar com o serviço do Google Books. Carregando resultados simulados offline.'
    }
    books.value = getMockBooks(query)
  } finally {
    loading.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  books.value = []
  hasSearched.value = false
  errorOccurred.value = false
  errorMessage.value = ''
}

const removeSearch = (index: number) => {
  recentSearches.value.splice(index, 1)
  saveRecentSearches()
}

const selectRecentSearch = (search: string) => {
  searchQuery.value = search
  searchBooks()
}

const selectCategory = (cat: string) => {
  selectedCategory.value = cat
  searchQuery.value = cat
  searchBooks()
}

let searchTimeout: any = null
watch(searchQuery, (newQuery) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    searchBooks()
  }, 400) // 400ms debounce
})

onMounted(() => {
  // Inicializa sem fazer requisições na montagem para evitar bloqueios desnecessários
  hasSearched.value = false
})
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6">

    
    
    
    <div class="hidden lg:block space-y-8">
      
      
      <div class="bg-[#13213C] text-white py-12 px-8 text-center -mx-8 -mt-8 mb-8 relative">
        <h1 class="text-3xl font-bold">Explore o universo dos livros</h1>
        <p class="text-slate-300 text-xs font-semibold mt-2">
          Descubra novos autores, gêneros e histórias para sua próxima leitura
        </p>

        
        <form @submit.prevent="searchBooks" class="mt-6 max-w-xl mx-auto relative flex items-center w-full">
          <button type="submit" class="absolute left-4 text-[#FCAE1E] hover:scale-105 transition focus:outline-none cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar livros, autores e etc..." 
            class="w-full bg-white text-[#13213C] pl-11 pr-10 py-3.5 rounded-full text-sm font-semibold outline-hidden shadow-xs placeholder-gray-400"
          />
          <button type="button" v-if="searchQuery" @click="clearSearch" class="absolute right-4 text-gray-400 hover:text-[#13213C]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>

      
      <div class="grid grid-cols-3 gap-8">
        
        
        <div class="col-span-2 space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold text-[#E09A1C]">Resultados populares</h2>
            <span class="text-xs font-bold text-[#E09A1C] hover:underline cursor-pointer">Ver tudo →</span>
          </div>



          
          <!-- Loading State Desktop -->
          <div v-if="loading" class="space-y-4 py-12 flex flex-col items-center justify-center bg-white border border-[#B06E02]/10 rounded-2xl shadow-xs">
            <svg class="animate-spin h-8 w-8 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs text-gray-400 font-bold uppercase tracking-wider">Buscando livros...</span>
          </div>

          <div v-else class="space-y-4">
            <router-link 
              v-for="book in filteredBooks" 
              :key="book.id"
              :to="'/livro/' + book.id"
              class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl flex gap-4 hover:shadow-xs transition relative min-w-0 flex-1 block group"
            >
              <img 
                v-if="book.cover"
                :src="book.cover" 
                :alt="book.title"
                class="w-16 h-24 object-cover rounded-lg flex-shrink-0 shadow-xs border border-gray-100"
              />
              <div 
                v-else
                class="w-16 h-24 rounded-lg bg-[#E5ECF6] flex-shrink-0 flex flex-col items-center justify-center text-center p-1 shadow-xs border border-gray-200"
              >
                <svg class="w-6 h-6 text-[#13213C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide mt-1.5 line-clamp-2">Sem capa</span>
              </div>
              
              <div class="flex-1 py-1 min-w-0 flex flex-col justify-between pr-20">
                <div>
                  <h3 class="text-sm font-bold text-[#13213C] group-hover:text-[#B06E02] transition truncate leading-snug">{{ book.title }}</h3>
                  <p class="text-xs text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
                </div>
                
                <div class="flex items-center gap-1.5 text-xs text-gray-400 font-semibold mt-1">
                  <svg class="w-3.5 h-3.5 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span class="text-[#13213C] font-bold">{{ book.rating }}</span>
                  <span>•</span>
                  <span>{{ book.pages }} págs</span>
                </div>
              </div>

              <svg class="w-4 h-4 text-[#FCAE1E] fill-current absolute top-4 right-4" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>

              <span class="bg-[#FFF5CD]/60 text-[#B06E02] text-[10px] font-bold px-3 py-1 rounded-full absolute bottom-4 right-4 uppercase tracking-wider">
                {{ book.genre }}
              </span>
            </router-link>

            <div v-if="filteredBooks.length === 0 && !errorOccurred" class="text-center py-8 text-gray-400 text-sm font-medium">
              Nenhum livro encontrado para sua busca.
            </div>
          </div>
        </div>

        
        <div class="col-span-1 space-y-8">
          
          
          <div class="space-y-4">
            <h2 class="text-sm font-bold text-[#E09A1C]">Pesquisas recentes</h2>
            
            <div class="space-y-2.5">
              <div 
                v-for="(search, index) in recentSearches" 
                :key="search"
                class="bg-white border border-[#B06E02]/10 py-2.5 px-4 rounded-xl flex items-center justify-between shadow-[0_2px_8px_rgba(176,110,2,0.01)]"
              >
                <div 
                  @click="selectRecentSearch(search)"
                  class="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                >
                  <svg class="w-4 h-4 text-[#FCAE1E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span class="text-xs text-gray-400 font-semibold truncate">{{ search }}</span>
                </div>
                <button 
                  @click="removeSearch(index)"
                  class="text-gray-400 hover:text-red-500 transition cursor-pointer p-0.5"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          
          <div class="space-y-4">
            <h2 class="text-sm font-bold text-[#E09A1C]">Explorar por gênero</h2>
            
            <div class="flex flex-wrap gap-2.5">
              <button 
                v-for="cat in categories" 
                :key="cat"
                @click="selectCategory(cat)"
                class="text-xs font-bold px-4 py-2.5 rounded-full transition cursor-pointer"
                :class="selectedCategory === cat ? 'bg-[#13213C] text-white' : 'bg-[#E5ECF6] text-[#13213C] hover:bg-[#E5ECF6]/85'"
              >
                {{ cat }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    
    
    
    
    
    
    <div class="lg:hidden flex flex-col space-y-6">
      
      
      <div class="sticky top-0 z-40 bg-[#13213C] px-6 py-3.5 border-b border-[#B06E02]/10 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 flex items-center justify-between select-none shadow-xs">
        <form @submit.prevent="searchBooks" class="w-full relative flex items-center">
          <button type="submit" class="absolute left-3.5 text-gray-400 focus:outline-none cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar livros, autores, ISBN..." 
            class="w-full bg-white text-[#13213C] pl-10 pr-9 py-2 rounded-full text-xs font-semibold outline-hidden placeholder-gray-400"
          />
          <button type="button" v-if="searchQuery" @click="clearSearch" class="absolute right-3.5 text-gray-400 hover:text-[#13213C]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </form>
      </div>

      
      <div class="space-y-3">
        <h2 class="text-sm font-bold text-[#E09A1C]">Pesquisas recentes</h2>
        
        <div class="space-y-2.5">
          <div 
            v-for="search in recentSearches" 
            :key="search + '-mobile'"
            @click="selectRecentSearch(search)"
            class="bg-white border border-[#B06E02]/10 py-2.5 px-4 rounded-xl flex items-center shadow-xs cursor-pointer hover:bg-gray-50/50 transition animate-fade-in"
          >
            <svg class="w-4 h-4 text-[#FCAE1E] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="text-xs text-gray-400 font-semibold truncate">{{ search }}</span>
          </div>
        </div>
      </div>

      
      <div class="space-y-3">
        <h2 class="text-sm font-bold text-[#E09A1C]">Explorar por gênero</h2>
        
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="cat in categories" 
            :key="cat + '-mobile'"
            @click="selectCategory(cat)"
            class="text-xs font-bold px-4 py-2.5 rounded-full transition cursor-pointer"
            :class="selectedCategory === cat ? 'bg-[#13213C] text-white' : 'bg-[#E5ECF6] text-[#13213C]'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      
      <div class="space-y-3">
        <h2 class="text-sm font-bold text-[#E09A1C]">Resultados populares</h2>
        

        
        <!-- Loading State Mobile -->
        <div v-if="loading" class="space-y-4 py-8 flex flex-col items-center justify-center bg-white border border-[#B06E02]/10 rounded-2xl shadow-xs">
          <svg class="animate-spin h-6 w-6 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Buscando livros...</span>
        </div>

        <div v-else class="space-y-4 pb-6">
          <router-link 
            v-for="book in filteredBooks" 
            :key="book.id + '-mobile'"
            :to="'/livro/' + book.id"
            class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl flex gap-4 shadow-xs relative block"
          >
            <img 
              v-if="book.cover"
              :src="book.cover" 
              :alt="book.title"
              class="w-14 h-20 object-cover rounded-lg flex-shrink-0 shadow-xs border border-gray-50"
            />
            <div 
              v-else
              class="w-14 h-20 rounded-lg bg-[#E5ECF6] flex-shrink-0 flex flex-col items-center justify-center text-center p-1 shadow-xs border border-gray-200"
            >
              <svg class="w-5 h-5 text-[#13213C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span class="text-[7px] text-gray-400 font-bold uppercase tracking-wide mt-1 line-clamp-2">Sem capa</span>
            </div>
            
            <div class="flex-1 py-0.5 min-w-0 flex flex-col justify-between pr-14">
              <div>
                <h3 class="text-xs font-bold text-[#13213C] truncate leading-snug">{{ book.title }}</h3>
                <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
              </div>
              
              <div class="flex items-center gap-1 mt-1 text-[10px] text-gray-400 font-semibold">
                <div class="flex items-center">
                  <svg 
                    v-for="star in 5" 
                    :key="star" 
                    class="w-3 h-3" 
                    :class="star <= Math.floor(book.rating) ? 'text-[#FCAE1E] fill-current' : 'text-gray-200'" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                </div>
                <span class="text-[#13213C] font-bold ml-1">{{ book.rating }}</span>
              </div>
            </div>

            <svg class="w-4 h-4 text-[#FCAE1E] fill-current absolute top-4 right-4" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
            </svg>

            <span class="bg-[#FFF5CD]/60 text-[#B06E02] text-[9px] font-bold px-2.5 py-0.5 rounded-full absolute bottom-4 right-4 uppercase tracking-wider">
              {{ book.genre }}
            </span>
          </router-link>

          <div v-if="filteredBooks.length === 0 && !errorOccurred" class="text-center py-8 text-gray-400 text-sm font-medium">
            Nenhum livro encontrado para sua busca.
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
