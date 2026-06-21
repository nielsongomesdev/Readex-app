<script setup lang="ts">
const achievements = [
  { id: 1, name: 'Leitor Voraz', desc: 'Leia por 7 dias seguidos', done: true },
  { id: 2, name: 'Expandindo Horizontes', desc: 'Leia livros de 3 gêneros diferentes', done: true },
  { id: 3, name: 'Maratonista', desc: 'Leia mais de 100 páginas em um dia', done: false }
]
</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    <h1 class="text-2xl md:text-3xl font-bold text-[#13213C]">Meu Progresso</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs space-y-4">
        <h2 class="text-base font-bold text-[#13213C]">Tempo de Leitura (Minutos)</h2>
        <div class="h-40 flex items-end justify-between gap-2 pt-4 border-b border-gray-100 px-2">
          
          <div class="flex-1 flex flex-col items-center gap-1.5">
            <div class="w-full bg-[#13213C]/10 hover:bg-[#13213C]/20 rounded-lg h-24 transition"></div>
            <span class="text-[10px] font-bold text-gray-400">Seg</span>
          </div>
          
          <div class="flex-1 flex flex-col items-center gap-1.5">
            <div class="w-full bg-[#13213C]/10 hover:bg-[#13213C]/20 rounded-lg h-32 transition"></div>
            <span class="text-[10px] font-bold text-gray-400">Ter</span>
          </div>
          
          <div class="flex-1 flex flex-col items-center gap-1.5">
            <div class="w-full bg-[#B06E02] rounded-lg h-40 shadow-xs"></div>
            <span class="text-[10px] font-bold text-[#B06E02]">Qua</span>
          </div>
          
          <div class="flex-1 flex flex-col items-center gap-1.5">
            <div class="w-full bg-[#13213C]/10 hover:bg-[#13213C]/20 rounded-lg h-16 transition"></div>
            <span class="text-[10px] font-bold text-gray-400">Qui</span>
          </div>
          
          <div class="flex-1 flex flex-col items-center gap-1.5">
            <div class="w-full bg-[#13213C]/10 hover:bg-[#13213C]/20 rounded-lg h-28 transition"></div>
            <span class="text-[10px] font-bold text-gray-400">Sex</span>
          </div>
        </div>
      </div>

      
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-xs space-y-4">
        <h2 class="text-base font-bold text-[#13213C]">Conquistas alcançadas</h2>
        
        <div class="space-y-3">
          <div 
            v-for="badge in achievements" 
            :key="badge.id"
            class="flex items-center gap-3.5 p-3 rounded-xl transition"
            :class="[badge.done ? 'bg-[#FFF8D6]/30 border border-[#B06E02]/15' : 'bg-gray-50 border border-transparent opacity-60']"
          >
            
            <div class="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs" :class="[badge.done ? 'bg-[#B06E02] text-white' : 'bg-gray-200 text-gray-400']">
              ✓
            </div>
            <div>
              <h3 class="text-xs font-bold text-[#13213C]">{{ badge.name }}</h3>
              <p class="text-[10px] text-gray-400 mt-0.5">{{ badge.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
