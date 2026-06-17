<script setup lang="ts">
import { ref } from 'vue'

const name = ref('Anderson Ramalho')
const bio = ref('Amante de livros de ficção científica, fantasia e clássicos da literatura brasileira. Lendo sempre antes de dormir.')
</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    <h1 class="text-2xl md:text-3xl font-bold text-[#13213C]">Meu Perfil</h1>

    <div class="bg-white rounded-2xl border border-[#B06E02]/10 p-6 md:p-8 shadow-xs flex flex-col md:flex-row gap-8 items-center md:items-start">
      
      <div class="w-24 h-24 rounded-full bg-[#B06E02] flex items-center justify-center font-bold text-white text-3xl shadow-sm tracking-wider select-none flex-shrink-0">
        AR
      </div>

      <div class="flex-1 space-y-4 text-center md:text-left">
        <div>
          <h2 class="text-xl font-bold text-[#13213C]">{{ name }}</h2>
          <span class="text-sm text-gray-400 mt-1 block">teste@teste.com.br</span>
        </div>

        <div class="max-w-xl">
          <label class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-1">Sobre mim</label>
          <p class="text-sm text-gray-500 leading-relaxed">{{ bio }}</p>
        </div>

        
        <div class="space-y-2">
          <label class="block text-xs font-bold text-[#806602] uppercase tracking-wider">Gêneros Favoritos</label>
          <div class="flex flex-wrap justify-center md:justify-start gap-1.5">
            <span class="bg-gray-100 text-[#13213C] text-[10px] font-bold px-3 py-1 rounded-full">Ficção Científica</span>
            <span class="bg-gray-100 text-[#13213C] text-[10px] font-bold px-3 py-1 rounded-full">Fantasia</span>
            <span class="bg-gray-100 text-[#13213C] text-[10px] font-bold px-3 py-1 rounded-full">Literatura Brasileira</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
