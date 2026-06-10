<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="h-16 w-full bg-white border-b border-[#B06E02]/10 flex items-center justify-between px-6 select-none sticky top-0 z-40">
    
    <!-- Left: Hamburger Toggle (Mobile Only) & Search Input -->
    <div class="flex items-center gap-4 flex-1 max-w-xl">
      <!-- Hamburger Menu (Mobile Only) -->
      <button 
        @click="emit('toggle-sidebar')" 
        type="button" 
        class="lg:hidden text-[#13213C] hover:bg-gray-100 p-2 rounded-xl transition cursor-pointer"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <!-- Search Bar -->
      <div class="relative w-full">
        <!-- Search Magnifier Icon -->
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <!-- Search Input -->
        <input 
          type="text" 
          placeholder="Buscar livros, resenhas, autores..." 
          class="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-[#13213C] placeholder-gray-400 focus:outline-none focus:border-[#B06E02]/40 focus:bg-white transition duration-150"
        />
      </div>
    </div>

    <!-- Right: Notification Icon -->
    <div class="flex items-center gap-4 ml-4">
      <button 
        type="button" 
        class="relative p-2 text-[#13213C] hover:bg-gray-100 rounded-xl transition cursor-pointer"
      >
        <!-- Bell Icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <!-- Unread Badge Dot -->
        <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
      </button>
    </div>

  </header>
</template>

<style scoped>
</style>
