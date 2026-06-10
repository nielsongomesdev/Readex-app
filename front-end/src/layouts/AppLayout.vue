<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'

const isSidebarOpen = ref(false)

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-[#FEF6D0]/20 font-poppins flex text-[#13213C]">
    
    <!-- Desktop Sidebar (Fixed Left) -->
    <Sidebar class="hidden lg:flex" />

    <!-- Mobile Sidebar Drawer Overlay -->
    <div v-if="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden">
      <!-- Translucent Backdrop -->
      <div 
        @click="closeSidebar" 
        class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      ></div>
      
      <!-- Drawer Sidebar -->
      <Sidebar 
        class="fixed left-0 top-0 h-screen z-50 animate-slide-in"
        :is-mobile="true" 
        @close="closeSidebar" 
      />
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
      <!-- Top Header -->
      <Header @toggle-sidebar="toggleSidebar" />
      
      <!-- Router Viewport for Logged-In Pages -->
      <main class="flex-1 p-6 md:p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>

  </div>
</template>

<style>
/* Simple sliding entry animation for the mobile sidebar drawer */
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
</style>
