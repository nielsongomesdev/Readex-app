<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('Todos')
const tabs = ['Todos', 'Seguindo', 'Resenhas', 'Discussões']

const posts = ref([
  {
    id: 1,
    user: { name: 'Alexandre Cabral', time: 'Há 2h' },
    text: 'Acabei de terminar Duna e não consigo parar de pensar nisso. A construção do mundo é simplesmente incrível!',
    book: 'Duna — Frank Herbert',
    likes: 132,
    comments: 47,
    isLiked: false
  },
  {
    id: 2,
    user: { name: 'Jussandro Vítor', time: 'Há 5h' },
    text: 'Alguém mais acha que 1984 é mais relevante hoje do que quando foi escrito? Relendo pela terceira vez...',
    book: '1984 — George Orwell',
    likes: 24,
    comments: 7,
    isLiked: false
  },
  {
    id: 3,
    user: { name: 'Ryan Guedes', time: 'Há 8h' },
    text: '“Ler é voar sem sair do lugar.” - minha citação favorita de O Alquimista.',
    book: 'O Alquimista – Paulo Coelho',
    likes: 58,
    comments: 12,
    isLiked: false
  }
])

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

const toggleLike = (postId: number) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes = post.isLiked ? post.likes + 1 : post.likes - 1
  }
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
        <div class="flex flex-col gap-1">
          <h1 class="text-3xl font-bold text-[#13213C]">Comunidade</h1>
          <p class="text-xs text-gray-400 font-semibold">Veja o que outros leitores estão compartilhando</p>
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

      <!-- Filters (Tab pills row) -->
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

      <!-- Main Columns Grid -->
      <div class="grid grid-cols-3 gap-8">
        
        <!-- Left: Feed Column -->
        <div class="col-span-2 space-y-6">
          <div 
            v-for="post in posts" 
            :key="post.id"
            class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs space-y-4 hover:shadow-[0_4px_16px_rgba(176,110,2,0.02)] transition"
          >
            <!-- Header (User Info) -->
            <div class="flex items-center gap-3">
              <!-- Avatar circle placeholder -->
              <div class="w-10 h-10 rounded-full bg-[#13213C] flex-shrink-0"></div>
              <div>
                <h3 class="text-sm font-bold text-[#13213C]">{{ post.user.name }}</h3>
                <span class="text-[10px] text-gray-400 font-semibold block mt-0.5">{{ post.user.time }}</span>
              </div>
            </div>

            <!-- Body text -->
            <p class="text-xs lg:text-sm text-gray-400/90 font-medium leading-relaxed">
              {{ post.text }}
            </p>

            <!-- Book reference link -->
            <span class="block text-xs font-bold text-[#B06E02]">{{ post.book }}</span>

            <!-- Divider -->
            <div class="h-px bg-[#B06E02]/10 my-3"></div>

            <!-- Actions footer -->
            <div class="flex items-center gap-6 text-xs text-gray-400 font-bold select-none">
              <!-- Like button -->
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

              <!-- Comment button -->
              <button 
                class="flex items-center gap-1.5 transition cursor-pointer hover:text-[#FCAE1E]"
              >
                <svg class="w-4 h-4 fill-none stroke-currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{{ post.comments }}</span>
              </button>

              <!-- Share button -->
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
        </div>

        <!-- Right Sidebar widgets -->
        <div class="col-span-1 space-y-6">
          
          <!-- Em alta -->
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

          <!-- Pessoas para seguir -->
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

    <!-- ===================================================================== -->
    <!-- ========================== MOBILE LAYOUT ============================ -->
    <!-- ===================================================================== -->
    <div class="lg:hidden flex flex-col space-y-4">
      
      <!-- 1. Sticky Mobile Top Header Bar (Uses negative margins to go edge-to-edge inside main padding) -->
      <div class="sticky top-0 z-40 bg-[#FFFDF3] px-6 py-4 border-b border-[#B06E02]/10 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 flex items-center select-none shadow-xs">
        <span class="text-xl font-bold text-[#13213C]">Comunidade</span>
      </div>

      <!-- 2. Filters horizontal scrolling bar -->
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

      <!-- 3. Stacking feed posts -->
      <div class="space-y-4 pb-6">
        <div 
          v-for="post in posts" 
          :key="post.id + '-mobile'"
          class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-3 relative"
        >
          <!-- Header (User avatar & details) -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#13213C] flex-shrink-0"></div>
            <div>
              <h3 class="text-xs font-bold text-[#13213C] leading-snug">{{ post.user.name }}</h3>
              <span class="text-[9px] text-gray-400 font-semibold block mt-0.5">{{ post.user.time }}</span>
            </div>
          </div>

          <!-- Body text -->
          <p class="text-xs text-gray-400/90 font-medium leading-relaxed">
            {{ post.text }}
          </p>

          <!-- Book reference -->
          <span class="block text-[11px] font-bold text-[#B06E02] mt-1">{{ post.book }}</span>

          <!-- Footer actions (Aligned to bottom-right) -->
          <div class="flex justify-end items-center gap-4 text-xs select-none mt-2.5 pt-1">
            <!-- Like button -->
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

            <!-- Comment button -->
            <button 
              class="flex items-center gap-1.5 text-gray-400 hover:text-[#FCAE1E] font-bold transition cursor-pointer"
            >
              <svg class="w-4 h-4 fill-none stroke-currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{{ post.comments }}</span>
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
