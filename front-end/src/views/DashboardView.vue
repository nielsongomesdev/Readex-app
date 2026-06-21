<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { api } from '../services/api'
import { name as userName } from '@/store/userStore'
import { googleBooksApi } from '../services/googleBooks'
import { getMockBooks, getMockBookDetails } from '../services/mockBooks'

const router = useRouter()

const firstName = computed(() => {
  const nameValue = userName.value.trim()
  return nameValue ? nameValue.split(' ')[0] : 'Leitor'
})

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  const dateStr = new Date().toLocaleDateString('pt-BR', options)
  return dateStr.charAt(0).toUpperCase() + dateStr.slice(1)
})

const shortcuts = [
  { name: '+ Livro', icon: 'plus' },
  { name: 'Estante', icon: 'bookshelf' },
  { name: 'Feed Social', icon: 'community' },
  { name: 'Progresso', icon: 'progress' }
]

interface SuggestionBook {
  id: string
  title: string
  author: string
  genre: string
  cover: string
}

const suggestions = ref<SuggestionBook[]>([])
const loadingSuggestions = ref(false)

const lendoBooks = ref<any[]>([])
const lidosBooks = ref<any[]>([])
const loadingShelf = ref(true)
const monthGoal = ref(8)

// Compute values for Currently Reading book and Goal Progress
const lendoBook = computed(() => {
  return lendoBooks.value.length > 0 ? lendoBooks.value[0] : null
})

const lidosThisMonth = computed(() => {
  const now = new Date()
  return lidosBooks.value.filter(b => {
    const updateDate = new Date(b.updatedAt)
    return updateDate.getFullYear() === now.getFullYear() && updateDate.getMonth() === now.getMonth()
  }).length
})

const metaPercent = computed(() => {
  if (monthGoal.value <= 0) return 0
  const pct = Math.round((lidosThisMonth.value / monthGoal.value) * 100)
  return Math.min(pct, 100)
})

const fetchSuggestions = async () => {
  loadingSuggestions.value = true
  try {
    const response = await googleBooksApi.searchVolumes('subject:fiction', 2)
    const items = response.data.items || []
    suggestions.value = items.map((item: any) => {
      const volumeInfo = item.volumeInfo || {}
      return {
        id: item.id,
        title: volumeInfo.title || 'Título desconhecido',
        author: volumeInfo.authors ? volumeInfo.authors[0] : 'Autor desconhecido',
        genre: volumeInfo.categories ? volumeInfo.categories[0] : 'Ficção',
        cover: volumeInfo.imageLinks?.thumbnail || ''
      }
    })
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error)
    // Fallback to offline mock suggestions
    const mockList = getMockBooks('ficção')
    suggestions.value = mockList.slice(0, 2).map(b => ({
      id: b.id,
      title: b.title,
      author: b.author,
      genre: b.genre,
      cover: b.cover
    }))
  } finally {
    loadingSuggestions.value = false
  }
}

const fetchShelfData = async () => {
  loadingShelf.value = true
  try {
    const res = await api.get('/shelf')
    const items = res.data || []
    lendoBooks.value = []
    lidosBooks.value = []
    
    for (const item of items) {
      const dbBook = item.book || {}
      
      let totalPages = 250
      let bookCover = dbBook.coverUrl || ''
      
      try {
        const gResponse = await googleBooksApi.getVolume(dbBook.id)
        const volumeInfo = gResponse.data.volumeInfo || {}
        totalPages = volumeInfo.pageCount || totalPages
        if (!bookCover && volumeInfo.imageLinks?.thumbnail) {
          bookCover = volumeInfo.imageLinks.thumbnail
        }
      } catch (gErr) {
        const mock = getMockBookDetails(dbBook.id)
        totalPages = mock.pages || totalPages
        if (!bookCover && mock.cover) {
          bookCover = mock.cover
        }
      }
      
      const mapped = {
        id: dbBook.id,
        title: dbBook.title || 'Título desconhecido',
        author: dbBook.author || 'Autor desconhecido',
        cover: bookCover,
        pagesRead: item.pagesRead || 0,
        totalPages,
        progress: totalPages > 0 ? Math.round(((item.pagesRead || 0) / totalPages) * 100) : 0,
        updatedAt: item.updatedAt,
        status: item.status
      }
      
      if (item.status === 'Lendo') {
        lendoBooks.value.push(mapped)
      } else if (item.status === 'Lido') {
        lidosBooks.value.push(mapped)
      }
    }
    
    // Sort currently reading by updated date descending
    lendoBooks.value.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  } catch (err) {
    console.error('Error fetching dashboard shelf data:', err)
  } finally {
    loadingShelf.value = false
  }
}

onMounted(() => {
  fetchSuggestions()
  fetchShelfData()
})

const navigateShortcut = (icon: string) => {
  if (icon === 'plus') {
    router.push('/explorar')
  } else if (icon === 'bookshelf') {
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
    
    <!-- Title Desktop -->
    <div class="hidden lg:flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-[#B06E02]">Bom dia, {{ firstName }}!</h1>
        <p class="text-xs text-gray-400 font-semibold">{{ formattedDate }}</p>
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

    <!-- Title Mobile -->
    <div class="flex lg:hidden items-center gap-5 py-2 px-1">
      <div class="w-24 h-24 flex-shrink-0">
        <img 
          src="../assets/images/mascote-1.png" 
          alt="Mascote Readex feliz" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-[#E09A1C]">Bom dia, {{ firstName }}!</h1>
        <p class="text-sm text-gray-400 font-medium mt-1">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Currently Reading dynamically linked -->
        <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Lendo agora</h2>
          
          <!-- Loading state -->
          <div v-if="loadingShelf" class="flex flex-col items-center justify-center py-8 space-y-2">
            <svg class="animate-spin h-6 w-6 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider animate-pulse">Carregando livro...</span>
          </div>

          <!-- Dynamic Book Display -->
          <div v-else-if="lendoBook" class="flex gap-5 items-center bg-white border border-[#B06E02]/10 p-4 rounded-xl shadow-xs">
            <img 
              v-if="lendoBook.cover"
              :src="lendoBook.cover" 
              :alt="lendoBook.title"
              class="w-16 h-24 object-cover rounded-lg shadow-sm border border-[#B06E02]/10 flex-shrink-0"
            />
            <div v-else class="w-16 h-24 bg-[#E5ECF6] rounded-lg flex-shrink-0 flex items-center justify-center text-center p-1 border border-gray-200">
              <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide">Sem capa</span>
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-between h-24 py-1">
              <div>
                <h3 class="text-sm font-bold text-[#13213C] truncate leading-snug">{{ lendoBook.title }}</h3>
                <p class="text-xs text-gray-400 font-semibold truncate mt-0.5">{{ lendoBook.author }}</p>
              </div>
              <div>
                <div class="flex justify-between items-center text-xs mb-1.5 font-bold text-[#806602]">
                  <span>{{ lendoBook.pagesRead }} de {{ lendoBook.totalPages }} págs</span>
                  <span>{{ lendoBook.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200/60 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-[#FCAE1E] h-1.5 rounded-full" :style="{ width: lendoBook.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="border-2 border-dashed border-[#B06E02]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div class="p-3 bg-[#FFF5CD]/40 rounded-full text-[#B06E02]">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p class="text-sm font-semibold text-gray-500">Você ainda não iniciou nenhuma leitura.</p>
            <button 
              @click="router.push('/explorar')"
              class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition duration-150 cursor-pointer shadow-sm"
            >
              Explorar Livros
            </button>
          </div>
        </div>

        <!-- Mobile Meta do Mês -->
        <div class="block lg:hidden bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-3.5">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Meta do mês</h2>
          <div class="flex justify-between items-center text-[#806602]">
            <div>
              <span class="text-base font-bold">{{ lidosThisMonth }} de {{ monthGoal }}</span>
              <span class="text-sm font-medium ml-1.5">livros lidos</span>
            </div>
            <span class="text-sm font-bold">{{ metaPercent }}%</span>
          </div>
          
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" :style="{ width: metaPercent + '%' }"></div>
          </div>
        </div>

        <!-- Quick Shortcuts -->
        <div class="space-y-3">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Atalhos rápidos</h2>
          
          <!-- Desktop Grid -->
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

          <!-- Mobile Carousel -->
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

        <!-- Social Activity Placeholder -->
        <div class="space-y-3">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Da comunidade</h2>
          <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-6 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] flex flex-col items-center justify-center text-center py-8">
            <svg class="w-8 h-8 text-[#B06E02]/60 mb-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p class="text-xs md:text-sm font-semibold text-gray-500">Nenhuma atividade recente na comunidade. Siga leitores para ver as atualizações!</p>
          </div>
        </div>

      </div>

      <!-- Right Column (Desktop sidebar only) -->
      <div class="hidden lg:block space-y-6">
        
        <!-- Desktop Meta do Mês -->
        <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest mb-2">Meta do mês</h2>
              <span class="text-xl font-bold text-[#806602]">{{ lidosThisMonth }} de {{ monthGoal }}</span>
              <span class="text-xs text-gray-400 font-semibold block mt-0.5">livros lidos</span>
            </div>
            <span class="text-sm font-bold text-[#806602] mt-6">{{ metaPercent }}%</span>
          </div>
          
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" :style="{ width: metaPercent + '%' }"></div>
          </div>
        </div>

        <!-- Suggested books -->
        <div class="bg-[#FFFBEA] border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Sugerido para você</h2>
          
          <div v-if="loadingSuggestions" class="flex flex-col items-center justify-center py-4 space-y-2">
            <svg class="animate-spin h-5 w-5 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider animate-pulse">Buscando sugestões...</span>
          </div>

          <template v-else>
            <div v-for="book in suggestions" :key="book.id" class="flex gap-4 p-1 border-b border-[#B06E02]/5 last:border-b-0 pb-3 last:pb-0">
              <router-link :to="'/livro/' + book.id" class="flex gap-4 w-full group">
                <img 
                  v-if="book.cover"
                  :src="book.cover" 
                  :alt="book.title"
                  class="w-14 h-20 object-cover rounded-lg shadow-sm border border-[#B06E02]/10 flex-shrink-0"
                />
                <div v-else class="w-14 h-20 bg-[#E5ECF6] rounded-lg flex-shrink-0 flex items-center justify-center text-center p-1 border border-gray-200">
                  <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide">Sem capa</span>
                </div>
                <div class="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 class="text-xs font-bold text-[#806602] truncate group-hover:text-[#B06E02] transition">{{ book.title }}</h3>
                  <p class="text-[10px] text-gray-400 font-semibold truncate mt-0.5">{{ book.author }}</p>
                  <span class="inline-block self-start text-[8px] font-bold text-[#B06E02] bg-[#FFF5CD]/50 px-2 py-0.5 rounded-full mt-1.5">
                    {{ book.genre }}
                  </span>
                </div>
              </router-link>
            </div>
            <div v-if="suggestions.length === 0" class="text-center py-2 text-gray-400 text-xs font-semibold">
              Nenhuma sugestão encontrada.
            </div>
          </template>
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
