<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import { googleBooksApi } from '../services/googleBooks'
import { getMockBookDetails } from '../services/mockBooks'

const router = useRouter()

const loading = ref(true)
const lendoBooks = ref<any[]>([])
const lidosBooks = ref<any[]>([])
const totalPagesRead = ref(0)
const totalReviews = ref(0)
const monthGoal = ref(8)

// Dynamic current reading book
const lendoBookProgress = computed(() => {
  if (lendoBooks.value.length === 0) return null
  return lendoBooks.value[0]
})

// Dynamic stats data
const statsData = computed(() => [
  { label: 'Livros lidos', value: lidosBooks.value.length.toString() },
  { label: 'Páginas lidas', value: totalPagesRead.value.toString() },
  { label: 'Meta alcançada', value: `${lidosThisMonth.value}/${monthGoal.value}` },
  { label: 'Resenhas escritas', value: totalReviews.value.toString() }
])

// Completed books this month
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

// Last 5 months bar chart
const barChartData = computed(() => {
  const result = []
  const now = new Date()
  for (let i = 4; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const mNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const mLabel = mNames[d.getMonth()]
    
    const count = lidosBooks.value.filter(b => {
      const updateDate = new Date(b.updatedAt)
      return updateDate.getFullYear() === d.getFullYear() && updateDate.getMonth() === d.getMonth()
    }).length
    
    result.push({
      month: mLabel,
      count,
      highlight: i === 0
    })
  }
  return result
})

const achievements = [
  { name: 'Maratonista', desc: '10 livros em 30d', type: 'award' },
  { name: 'Em chamas', desc: 'Seq. 10+ dias', type: 'fire' },
  { name: 'Crítico', desc: '5 resenhas', type: 'pen' },
  { name: 'Mestre', desc: '50 livros lidos', type: 'trophy' }
]

const fetchStats = async () => {
  loading.value = true
  try {
    const res = await api.get('/shelf')
    const items = res.data || []
    
    lendoBooks.value = []
    lidosBooks.value = []
    let pagesSum = 0
    
    for (const item of items) {
      const dbBook = item.book || {}
      pagesSum += item.pagesRead || 0
      
      let totalPages = 250
      try {
        const gResponse = await googleBooksApi.getVolume(dbBook.id)
        const volumeInfo = gResponse.data.volumeInfo || {}
        totalPages = volumeInfo.pageCount || totalPages
      } catch (gErr) {
        const mock = getMockBookDetails(dbBook.id)
        totalPages = mock.pages || totalPages
      }
      
      const mapped = {
        id: dbBook.id,
        title: dbBook.title || 'Título desconhecido',
        author: dbBook.author || 'Autor desconhecido',
        pagesRead: item.pagesRead || 0,
        totalPages,
        progress: totalPages > 0 ? Math.round(((item.pagesRead || 0) / totalPages) * 100) : 0,
        updatedAt: item.updatedAt
      }
      
      if (item.status === 'Lendo') {
        lendoBooks.value.push(mapped)
      } else if (item.status === 'Lido') {
        lidosBooks.value.push(mapped)
      }
    }
    
    totalPagesRead.value = pagesSum
    
    // Sort lendo by updatedAt desc to show the most recent one
    lendoBooks.value.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    
    // Fetch reviews count
    try {
      const rRes = await api.get('/reviews')
      const allReviews = rRes.data || []
      const currentUserId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : null
      if (currentUserId) {
        totalReviews.value = allReviews.filter((r: any) => r.userId === currentUserId).length
      } else {
        totalReviews.value = allReviews.length
      }
    } catch (rErr) {
      console.error('Error fetching reviews count:', rErr)
    }
    
  } catch (err) {
    console.error('Erro ao buscar estatísticas:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})

const goBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- Title Desktop -->
    <div class="hidden lg:flex items-center justify-between pb-3 border-b border-[#B06E02]/10">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-[#13213C]">Meu Progresso</h1>
        <p class="text-xs text-gray-400 font-semibold">Acompanhe suas estatísticas de leitura</p>
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
    <div class="flex lg:hidden items-center gap-4 py-2 border-b border-[#B06E02]/10 mb-2">
      <button @click="goBack" class="p-1 text-[#13213C] hover:bg-gray-100 rounded-lg transition cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <span class="text-base font-bold text-[#13213C]">Meu Progresso</span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="min-h-[50vh] flex flex-col items-center justify-center space-y-3 bg-white border border-[#B06E02]/10 rounded-2xl p-8">
      <svg class="animate-spin h-8 w-8 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-xs text-gray-400 font-bold uppercase tracking-wider animate-pulse">Carregando estatísticas...</span>
    </div>

    <!-- Main Content -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Left Column -->
      <div class="space-y-6">
        
        <!-- Currently Reading Circle -->
        <div class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs text-center space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Lendo atualmente</h2>
          
          <div v-if="lendoBookProgress" class="relative w-44 h-44 flex items-center justify-center mx-auto">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#E5DED1" stroke-width="7" fill="transparent" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#FCAE1E" 
                stroke-width="7" 
                fill="transparent" 
                stroke-dasharray="251.32" 
                :stroke-dashoffset="251.32 - (251.32 * lendoBookProgress.progress) / 100"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute text-center select-none px-2 w-full">
              <span class="text-3xl font-bold text-[#FCAE1E]">{{ lendoBookProgress.progress }}%</span>
              <span class="block text-xs font-bold text-[#13213C] mt-1.5 truncate">{{ lendoBookProgress.title }}</span>
              <span class="block text-[10px] text-gray-400 font-semibold mt-0.5 truncate">{{ lendoBookProgress.author }}</span>
            </div>
          </div>
          <div v-else class="py-16 text-center select-none">
            <p class="text-sm font-semibold text-gray-400">Nenhum livro lendo atualmente.</p>
          </div>
        </div>

        <!-- Streak Card (placeholder-like but styled) -->
        <div class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <div class="w-10 h-10 bg-[#FFFBEA] rounded-xl flex items-center justify-center text-[#FCAE1E] flex-shrink-0 border border-[#B06E02]/10">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 11h-6V3l-7 10h6v8z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-[#13213C]">Leitor Focado!</h3>
            <p class="text-xs text-gray-400 font-medium">Mantenha seus hábitos de leitura em dia.</p>
          </div>
        </div>

        <!-- Dynamic monthly stats list -->
        <div class="space-y-3">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Este mês</h2>
          
          <!-- Desktop Grid -->
          <div class="hidden lg:grid grid-cols-2 gap-4">
            <div 
              v-for="stat in statsData" 
              :key="stat.label"
              class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs"
            >
              <span class="block text-2xl font-bold text-[#13213C]">{{ stat.value }}</span>
              <span class="text-[11px] text-gray-400 font-semibold block mt-1">{{ stat.label }}</span>
            </div>
          </div>

          <!-- Mobile Carousel -->
          <div class="lg:hidden flex overflow-x-auto gap-3.5 pb-2 scrollbar-none select-none">
            <div 
              v-for="stat in statsData" 
              :key="stat.label + '-mobile'"
              class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl shadow-xs text-center flex-shrink-0 w-[110px]"
            >
              <span class="block text-lg font-bold text-[#13213C]">{{ stat.value }}</span>
              <span class="text-[10px] text-gray-400 font-semibold block mt-1 truncate">{{ stat.label }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        
        <!-- Bar Chart -->
        <div class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Livros concluídos por mês</h2>
          
          <div class="flex items-end justify-around h-44 pt-6 border-b border-[#B06E02]/10 px-2 select-none">
            <div 
              v-for="bar in barChartData" 
              :key="bar.month"
              class="flex flex-col items-center gap-2 h-full justify-end flex-1"
            >
              <span class="text-[11px] font-bold" :class="bar.highlight ? 'text-[#FCAE1E]' : 'text-gray-400'">{{ bar.count }}</span>
              
              <div 
                class="w-full max-w-[28px] rounded-t-md transition-all duration-300"
                :class="bar.highlight ? 'bg-[#FCAE1E]' : 'bg-[#E5DED1]'"
                :style="{ height: bar.count > 0 ? (Math.min(bar.count / 5, 1) * 80 + 20) + '%' : '4%' }"
              ></div>
              <span class="text-[10px] font-bold text-gray-400 mt-1">{{ bar.month }}</span>
            </div>
          </div>
        </div>

        <!-- Dynamic Month Goal -->
        <div class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-3.5">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Meta do mês: {{ monthGoal }} livros</h2>
          
          <div class="hidden lg:flex justify-between items-center text-xs">
            <span class="font-bold text-[#13213C]">{{ lidosThisMonth }} de {{ monthGoal }} livros</span>
            <span class="font-bold text-[#806602]">{{ metaPercent }}%</span>
          </div>
          
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" :style="{ width: metaPercent + '%' }"></div>
          </div>
          
          <p class="hidden lg:block text-[11px] text-gray-400 font-semibold leading-relaxed">
            <span v-if="monthGoal - lidosThisMonth > 0">Faltam {{ monthGoal - lidosThisMonth }} livros para alcançar sua meta — você está no caminho!</span>
            <span v-else>Parabéns! Você atingiu sua meta de leitura para este mês! 🎉</span>
          </p>
          
          <p class="block lg:hidden text-center text-[11px] text-gray-400 font-semibold mt-1.5">
            {{ metaPercent }}% concluído • {{ Math.max(0, monthGoal - lidosThisMonth) }} restantes
          </p>
        </div>

        <!-- Achievements -->
        <div class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Conquistas</h2>
          
          <div class="grid grid-cols-4 gap-2 sm:gap-3">
            <div 
              v-for="item in achievements" 
              :key="item.name"
              class="bg-[#FFFBEA] border border-[#B06E02]/10 p-2 sm:p-3 rounded-xl text-center select-none flex flex-col justify-center items-center gap-1.5 min-w-0"
            >
              <svg v-if="item.type === 'award'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <path d="M17 1.5c0 .8.6 1.4 1.4 1.4-.8 0-1.4.6-1.4 1.4 0-.8-.6-1.4-1.4-1.4.8 0 1.4-.6 1.4-1.4z" />
                <path d="M19.5 4.5c0 .4.3.7.7.7-.4 0-.7.3-.7.7 0-.4-.3-.7-.7-.7.4 0 .7-.3.7-.7z" />
                <path d="M6.5 5.5A1.5 1.5 0 0 1 8 4h6.5A1.5 1.5 0 0 1 16 5.5V14H6.5V5.5z" />
                <path d="M6.5 16h9.5v1.5a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5V16z" />
              </svg>

              <svg v-else-if="item.type === 'fire'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <path d="M10 2C9.5 5.5 6.5 8.5 6.5 12.5C6.5 16.5 9.5 19.5 13.5 19.5C16.5 19.5 17.5 16.5 17.5 13.5C17.5 8.5 12.5 5.5 10 2Z" />
              </svg>

              <svg v-else-if="item.type === 'pen'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <defs>
                  <mask id="critico-mask">
                    <rect width="24" height="24" fill="white" />
                    <path d="M2.5 21.5L21.5 2.5" stroke="black" stroke-width="4.5" stroke-linecap="round" />
                  </mask>
                </defs>
                <path mask="url(#critico-mask)" d="M12 2l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1-4.4-4.3 6.1-.9z" />
                <path d="M5.5 19.5L19.5 5.5l1 1-14 14z" />
                <path d="M5.5 19.5L4 22l2.5-1.5z" />
              </svg>

              <svg v-else-if="item.type === 'trophy'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <path d="M5 4h14v5c0 3-2.5 5.5-5.5 5.8V18H16v2H8v-2h2.5v-3.2C7.5 14.5 5 12 5 9V4z" />
                <path d="M3 6h2v3H3z" />
                <path d="M19 6h2v3H19z" />
              </svg>
              
              <h4 class="text-[10px] font-bold text-[#13213C] truncate leading-tight w-full">{{ item.name }}</h4>
              <p class="text-[8px] text-gray-400 font-semibold truncate w-full">{{ item.desc }}</p>
            </div>
          </div>
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
