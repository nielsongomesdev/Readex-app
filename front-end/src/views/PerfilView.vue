<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../services/api'
import { googleBooksApi } from '../services/googleBooks'
import { getMockBookDetails } from '../services/mockBooks'
import { name, handle, bio, avatarUrl } from '../store/userStore'

const router = useRouter()
const loading = ref(true)
const activeTab = ref('lendo')

const lendoBooks = ref<any[]>([])
const lidosBooks = ref<any[]>([])
const userReviews = ref<any[]>([])
const followersCount = ref(0)
const followingCount = ref(0)
const activities = ref<any[]>([])

const fetchProfileData = async () => {
  loading.value = true
  try {
    // 1. Fetch Shelf
    const shelfRes = await api.get('/shelf')
    const shelfItems = shelfRes.data || []
    
    lendoBooks.value = []
    lidosBooks.value = []
    const actList: any[] = []
    
    for (const item of shelfItems) {
      const dbBook = item.book || {}
      
      let bookCover = dbBook.coverUrl || ''
      try {
        const gResponse = await googleBooksApi.getVolume(dbBook.id)
        const volumeInfo = gResponse.data.volumeInfo || {}
        if (!bookCover && volumeInfo.imageLinks?.thumbnail) {
          bookCover = volumeInfo.imageLinks.thumbnail
        }
      } catch (gErr) {
        const mock = getMockBookDetails(dbBook.id)
        if (!bookCover && mock.cover) {
          bookCover = mock.cover
        }
      }
      
      const mapped = {
        title: dbBook.title || 'Título desconhecido',
        author: dbBook.author || 'Autor desconhecido',
        cover: bookCover,
        id: dbBook.id,
        updatedAt: item.updatedAt
      }
      
      if (item.status === 'Lendo') {
        lendoBooks.value.push(mapped)
        actList.push({
          id: `shelf-lendo-${dbBook.id}`,
          action: 'Começou a ler',
          target: mapped.title,
          meta: '',
          time: new Date(item.updatedAt),
          timeStr: formatTimeAgo(new Date(item.updatedAt))
        })
      } else if (item.status === 'Lido') {
        lidosBooks.value.push(mapped)
        actList.push({
          id: `shelf-lido-${dbBook.id}`,
          action: 'Concluiu',
          target: mapped.title,
          meta: '',
          time: new Date(item.updatedAt),
          timeStr: formatTimeAgo(new Date(item.updatedAt))
        })
      }
    }
    
    // 2. Fetch Reviews
    const reviewsRes = await api.get('/reviews')
    const allReviews = reviewsRes.data || []
    const currentUserId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}').id : null
    
    userReviews.value = []
    for (const review of allReviews) {
      if (review.userId === currentUserId) {
        const dbBook = review.book || {}
        let bookCover = dbBook.coverUrl || ''
        try {
          const gResponse = await googleBooksApi.getVolume(dbBook.id)
          const volumeInfo = gResponse.data.volumeInfo || {}
          if (!bookCover && volumeInfo.imageLinks?.thumbnail) {
            bookCover = volumeInfo.imageLinks.thumbnail
          }
        } catch (gErr) {
          const mock = getMockBookDetails(dbBook.id)
          if (!bookCover && mock.cover) {
            bookCover = mock.cover
          }
        }
        
        userReviews.value.push({
          title: dbBook.title || 'Título desconhecido',
          author: dbBook.author || 'Autor desconhecido',
          cover: bookCover,
          rating: review.rating,
          text: review.comment || 'Sem comentários.'
        })
        
        actList.push({
          id: `review-${review.id}`,
          action: 'Avaliou',
          target: dbBook.title || 'Livro',
          meta: `com ⭐ ${review.rating}`,
          time: new Date(review.createdAt),
          timeStr: formatTimeAgo(new Date(review.createdAt))
        })
      }
    }
    
    // Sort activities by time desc and take top 5
    actList.sort((a, b) => b.time.getTime() - a.time.getTime())
    activities.value = actList.slice(0, 5)
    
    // 3. Fetch Follows
    try {
      const followersRes = await api.get('/followers')
      followersCount.value = (followersRes.data || []).length
    } catch (fErr) {
      console.log('Error fetching followers:', fErr)
    }
    
    try {
      const followingRes = await api.get('/following')
      followingCount.value = (followingRes.data || []).length
    } catch (fErr) {
      console.log('Error fetching following:', fErr)
    }
    
  } catch (err) {
    console.error('Error fetching profile data:', err)
  } finally {
    loading.value = false
  }
}

const formatTimeAgo = (date: Date) => {
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 60) {
    return `há ${Math.max(1, diffMins)} min`
  } else if (diffHours < 24) {
    return `há ${diffHours}h`
  } else {
    return `há ${diffDays} dias`
  }
}

const editProfile = () => {
  router.push('/configuracoes?edit=true')
}

onMounted(() => {
  fetchProfileData()
})
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6">

    <!-- Profile Header Card -->
    <div class="bg-[#13213C] text-white -mx-6 -mt-6 md:-mx-8 md:-mt-8 p-6 lg:mx-0 lg:mt-0 lg:rounded-2xl lg:p-8 flex flex-col lg:flex-row lg:justify-between lg:items-center relative gap-6 shadow-xs">
      
      <!-- Settings Mobile Shortcut -->
      <button @click="router.push('/configuracoes')" class="absolute top-4 right-4 text-[#FCAE1E] hover:text-[#FCAE1E]/80 transition-colors cursor-pointer lg:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <!-- Avatar & Basic Info -->
      <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 flex-1 min-w-0">
        <img :src="avatarUrl" alt="Avatar" class="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-white/20 object-cover shadow-sm flex-shrink-0" />
        <div class="min-w-0 flex-1 space-y-1">
          <h2 class="text-xl lg:text-2xl font-bold text-[#FCAE1E] leading-tight truncate">{{ name }}</h2>
          <span class="text-xs text-gray-300 font-semibold block leading-none">{{ handle }}</span>
          <p class="hidden sm:block text-xs lg:text-sm text-gray-300 font-medium leading-relaxed mt-2 max-w-lg">
            {{ bio || 'Nenhuma biografia fornecida ainda.' }}
          </p>
        </div>
      </div>

      <!-- Actions & Followers/Following counts -->
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
            <span class="block text-2xl font-bold text-white leading-none">{{ lidosBooks.length }}</span>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">Lidos</span>
          </div>
          <div class="text-center">
            <span class="block text-2xl font-bold text-white leading-none">{{ followingCount }}</span>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">Seguindo</span>
          </div>
          <div class="text-center">
            <span class="block text-2xl font-bold text-white leading-none">{{ followersCount }}</span>
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">Seguidores</span>
          </div>
        </div>

      </div>

      <!-- Mobile navigation tabs -->
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

    <!-- Desktop Navigation tabs -->
    <div class="hidden lg:flex items-center gap-3 mt-6">
      <button 
        @click="activeTab = 'lendo'"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition cursor-pointer select-none"
        :class="activeTab === 'lendo' ? 'bg-[#13213C] text-white border-[#13213C]' : 'bg-white text-[#13213C] border-[#B06E02]/10 hover:bg-gray-50'"
      >
        <span>Lendo</span>
        <span class="px-2 py-0.5 text-xs rounded-full" :class="activeTab === 'lendo' ? 'bg-white/20 text-white' : 'bg-[#E5ECF6] text-[#13213C]'">{{ lendoBooks.length }}</span>
      </button>
      
      <button 
        @click="activeTab = 'lidos'"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition cursor-pointer select-none"
        :class="activeTab === 'lidos' ? 'bg-[#13213C] text-white border-[#13213C]' : 'bg-white text-[#13213C] border-[#B06E02]/10 hover:bg-gray-50'"
      >
        <span>Lidos</span>
        <span class="px-2 py-0.5 text-xs rounded-full" :class="activeTab === 'lidos' ? 'bg-white/20 text-white' : 'bg-[#E5ECF6] text-[#13213C]'">{{ lidosBooks.length }}</span>
      </button>

      <button 
        @click="activeTab = 'resenhas'"
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition cursor-pointer select-none"
        :class="activeTab === 'resenhas' ? 'bg-[#13213C] text-white border-[#13213C]' : 'bg-white text-[#13213C] border-[#B06E02]/10 hover:bg-gray-50'"
      >
        <span>Resenhas</span>
        <span class="px-2 py-0.5 text-xs rounded-full" :class="activeTab === 'resenhas' ? 'bg-white/20 text-white' : 'bg-[#E5ECF6] text-[#13213C]'">{{ userReviews.length }}</span>
      </button>
    </div>

    <!-- Loading screen -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16 space-y-3 bg-white border border-[#B06E02]/10 rounded-2xl mt-6 shadow-xs">
      <svg class="animate-spin h-7 w-7 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="text-xs text-gray-400 font-bold uppercase tracking-wider animate-pulse">Carregando dados...</span>
    </div>

    <template v-else>
      <!-- Books tab content -->
      <div v-if="activeTab === 'lendo' || activeTab === 'lidos'" class="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-6 mt-6">
        <router-link 
          v-for="book in (activeTab === 'lendo' ? lendoBooks : lidosBooks)" 
          :key="book.title" 
          :to="'/livro/' + book.id"
          class="flex flex-col min-w-0 cursor-pointer"
        >
          <img v-if="book.cover" :src="book.cover" :alt="book.title" class="w-full aspect-[2/3] object-cover rounded-lg shadow-xs border border-gray-100 hover:scale-102 transition duration-200" />
          <div v-else class="w-full aspect-[2/3] bg-[#E5ECF6] rounded-lg flex items-center justify-center text-center p-1 border border-gray-200 hover:scale-102 transition duration-200">
            <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide">Sem capa</span>
          </div>
          <h4 class="text-sm font-bold text-[#13213C] truncate mt-2 leading-tight">{{ book.title }}</h4>
          <p class="text-[11px] text-gray-400 font-semibold truncate leading-none mt-0.5">{{ book.author }}</p>
        </router-link>
        <div v-if="(activeTab === 'lendo' ? lendoBooks.length : lidosBooks.length) === 0" class="col-span-full py-16 text-center select-none text-gray-400 text-sm font-medium">
          Nenhum livro cadastrado nesta categoria.
        </div>
      </div>

      <!-- Reviews tab content -->
      <div v-if="activeTab === 'resenhas'" class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div 
          v-for="review in userReviews" 
          :key="review.title" 
          class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs space-y-3 flex flex-col justify-between"
        >
          <div class="flex gap-4">
            <img v-if="review.cover" :src="review.cover" :alt="review.title" class="w-12 h-18 object-cover rounded-lg flex-shrink-0 border border-gray-100" />
            <div v-else class="w-12 h-18 bg-[#E5ECF6] rounded-lg flex-shrink-0 flex items-center justify-center text-center p-1 border border-gray-200">
              <span class="text-[8px] text-gray-400 font-bold uppercase tracking-wide">Sem capa</span>
            </div>
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
        <div v-if="userReviews.length === 0" class="col-span-full py-16 text-center select-none text-gray-400 text-sm font-medium">
          Você ainda não publicou nenhuma resenha.
        </div>
      </div>

      <!-- Activity Section -->
      <div class="hidden lg:block space-y-4 mt-8">
        <h3 class="text-lg font-bold text-[#B06E02]">Atividade recente</h3>
        <div class="space-y-3">
          <div 
            v-for="act in activities" 
            :key="act.id" 
            class="bg-white border border-[#B06E02]/5 p-4 rounded-2xl shadow-xs flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3">
              <img :src="avatarUrl" alt="Avatar" class="w-8 h-8 rounded-full object-cover" />
              <p class="text-sm font-semibold text-[#13213C]">
                <span class="text-gray-400">{{ act.action }} </span>
                <span class="font-bold">{{ act.target }}</span>
                <span v-if="act.meta" class="text-gray-400"> {{ act.meta }}</span>
              </p>
            </div>
            <span class="text-xs text-gray-400 font-semibold whitespace-nowrap">{{ act.timeStr }}</span>
          </div>
          <div v-if="activities.length === 0" class="py-8 text-center text-gray-400 text-sm font-medium">
            Nenhuma atividade registrada ainda.
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>
</style>
