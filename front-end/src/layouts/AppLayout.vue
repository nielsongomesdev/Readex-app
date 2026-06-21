<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'
import { temaClaro, tamanhoFonte } from '../store/userStore'

const route = useRoute()
const isSidebarOpen = ref(false)

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const mobileNavLinks = [
  { name: 'Início', path: '/dashboard', icon: 'home' },
  { name: 'Estante', path: '/estante', icon: 'bookshelf' },
  { name: 'Feed', path: '/comunidade', icon: 'community' },
  { name: 'Perfil', path: '/perfil', icon: 'profile' }
]
</script>

<template>
  <div 
    class="min-h-screen bg-[#FEF6D0]/10 font-poppins flex text-[#13213C] relative pb-16 lg:pb-0 transition-colors duration-300"
    :class="{ 'app-dark-mode': !temaClaro }"
    :style="{ fontSize: tamanhoFonte === 'Pequeno' ? '0.88em' : (tamanhoFonte === 'Grande' ? '1.12em' : '1em') }"
  >
    
    
    <Sidebar class="hidden lg:flex" />

    
    <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden">
      
      <div 
        @click="closeSidebar" 
        class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      
      <Sidebar 
        class="fixed left-0 top-0 h-screen z-50 animate-slide-in"
        :is-mobile="true" 
        @close="closeSidebar" 
      />
    </div>

    
    <div class="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
      
      <Header v-if="route.name !== 'explore' && route.name !== 'community' && route.name !== 'write-review' && route.name !== 'profile'" class="lg:hidden" @toggle-sidebar="toggleSidebar" />
      
      
      <main class="flex-1 p-6 md:p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>

    
    <nav class="fixed bottom-0 left-0 right-0 h-16 bg-[#FFFDF0] border-t border-[#B06E02]/10 flex items-center justify-around lg:hidden z-40 select-none px-2 shadow-xs">
      <router-link 
        v-for="item in mobileNavLinks" 
        :key="item.name" 
        :to="item.path"
        class="flex flex-col items-center justify-center gap-1 flex-1 py-1 text-gray-400/80 hover:text-[#B06E02] transition-colors"
        active-class="text-[#B06E02] font-semibold"
      >
        <span class="w-5 h-5 flex items-center justify-center">
          
          <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>

          
          <svg v-else-if="item.icon === 'bookshelf'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>

          
          <svg v-else-if="item.icon === 'community'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>

          
          <svg v-else-if="item.icon === 'profile'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <span class="text-[10px] tracking-wide mt-0.5">{{ item.name }}</span>
      </router-link>
    </nav>

  </div>
</template>

<style>

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.25s ease-out forwards;
}

.app-dark-mode {
  background-color: #0B0F19 !important;
  color: #E2E8F0 !important;
}

.app-dark-mode aside,
.app-dark-mode nav.fixed,
.app-dark-mode header,
.app-dark-mode .bg-white,
.app-dark-mode .bg-\[\#FFFDF3\],
.app-dark-mode .bg-\[\#FFFDF0\],
.app-dark-mode .bg-\[\#FEF6D0\]\/10 {
  background-color: #13213C !important;
  color: #E2E8F0 !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.app-dark-mode .text-\[\#13213C\] {
  color: #E2E8F0 !important;
}

.app-dark-mode .text-\[\#806602\] {
  color: #FCAE1E !important;
}

.app-dark-mode .text-gray-400 {
  color: #94A3B8 !important;
}

.app-dark-mode .border-gray-100,
.app-dark-mode .border-gray-200,
.app-dark-mode .border-\[\#B06E02\]\/10,
.app-dark-mode .border-\[\#B06E02\]\/5 {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.app-dark-mode input,
.app-dark-mode textarea {
  background-color: #0B0F19 !important;
  color: #E2E8F0 !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

.app-dark-mode .hover\:bg-gray-50\/50:hover,
.app-dark-mode .hover\:bg-gray-50:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
