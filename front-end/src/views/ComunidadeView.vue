<script setup lang="ts">
import { ref } from 'vue'
import FormularioResenha from '../components/FormularioResenha.vue'

const showReviewModal = ref(false)
const activeTab = ref('todos')

const posts = ref([
  {
    id: 1,
    user: { name: 'Mariana Costa', initials: 'MC', avatarBg: 'bg-indigo-600' },
    book: { title: '1984', author: 'George Orwell' },
    text: 'A leitura de 1984 foi perturbadora, mas absolutamente necessária. A construção do mundo distópico pelo Orwell é assustadoramente realista. Recomendo muito para quem quer refletir sobre controle e sociedade.',
    rating: 5,
    tags: ['Distopia', 'Clássico', 'Recomendado'],
    likes: 32,
    comments: 7,
    isLiked: false,
    time: '2 horas atrás'
  },
  {
    id: 2,
    user: { name: 'Rodrigo Lima', initials: 'RL', avatarBg: 'bg-emerald-600' },
    book: { title: 'O Hobbit', author: 'J.R.R. Tolkien' },
    text: 'Estou relendo O Hobbit com meu filho e a experiência está sendo mágica. A escrita do Tolkien é muito gostosa, leve e cheia de aventuras divertidas. Bilbo Bolseiro é um herói cativante demais.',
    rating: 4,
    tags: ['Fantasia', 'Aventura'],
    likes: 18,
    comments: 3,
    isLiked: true,
    time: '5 horas atrás'
  }
])

const trending = ref([
  { id: 1, tag: '#OHobbit', postsCount: '1.2k posts' },
  { id: 2, tag: '#GeorgeOrwell', postsCount: '870 posts' },
  { id: 3, tag: '#LeituraConjunta', postsCount: '540 posts' },
  { id: 4, tag: '#LiteraturaNacional', postsCount: '310 posts' }
])

const usersToFollow = ref([
  { id: 1, name: 'Gabriela Dias', initials: 'GD', avatarBg: 'bg-purple-600', following: false },
  { id: 2, name: 'Mateus Souza', initials: 'MS', avatarBg: 'bg-rose-600', following: false },
  { id: 3, name: 'Camila Alves', initials: 'CA', avatarBg: 'bg-amber-600', following: true }
])

const toggleFollow = (userId: number) => {
  const index = usersToFollow.value.findIndex(u => u.id === userId)
  if (index !== -1) {
    usersToFollow.value[index].following = !usersToFollow.value[index].following
  }
}

const toggleLike = (postId: number) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isLiked = !post.isLiked
    post.likes = post.isLiked ? post.likes + 1 : post.likes - 1
  }
}

const openModal = () => {
  showReviewModal.value = true
}

const closeModal = () => {
  showReviewModal.value = false
}

const handleReviewSubmit = (data: { rating: number; text: string; tags: string[] }) => {
  posts.value.unshift({
    id: Date.now(),
    user: { name: 'Anderson Ramalho', initials: 'AR', avatarBg: 'bg-[#B06E02]' },
    book: { title: 'O Hobbit', author: 'J.R.R. Tolkien' }, // Mock book reference
    text: data.text,
    rating: data.rating,
    tags: data.tags,
    likes: 0,
    comments: 0,
    isLiked: false,
    time: 'Agora mesmo'
  })
  closeModal()
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C] relative">
    
    <!-- Title -->
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl md:text-3xl font-bold text-[#806602]">Comunidade</h1>
      <p class="text-sm text-gray-400 font-medium">Compartilhe suas leituras, resenhas e debata com outros leitores.</p>
    </div>

    <!-- Layout Grid split: Main Feed and Right Sidebar (Desktop) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Center: Social Feed -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Share Post Input Card Trigger -->
        <div class="bg-white p-5 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.02)] flex items-center gap-4">
          <!-- User Profile Avatar -->
          <div class="w-10 h-10 rounded-full bg-[#B06E02] flex items-center justify-center font-bold text-white text-xs select-none flex-shrink-0 uppercase">
            AR
          </div>
          <!-- Clickable text bar -->
          <div 
            @click="openModal"
            class="flex-1 bg-gray-50 hover:bg-gray-100/80 border border-gray-100 rounded-xl px-4 py-3 text-xs md:text-sm text-gray-400 font-medium cursor-pointer transition select-none flex items-center"
          >
            O que você está lendo hoje? Compartilhe uma resenha...
          </div>
          <button 
            type="button" 
            @click="openModal"
            class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-semibold text-xs px-4 py-3 rounded-xl transition cursor-pointer"
          >
            Escrever Resenha
          </button>
        </div>

        <!-- Feed abas filters -->
        <div class="flex border-b border-[#B06E02]/10 gap-6 text-sm">
          <button 
            @click="activeTab = 'todos'" 
            class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer text-xs uppercase tracking-wider"
            :class="[activeTab === 'todos' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
          >
            Todos
          </button>
          <button 
            @click="activeTab = 'seguindo'" 
            class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer text-xs uppercase tracking-wider"
            :class="[activeTab === 'seguindo' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
          >
            Seguindo
          </button>
          <button 
            @click="activeTab = 'resenhas'" 
            class="pb-3 border-b-2 font-bold transition duration-150 cursor-pointer text-xs uppercase tracking-wider"
            :class="[activeTab === 'resenhas' ? 'border-[#B06E02] text-[#B06E02]' : 'border-transparent text-gray-400']"
          >
            Resenhas
          </button>
        </div>

        <!-- Feed List of Posts -->
        <div class="space-y-4">
          <div 
            v-for="post in posts" 
            :key="post.id"
            class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] space-y-4"
          >
            <!-- Post Header (Author info) -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <!-- Avatar -->
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs select-none uppercase"
                  :class="post.user.avatarBg"
                >
                  {{ post.user.initials }}
                </div>
                <div>
                  <h3 class="text-xs font-bold text-[#13213C]">{{ post.user.name }}</h3>
                  <span class="text-[9px] text-gray-400 font-semibold block mt-0.5">escreveu uma resenha sobre <strong class="text-[#806602]">{{ post.book.title }}</strong> • {{ post.time }}</span>
                </div>
              </div>

              <!-- rating stars display -->
              <div class="flex items-center gap-0.5 text-amber-500">
                <svg 
                  v-for="star in 5" 
                  :key="star"
                  class="w-3.5 h-3.5"
                  :class="[post.rating >= star ? 'fill-current' : 'text-gray-200 fill-current']"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>

            <!-- Post Content text -->
            <p class="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              {{ post.text }}
            </p>

            <!-- Tags List -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="bg-[#FFF8D6] text-[#806602] text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-[#B06E02]/10"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Divider line -->
            <div class="h-px bg-gray-100"></div>

            <!-- Post Action Buttons (Like & Comment) -->
            <div class="flex items-center gap-6 text-xs select-none">
              <!-- Like Action button -->
              <button 
                type="button" 
                @click="toggleLike(post.id)"
                class="flex items-center gap-1.5 text-gray-400 hover:text-red-500 font-bold transition focus:outline-none cursor-pointer"
                :class="[post.isLiked ? 'text-red-500' : '']"
              >
                <!-- Heart Icon -->
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{{ post.likes }}</span>
              </button>

              <!-- Comment Action button -->
              <button 
                type="button" 
                class="flex items-center gap-1.5 text-gray-400 hover:text-[#13213C] font-bold transition focus:outline-none cursor-pointer"
              >
                <!-- Bubble Comment Icon -->
                <svg class="w-4 h-4 fill-none stroke-currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{{ post.comments }}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <!-- Right column: Trending & Follow Suggestions (Desktop Only) -->
      <div class="hidden lg:block space-y-6">
        
        <!-- Trending hashtags card -->
        <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Em alta</h2>
          
          <div class="space-y-4">
            <div 
              v-for="item in trending" 
              :key="item.id"
              class="flex flex-col gap-0.5"
            >
              <span class="text-xs font-bold text-[#13213C] hover:text-[#B06E02] transition cursor-pointer">
                {{ item.tag }}
              </span>
              <span class="text-[9px] text-gray-400 font-semibold leading-none">{{ item.postsCount }}</span>
            </div>
          </div>
        </div>

        <!-- Follow Suggestions card -->
        <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.02)] space-y-4">
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Pessoas para seguir</h2>
          
          <div class="space-y-4.5">
            <div 
              v-for="userToFollow in usersToFollow" 
              :key="userToFollow.id"
              class="flex items-center justify-between gap-3"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-[10px] select-none uppercase flex-shrink-0"
                  :class="userToFollow.avatarBg"
                >
                  {{ userToFollow.initials }}
                </div>
                <span class="text-xs font-bold text-[#13213C] truncate">{{ userToFollow.name }}</span>
              </div>
              
              <button 
                type="button" 
                @click="toggleFollow(userToFollow.id)"
                class="border font-bold text-[9px] px-3 py-1.5 rounded-full transition cursor-pointer leading-none"
                :class="[userToFollow.following 
                  ? 'bg-gray-100 text-gray-400 border-transparent hover:bg-gray-200' 
                  : 'bg-transparent text-[#B06E02] border-[#B06E02]/30 hover:bg-[#FFF8D6]/30 hover:border-[#B06E02]'
                ]"
              >
                {{ userToFollow.following ? 'Seguindo' : 'Seguir' }}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>

    <!-- Review Form Modal Wrap -->
    <div 
      v-if="showReviewModal" 
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <!-- Translucent Backdrop -->
      <div 
        @click="closeModal" 
        class="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Modal Form Box -->
      <FormularioResenha 
        class="relative z-10 w-full animate-zoom-in"
        @close="closeModal"
        @submit="handleReviewSubmit"
      />
    </div>

  </div>
</template>

<style>
/* Simple pop zoom entry animation for the modal dialog */
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-zoom-in {
  animation: zoomIn 0.2s ease-out forwards;
}
</style>
