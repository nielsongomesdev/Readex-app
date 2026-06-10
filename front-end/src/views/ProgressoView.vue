<script setup lang="ts">
import { ref } from 'vue'

const streakDays = ref(15)
const monthlyGoal = ref({
  read: 3,
  target: 4,
  progress: 75
})

const weeklyStats = ref([
  { day: 'Seg', minutes: 20 },
  { day: 'Ter', minutes: 45 },
  { day: 'Qua', minutes: 60 },
  { day: 'Qui', minutes: 30 },
  { day: 'Sex', minutes: 15 },
  { day: 'Sáb', minutes: 50 },
  { day: 'Dom', minutes: 40 }
])

const calendarDays = ref([
  { day: 26, active: false }, { day: 27, active: false }, { day: 28, active: false }, { day: 29, active: false }, { day: 30, active: false }, { day: 31, active: true },
  { day: 1, active: true }, { day: 2, active: true }, { day: 3, active: true }, { day: 4, active: true }, { day: 5, active: true }, { day: 6, active: true },
  { day: 7, active: true }, { day: 8, active: true }, { day: 9, active: true }, { day: 10, active: true }, { day: 11, active: false }, { day: 12, active: false }
])
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- Title -->
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl md:text-3xl font-bold text-[#806602]">Meu Progresso</h1>
      <p class="text-sm text-gray-400 font-medium">Veja suas estatísticas de leitura e mantenha sua rotina ativa.</p>
    </div>

    <!-- Analytics Dashboard Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <!-- Left side: Streak Card (Dias de Ofensiva) -->
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] flex flex-col justify-between gap-6">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Dias de Ofensiva</h2>
            <p class="text-2xl font-bold text-[#13213C] flex items-center gap-2">
              <span class="text-orange-500 animate-pulse text-3xl">🔥</span>
              {{ streakDays }} dias seguidos!
            </p>
          </div>
          <span class="text-[10px] font-bold text-[#806602] bg-[#FFF8D6] px-3 py-1 rounded-full border border-[#B06E02]/15">
            Meta Diária: 15m
          </span>
        </div>

        <!-- Mini Calendar Grid showing streak consistency -->
        <div class="space-y-3">
          <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Histórico Recente</span>
          <div class="grid grid-cols-7 gap-2 text-center text-xs font-bold">
            <span class="text-gray-300 text-[10px]">D</span>
            <span class="text-gray-300 text-[10px]">S</span>
            <span class="text-gray-300 text-[10px]">T</span>
            <span class="text-gray-300 text-[10px]">Q</span>
            <span class="text-gray-300 text-[10px]">Q</span>
            <span class="text-gray-300 text-[10px]">S</span>
            <span class="text-gray-300 text-[10px]">S</span>

            <div 
              v-for="d in calendarDays" 
              :key="d.day"
              class="w-8 h-8 rounded-full flex items-center justify-center transition"
              :class="[d.active ? 'bg-[#B06E02] text-white shadow-xs' : 'bg-gray-50 text-gray-400 border border-gray-100']"
            >
              {{ d.day }}
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Monthly Goal Card (Meta do Mês) -->
      <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] flex flex-col justify-between gap-6">
        <div>
          <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Meta do Mês (Junho)</h2>
          
          <div class="flex items-center gap-6">
            <!-- Progress Ring or statistics -->
            <div class="relative w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full border border-[#B06E02]/5">
              <div class="text-center">
                <span class="text-2xl font-bold text-[#13213C]">{{ monthlyGoal.read }}</span>
                <span class="text-xs text-gray-400 block border-t border-gray-100 pt-0.5 mt-0.5">de {{ monthlyGoal.target }}</span>
              </div>
            </div>

            <!-- Goal details -->
            <div class="flex-1 space-y-2">
              <h3 class="text-sm font-bold text-[#13213C]">Desafio de Junho</h3>
              <p class="text-xs text-gray-400 font-medium leading-relaxed">
                Você leu {{ monthlyGoal.read }} de {{ monthlyGoal.target }} livros este mês. Falta apenas mais 1 livro para atingir seu objetivo!
              </p>
              
              <!-- Progress bar -->
              <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div class="bg-emerald-500 h-1.5 rounded-full" :style="{ width: monthlyGoal.progress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <button class="w-full bg-transparent hover:bg-gray-50 text-[#13213C] border border-gray-200 font-bold text-xs py-3 rounded-xl transition cursor-pointer text-center">
          Ajustar Meta Mensal
        </button>
      </div>

    </div>

    <!-- Reading Time Analytics Card (Simulating Reading Time Graph) -->
    <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Tempo de leitura semanal (Minutos)</h2>
        <span class="text-xs font-semibold text-gray-400">Total: 260 minutos</span>
      </div>

      <div class="h-44 flex items-end justify-between gap-3 pt-6 border-b border-gray-100 px-4">
        <div 
          v-for="stat in weeklyStats" 
          :key="stat.day"
          class="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
        >
          <!-- Tooltip on hover -->
          <span class="opacity-0 group-hover:opacity-100 transition duration-150 bg-[#13213C] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md mb-1 select-none">
            {{ stat.minutes }}m
          </span>
          <!-- Chart bar -->
          <div 
            class="w-full max-w-[28px] rounded-t-lg transition-all duration-300 cursor-pointer"
            :class="[stat.minutes >= 50 ? 'bg-[#B06E02] hover:bg-[#806602]' : 'bg-[#13213C]/10 hover:bg-[#13213C]/20']"
            :style="{ height: (stat.minutes / 60) * 100 + '%' }"
          ></div>
          <!-- Label -->
          <span class="text-[10px] font-bold text-gray-400 mt-1">{{ stat.day }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
