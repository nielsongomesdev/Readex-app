<script setup lang="ts">
const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const navLinks = [
  { name: 'Início', path: '/app/home', icon: 'home' },
  { name: 'Minha Estante', path: '/app/bookshelf', icon: 'bookshelf' },
  { name: 'Explorar', path: '/app/explore', icon: 'explore' },
  { name: 'Comunidade', path: '/app/community', icon: 'community' },
  { name: 'Progresso', path: '/app/progress', icon: 'progress' },
  { name: 'Perfil', path: '/app/profile', icon: 'profile' },
  { name: 'Configurações', path: '/app/settings', icon: 'settings' }
]

const handleLinkClick = () => {
  if (props.isMobile) {
    emit('close')
  }
}
</script>

<template>
  <aside 
    class="h-screen bg-[#13213C] text-white flex flex-col justify-between select-none"
    :class="[isMobile ? 'w-64 shadow-2xl' : 'w-64 fixed left-0 top-0 border-r border-[#B06E02]/10']"
  >
    <!-- Top Brand & Close Action (Mobile) -->
    <div>
      <div class="h-16 px-6 flex items-center justify-between border-b border-white/5">
        <!-- Brand Logo Badge -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
            <img 
              src="../../assets/images/mascote-3.png" 
              alt="Mascote Readex lendo" 
              class="w-full h-full object-contain"
            />
          </div>
          <span class="text-lg font-bold text-[#FFF5CD] tracking-wide">Readex</span>
        </div>

        <!-- Close Button (Mobile Only) -->
        <button 
          v-if="isMobile" 
          @click="emit('close')" 
          type="button" 
          class="text-gray-400 hover:text-white focus:outline-none p-1.5 hover:bg-white/5 rounded-lg transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="mt-6 px-4 space-y-1">
        <router-link 
          v-for="link in navLinks" 
          :key="link.name" 
          :to="link.path"
          @click="handleLinkClick"
          class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition duration-150 group"
          active-class="bg-[#B06E02] text-white font-semibold hover:bg-[#B06E02] shadow-sm"
        >
          <!-- Custom Navigation SVG Icons -->
          <span class="text-white/60 group-hover:text-white group-[.router-link-active]:text-white">
            <!-- Início (Home) Icon -->
            <svg v-if="link.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>

            <!-- Minha Estante (Bookshelf) Icon -->
            <svg v-else-if="link.icon === 'bookshelf'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>

            <!-- Explorar (Explore) Icon -->
            <svg v-else-if="link.icon === 'explore'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 10.742l1.99 1.99a3 3 0 004.243 0l1.99-1.99a3 3 0 000-4.243l-1.99-1.99a3 3 0 00-4.243 0l-1.99 1.99a3 3 0 000 4.243zM12 21V12" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v9m0 0l-3-3m3 3l3-3" />
            </svg>

            <!-- Comunidade (Community) Icon -->
            <svg v-else-if="link.icon === 'community'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>

            <!-- Progresso (Progress) Icon -->
            <svg v-else-if="link.icon === 'progress'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>

            <!-- Perfil (Profile) Icon -->
            <svg v-else-if="link.icon === 'profile'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>

            <!-- Configurações (Settings) Icon -->
            <svg v-else-if="link.icon === 'settings'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          {{ link.name }}
        </router-link>
      </nav>
    </div>

    <!-- Footer Profile Badge -->
    <div class="p-4 border-t border-white/5 bg-white/[0.02] flex items-center gap-3">
      <!-- Profile Initials / Avatar Circle -->
      <div class="w-10 h-10 rounded-full bg-[#B06E02] flex items-center justify-center font-bold text-white shadow-sm flex-shrink-0 text-sm tracking-wider uppercase select-none">
        AR
      </div>
      <!-- User Info -->
      <div class="min-w-0 flex-1">
        <h4 class="text-sm font-semibold text-white truncate leading-tight">Anderson Ramalho</h4>
        <span class="text-xs text-white/50 truncate block mt-0.5 leading-none">teste@teste.com.br</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
</style>
