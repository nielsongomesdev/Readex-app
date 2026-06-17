<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const lendoBookProgress = ref({
  title: 'O Nome do Vento',
  author: 'Patrick Rothfuss',
  progress: 68
})

const barChartData = [
  { month: 'Jan', count: 2, highlight: false },
  { month: 'Fev', count: 3, highlight: false },
  { month: 'Mar', count: 4, highlight: false },
  { month: 'Abr', count: 3, highlight: false },
  { month: 'Mai', count: 5, highlight: true }
]

const statsData = [
  { label: 'Livros lidos', value: '3' },
  { label: 'Páginas', value: '847' },
  { label: 'Tempo', value: '04:22h' },
  { label: 'Anotações', value: '18' }
]

const achievements = [
  { name: 'Maratonista', desc: '10 livros em 30d', type: 'award' },
  { name: 'Em chamas', desc: 'Seq. 10+ dias', type: 'fire' },
  { name: 'Crítico', desc: '5 resenhas', type: 'pen' },
  { name: 'Mestre', desc: '50 livros lidos', type: 'trophy' }
]

const goBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- ================= DESKTOP HEADER ROW (Desktop only) ================= -->
    <div class="hidden lg:flex items-center justify-between pb-3 border-b border-[#B06E02]/10">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-[#13213C]">Meu Progresso</h1>
        <p class="text-xs text-gray-400 font-semibold">Acompanhe suas estatísticas de leitura</p>
      </div>
      <!-- Right Icons -->
      <div class="flex items-center gap-3">
        <button type="button" class="p-2 text-[#B06E02] hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button type="button" class="p-2 text-[#B06E02] hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ================= MOBILE TOP HEADER BAR (Mobile only) ================= -->
    <div class="flex lg:hidden items-center gap-4 py-2 border-b border-[#B06E02]/10 mb-2">
      <button @click="goBack" class="p-1 text-[#13213C] hover:bg-gray-100 rounded-lg transition cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <span class="text-base font-bold text-[#13213C]">Meu Progresso</span>
    </div>

    <!-- ================= MAIN PROGRESS DASHBOARD LAYOUT GRID ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- ================= LEFT COLUMN ================= -->
      <div class="space-y-6">
        
        <!-- 1. Lendo atualmente progress ring -->
        <div class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs text-center space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Lendo atualmente</h2>
          
          <div class="relative w-44 h-44 flex items-center justify-center mx-auto">
            <!-- SVG Donut Chart -->
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#E5DED1" stroke-width="7" fill="transparent" />
              <!-- stroke-dasharray = 2 * pi * r = 251.32, stroke-dashoffset = 251.32 * (1 - 0.68) = 80.42 -->
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="#FCAE1E" 
                stroke-width="7" 
                fill="transparent" 
                stroke-dasharray="251.32" 
                stroke-dashoffset="80.42"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute text-center select-none px-2 w-full">
              <span class="text-3xl font-bold text-[#FCAE1E]">{{ lendoBookProgress.progress }}%</span>
              <span class="block text-xs font-bold text-[#13213C] mt-1.5 truncate">{{ lendoBookProgress.title }}</span>
              <span class="block text-[10px] text-gray-400 font-semibold mt-0.5 truncate">{{ lendoBookProgress.author }}</span>
            </div>
          </div>
        </div>

        <!-- 2. Streak Sequence banner -->
        <div class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl shadow-xs flex items-center gap-4">
          <div class="w-10 h-10 bg-[#FFFBEA] rounded-xl flex items-center justify-center text-[#FCAE1E] flex-shrink-0 border border-[#B06E02]/10">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 11h-6V3l-7 10h6v8z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-sm font-bold text-[#13213C]">12 dias de sequência!</h3>
            <p class="text-xs text-gray-400 font-medium">Continue assim!</p>
          </div>
        </div>

        <!-- 3. Este mês stats -->
        <div class="space-y-3">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Este mês</h2>
          
          <!-- Desktop Grid -->
          <div class="hidden lg:grid grid-cols-2 gap-4">
            <div 
              v-for="stat in statsData" 
              :key="stat.label"
              class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs"
            >
              <span class="block text-2xl font-bold text-[#13213C]">{{ stat.value }}</span>
              <span class="text-[11px] text-gray-400 font-semibold block mt-1">{{ stat.label }}</span>
            </div>
          </div>

          <!-- Mobile Horizontal Scroll stats -->
          <div class="lg:hidden flex overflow-x-auto gap-3.5 pb-2 scrollbar-none select-none">
            <div 
              v-for="stat in statsData" 
              :key="stat.label + '-mobile'"
              class="bg-white border border-[#B06E02]/10 p-4 rounded-2xl shadow-xs text-center flex-shrink-0 w-[100px]"
            >
              <span class="block text-lg font-bold text-[#13213C]">{{ stat.value }}</span>
              <span class="text-[10px] text-gray-400 font-semibold block mt-1 truncate">{{ stat.label }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ================= RIGHT COLUMN ================= -->
      <div class="space-y-6">
        
        <!-- 1. Livros por mês bar chart -->
        <div class="bg-white border border-[#B06E02]/10 p-6 rounded-2xl shadow-xs space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Livros por mês</h2>
          
          <div class="flex items-end justify-around h-44 pt-6 border-b border-[#B06E02]/10 px-2 select-none">
            <div 
              v-for="bar in barChartData" 
              :key="bar.month"
              class="flex flex-col items-center gap-2 h-full justify-end flex-1"
            >
              <span class="text-[11px] font-bold" :class="bar.highlight ? 'text-[#FCAE1E]' : 'text-gray-400'">{{ bar.count }}</span>
              <!-- Vertical Bar -->
              <div 
                class="w-full max-w-[28px] rounded-t-md transition-all duration-300"
                :class="bar.highlight ? 'bg-[#FCAE1E]' : 'bg-[#E5DED1]'"
                :style="{ height: (bar.count / 5) * 100 + '%' }"
              ></div>
              <span class="text-[10px] font-bold text-gray-400 mt-1">{{ bar.month }}</span>
            </div>
          </div>
        </div>

        <!-- 2. Meta do mês card -->
        <div class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-3.5">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Meta do mês: 8 livros</h2>
          
          <!-- Desktop detail row -->
          <div class="hidden lg:flex justify-between items-center text-xs">
            <span class="font-bold text-[#13213C]">5 de 8 livros</span>
            <span class="font-bold text-[#806602]">62.5%</span>
          </div>
          <!-- Progress bar -->
          <div class="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
            <div class="bg-[#FCAE1E] h-2 rounded-full" style="width: 62.5%"></div>
          </div>
          <!-- Subtitle info -->
          <p class="hidden lg:block text-[11px] text-gray-400 font-semibold leading-relaxed">
            Faltam 3 livros para alcançar sua meta — você está no caminho!
          </p>
          <!-- Mobile centered subtitle -->
          <p class="block lg:hidden text-center text-[11px] text-gray-400 font-semibold mt-1.5">
            62.5% concluído • 3 restantes
          </p>
        </div>

        <!-- 3. Conquistas card grid -->
        <div class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-xs space-y-4">
          <h2 class="text-xs font-bold text-[#806602] uppercase tracking-widest">Conquistas</h2>
          
          <div class="grid grid-cols-4 gap-2 sm:gap-3">
            <div 
              v-for="item in achievements" 
              :key="item.name"
              class="bg-[#FFFBEA] border border-[#B06E02]/10 p-2 sm:p-3 rounded-xl text-center select-none flex flex-col justify-center items-center gap-1.5 min-w-0"
            >
              <!-- Icon: Maratonista (Book with sparkles) -->
              <svg v-if="item.type === 'award'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <!-- Sparkle 1 (Large) -->
                <path d="M17 1.5c0 .8.6 1.4 1.4 1.4-.8 0-1.4.6-1.4 1.4 0-.8-.6-1.4-1.4-1.4.8 0 1.4-.6 1.4-1.4z" />
                <!-- Sparkle 2 (Small) -->
                <path d="M19.5 4.5c0 .4.3.7.7.7-.4 0-.7.3-.7.7 0-.4-.3-.7-.7-.7.4 0 .7-.3.7-.7z" />
                <!-- Book Cover Body (Top) -->
                <path d="M6.5 5.5A1.5 1.5 0 0 1 8 4h6.5A1.5 1.5 0 0 1 16 5.5V14H6.5V5.5z" />
                <!-- Book Cover Body (Bottom) -->
                <path d="M6.5 16h9.5v1.5a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5V16z" />
              </svg>

              <!-- Icon: Em chamas (Flame) -->
              <svg v-else-if="item.type === 'fire'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <path d="M10 2C9.5 5.5 6.5 8.5 6.5 12.5C6.5 16.5 9.5 19.5 13.5 19.5C16.5 19.5 17.5 16.5 17.5 13.5C17.5 8.5 12.5 5.5 10 2Z" />
              </svg>

              <!-- Icon: Crítico (Star + Pen) -->
              <svg v-else-if="item.type === 'pen'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <defs>
                  <mask id="critico-mask">
                    <rect width="24" height="24" fill="white" />
                    <path d="M2.5 21.5L21.5 2.5" stroke="black" stroke-width="4.5" stroke-linecap="round" />
                  </mask>
                </defs>
                <!-- Star with cut-out mask -->
                <path mask="url(#critico-mask)" d="M12 2l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1-4.4-4.3 6.1-.9z" />
                <!-- Diagonal Pencil -->
                <path d="M5.5 19.5L19.5 5.5l1 1-14 14z" />
                <path d="M5.5 19.5L4 22l2.5-1.5z" />
              </svg>

              <!-- Icon: Mestre (Trophy) -->
              <svg v-else-if="item.type === 'trophy'" class="w-6 h-6 text-[#FCAE1E] fill-current" viewBox="0 0 24 24">
                <path d="M5 4h14v5c0 3-2.5 5.5-5.5 5.8V18H16v2H8v-2h2.5v-3.2C7.5 14.5 5 12 5 9V4z" />
                <path d="M3 6h2v3H3z" />
                <path d="M19 6h2v3H19z" />
              </svg>
              
              <h4 class="text-[10px] font-bold text-[#13213C] truncate leading-tight w-full">{{ item.name }}</h4>
              <p class="text-[8px] text-gray-400 font-semibold truncate w-full">{{ item.desc }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
