<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../services/api'
import { userId as currentUserId } from '../store/userStore'

const activeTab = ref('Todos')
const tabs = ['Todos', 'Seguindo', 'Resenhas', 'Discussões']
const loading = ref(false)

const posts = ref<any[]>([])

const fetchReviews = async () => {
  loading.value = true
  try {
    const res = await api.get('/reviews')
    const reviews = res.data || []
    
    posts.value = reviews.map((rev: any) => {
      const isLiked = rev.likes ? rev.likes.some((like: any) => like.userId === currentUserId.value) : false
      const timeFormatted = new Date(rev.createdAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
      
      return {
        id: rev.id,
        user: { name: rev.user?.name || 'Leitor anônimo', time: timeFormatted },
        text: rev.comment || 'Nenhum comentário.',
        book: `${rev.book?.title || 'Livro Desconhecido'} — ${rev.book?.author || 'Autor Desconhecido'}`,
        likes: rev.likes ? rev.likes.length : 0,
        comments: 0,
        isLiked: isLiked
      }
    })
  } catch (err) {
    console.error('Erro ao carregar avaliações:', err)
  } finally {
    loading.value = false
  }
}

const trending = ref([
  { tag: '#Duna', postsCount: '234' },
  { tag: '#Distopia', postsCount: '127' },
  { tag: '#PauloCoelho', postsCount: '89' },
  { tag: '#FicçãoCientífica', postsCount: '67' }
])

const usersToFollow = ref([
  { id: 1, name: 'Maria Silva', desc: 'Crítica literária', following: false },
  { id: 2, name: 'João Pedro', desc: 'Apaixonado por fantasia', following: false },
  { id: 3, name: 'Ana Costa', desc: 'Resenha 100 livros/ano', following: false }
])

const toggleFollow = (userId: number) => {
  const user = usersToFollow.value.find(u => u.id === userId)
  if (user) {
    user.following = !user.following
  }
}

const toggleLike = async (postId: string) => {
  const post = posts.value.find(p => p.id === postId)
  if (!post) return

  const originallyLiked = post.isLiked
  post.isLiked = !post.isLiked
  post.likes = post.isLiked ? post.likes + 1 : post.likes - 1

  try {
    const res = await api.post(`/reviews/${postId}/like`)
    post.isLiked = res.data.liked
  } catch (err) {
    console.error('Erro ao curtir resenha:', err)
    post.isLiked = originallyLiked
    post.likes = post.isLiked ? post.likes + 1 : post.likes - 1
  }
}

onMounted(() => {
  fetchReviews()
})
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6">

    
    
    
    <div class="hidden lg:block space-y-6">
      
      
      <div class="flex items-center justify-between pb-3 border-b border-[#B06E02]/10 mb-6">
        <div class="flex flex-col gap-1">
          <h1 class="text-3xl font-bold text-[#13213C]">Comunidade</h1>
          <p class="text-xs text-gray-400 font-semibold">Veja o que outros leitores estão compartilhando</p>
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

      
      <div class="flex flex-wrap gap-2.5 mb-6">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          @click="activeTab = tab"
          class="text-xs font-bold px-4 py-2.5 rounded-full transition cursor-pointer"
          :class="activeTab === tab ? 'bg-[#13213C] text-white' : 'bg-[#E5ECF6] text-[#13213C] hover:bg-[#E5ECF6]/85'"
        >
          {{ tab }}
        </button>
      </div>

      
      <div class="grid grid-cols-3 gap-8">
        
        
        <div class="col-span-2 space-y-6">
          <!-- Loading State -->
          <div v-if="loading" class="min-h-[40vh] flex flex-col items-center justify-center space-y-3 bg-white border border-[#B06E02]/10 rounded-2xl p-8 shadow-xs">
            <svg class="animate-spin h-8 w-8 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs text-gray-400 font-bold uppercase tracking-wider animate-pulse">Carregando feed de resenhas...</span>
          </div>

          <template v-else>
            <!-- Empty state for community reviews -->
            <div v-if="posts.length === 0" class="text-center py-12 text-gray-400 text-sm font-semibold border-2 border-dashed border-[#B06E02]/15 rounded-2xl bg-[#FFFBEA]/30">
              Nenhuma resenha foi publicada na comunidade ainda.
            </div>
            
            <div 
              v-else
              v-for="post in posts" 
              :key="post.id"
              class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs space-y-4 hover:shadow-[0_4px_16px_rgba(176,110,2,0.02)] transition"
            >
              
              <div class="flex items-center gap-3">
                
                <div class="w-10 h-10 rounded-full bg-[#13213C] flex items-center justify-center font-bold text-white shadow-sm uppercase">
                  {{ post.user.name.charAt(0) }}
                </div>
                <div>
                  <h3 class="text-sm font-bold text-[#13213C]">{{ post.user.name }}</h3>
                  <span class="text-[10px] text-gray-400 font-semibold block mt-0.5">{{ post.user.time }}</span>
                </div>
              </div>

              
              <p class="text-xs lg:text-sm text-gray-400/90 font-medium leading-relaxed">
                {{ post.text }}
              </p>

              
              <span class="block text-xs font-bold text-[#B06E02]">{{ post.book }}</span>

              
              <div class="h-px bg-[#B06E02]/10 my-3"></div>

              
              <div class="flex items-center gap-6 text-xs text-gray-400 font-bold select-none">
                
                <button 
                  @click="toggleLike(post.id)"
                  class="flex items-center gap-1.5 transition cursor-pointer focus:outline-none"
                  :class="post.isLiked ? 'text-[#E04B6E]' : 'hover:text-[#E04B6E]'"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{{ post.likes }}</span>
                </button>

                
                <button 
                  class="flex items-center gap-1.5 transition cursor-pointer hover:text-[#FCAE1E]"
                >
                  <svg class="w-4 h-4 fill-none stroke-currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{{ post.comments }}</span>
                </button>

                
                <button 
                  class="flex items-center gap-1.5 transition cursor-pointer hover:text-[#B06E02]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l1.99 1.99a3 3 0 004.243 0l1.99-1.99a3 3 0 000-4.243l-1.99-1.99a3 3 0 00-4.243 0l-1.99 1.99a3 3 0 000 4.243z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21V12" />
                  </svg>
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          </template>
        </div>

        
        <div class="col-span-1 space-y-6">
          
          
          <div class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-4">
            <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Em alta</h2>
            
            <div class="space-y-4">
              <div 
                v-for="item in trending" 
                :key="item.tag"
                class="flex flex-col gap-0.5"
              >
                <span class="text-xs font-bold text-[#13213C] hover:text-[#B06E02] transition cursor-pointer">
                  {{ item.tag }}
                </span>
                <span class="text-[9px] text-gray-400 font-semibold leading-none">{{ item.postsCount }} posts</span>
              </div>
            </div>
          </div>

          
          <div class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-4">
            <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Pessoas para seguir</h2>
            
            <div class="space-y-4.5">
              <div 
                v-for="user in usersToFollow" 
                :key="user.id"
                class="flex items-center justify-between gap-3"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <div class="w-8 h-8 rounded-full bg-[#13213C] flex-shrink-0"></div>
                  <div class="min-w-0">
                    <span class="block text-xs font-bold text-[#13213C] truncate leading-tight">{{ user.name }}</span>
                    <span class="text-[9px] text-gray-400 font-semibold block truncate mt-0.5 leading-none">{{ user.desc }}</span>
                  </div>
                </div>
                
                <button 
                  @click="toggleFollow(user.id)"
                  class="bg-[#13213C] text-white hover:bg-[#13213C]/95 font-bold text-[9px] px-3.5 py-1.5 rounded-lg transition cursor-pointer select-none leading-none"
                  :class="user.following ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' : ''"
                >
                  {{ user.following ? 'Seguindo' : 'Seguir' }}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    
    
    
    <div class="lg:hidden flex flex-col space-y-4">
      
      
      <div class="sticky top-0 z-40 bg-[#FFFDF3] px-6 py-4 border-b border-[#B06E02]/10 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 flex items-center select-none shadow-xs">
        <span class="text-xl font-bold text-[#13213C]">Comunidade</span>
      </div>

      
      <div class="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none select-none mb-1 max-w-full">
        <button 
          v-for="tab in tabs" 
          :key="tab + '-mobile'"
          @click="activeTab = tab"
          class="text-xs font-bold px-4 py-2.5 rounded-full transition cursor-pointer flex-shrink-0"
          :class="activeTab === tab ? 'bg-[#13213C] text-white' : 'bg-[#E5ECF6] text-[#13213C]'"
        >
          {{ tab }}
        </button>
      </div>

      
      <div class="space-y-4 pb-6">
        <!-- Loading State Mobile -->
        <div v-if="loading" class="space-y-4 py-8 flex flex-col items-center justify-center bg-white border border-[#B06E02]/10 rounded-2xl shadow-xs">
          <svg class="animate-spin h-6 w-6 text-[#E09A1C]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Carregando resenhas...</span>
        </div>

        <template v-else>
          <!-- Empty State Mobile -->
          <div v-if="posts.length === 0" class="text-center py-8 text-gray-400 text-xs font-semibold border-2 border-dashed border-[#B06E02]/15 rounded-2xl bg-[#FFFBEA]/30">
            Nenhuma resenha foi publicada na comunidade ainda.
          </div>
          
          <div 
            v-else
            v-for="post in posts" 
            :key="post.id + '-mobile'"
            class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-3 relative"
          >
            <!-- Header do Post -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#13213C] flex items-center justify-center font-bold text-white shadow-sm uppercase">
                {{ post.user.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-xs font-bold text-[#13213C] leading-snug">{{ post.user.name }}</h3>
                <span class="text-[9px] text-gray-400 font-semibold block mt-0.5">{{ post.user.time }}</span>
              </div>
            </div>

            <!-- Texto da Resenha -->
            <p class="text-xs text-gray-400/90 font-medium leading-relaxed">
              {{ post.text }}
            </p>

            <!-- Livro Resenhado -->
            <span class="block text-[11px] font-bold text-[#B06E02] mt-1">{{ post.book }}</span>

            <!-- Ações -->
            <div class="flex justify-end items-center gap-4 text-xs select-none mt-2.5 pt-1">
              <!-- Curtir -->
              <button 
                @click="toggleLike(post.id)"
                class="flex items-center gap-1.5 font-bold transition cursor-pointer focus:outline-none"
                :class="post.isLiked ? 'text-[#E04B6E]' : 'text-gray-400 hover:text-[#E04B6E]'"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{{ post.likes }}</span>
              </button>

              <!-- Comentários -->
              <button class="flex items-center gap-1.5 text-gray-400 hover:text-[#FCAE1E] font-bold transition cursor-pointer">
                <svg class="w-4 h-4 fill-none stroke-currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{{ post.comments }}</span>
              </button>
            </div>
          </div>
        </template>
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
