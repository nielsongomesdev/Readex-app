<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="h-16 w-full bg-[#FFFDF3] border-b border-[#B06E02]/10 flex items-center justify-between px-6 select-none sticky top-0 z-40">
    
    <!-- Left: Readex Logo Text -->
    <div class="flex items-center">
      <span class="text-xl font-bold text-[#B06E02] tracking-wider">Readex</span>
    </div>

    <!-- Right: Bell & Search Icons (Orange) -->
    <div class="flex items-center gap-2">
      <!-- Notification Icon -->
      <button 
        type="button" 
        class="relative p-2 text-[#B06E02] hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer"
      >
        <!-- Bell Icon -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      <!-- Search Icon -->
      <button 
        type="button" 
        class="p-2 text-[#B06E02] hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>

  </header>
</template>

<style scoped>
</style>
