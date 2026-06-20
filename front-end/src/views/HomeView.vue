<script setup lang="ts">

</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    
    <div class="bg-gradient-to-r from-[#13213C] to-[#1D325A] rounded-3xl p-6 md:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="space-y-2">
        <h1 class="text-2xl md:text-3xl font-bold">Olá, Anderson! 👋</h1>
        <p class="text-white/80 text-sm md:text-base max-w-md">
          Pronto para continuar sua jornada de leitura de hoje? Você está a apenas 2 capítulos de atingir sua meta diária!
        </p>
      </div>
      <div class="w-32 h-32 flex-shrink-0 flex items-center justify-center">
        <img 
          src="../assets/images/mascote-6.png" 
          alt="Mascote Readex lendo" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
    </div>

    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#FFF8D6] text-[#B06E02] flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
          </svg>
        </div>
        <div>
          <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block">Lendo atualmente</span>
          <span class="text-xl font-bold text-[#13213C]">3 Livros</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#E6F4EA] text-[#137333] flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block">Livros lidos</span>
          <span class="text-xl font-bold text-[#13213C]">14 Livros</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center flex-shrink-0">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <span class="text-xs text-gray-400 font-bold uppercase tracking-wider block">Meta de Leitura</span>
          <span class="text-xl font-bold text-[#13213C]">24 Livros / ano</span>
        </div>
      </div>
    </div>

    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs lg:col-span-2 space-y-4">
        <h2 class="text-lg font-bold text-[#13213C]">Continue Lendo</h2>
        
        <div class="space-y-4">
          
          <div class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
            <div class="w-12 h-16 bg-gray-200 rounded-lg shadow-xs overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-400">Capa</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-[#13213C] truncate">O Hobbit</h3>
              <p class="text-xs text-gray-400 truncate">J.R.R. Tolkien</p>
              <div class="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div class="bg-[#B06E02] h-1.5 rounded-full" style="width: 65%"></div>
              </div>
            </div>
            <span class="text-xs font-bold text-[#B06E02]">65%</span>
          </div>

          
          <div class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
            <div class="w-12 h-16 bg-gray-200 rounded-lg shadow-xs overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-400">Capa</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-[#13213C] truncate">1984</h3>
              <p class="text-xs text-gray-400 truncate">George Orwell</p>
              <div class="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div class="bg-[#B06E02] h-1.5 rounded-full" style="width: 25%"></div>
              </div>
            </div>
            <span class="text-xs font-bold text-[#B06E02]">25%</span>
          </div>
        </div>
      </div>

      
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs space-y-4">
        <h2 class="text-lg font-bold text-[#13213C]">Desafios Ativos</h2>
        
        <div class="bg-[#FFF8D6]/40 p-4 rounded-xl border border-[#B06E02]/15 space-y-3">
          <h3 class="text-sm font-bold text-[#806602]">Maratona Literária de Inverno</h3>
          <p class="text-xs text-gray-500 leading-relaxed">
            Leia 3 livros durante o mês de junho.
          </p>
          <div class="flex items-center justify-between text-xs font-semibold text-[#806602]">
            <span>Progresso: 1/3</span>
            <span>33%</span>
          </div>
          <div class="w-full bg-gray-200/50 rounded-full h-1.5 overflow-hidden">
            <div class="bg-[#B06E02] h-1.5 rounded-full" style="width: 33%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
