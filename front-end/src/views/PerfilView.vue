<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  name: 'Anderson Ramalho',
  email: 'teste@teste.com.br',
  initials: 'AR',
  bio: 'Amante de livros de ficção científica, fantasia e clássicos da literatura brasileira. Lendo sempre antes de dormir.'
})

const stats = [
  { label: 'Livros Lidos', value: '14', color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Páginas Lidas', value: '3.420', color: 'bg-indigo-50 text-indigo-600' },
  { label: 'Horas Lendo', value: '185h', color: 'bg-amber-50 text-amber-600' },
  { label: 'Resenhas', value: '8', color: 'bg-rose-50 text-rose-600' }
]

const activities = [
  { id: 1, text: 'Escreveu uma resenha para o livro 1984', time: '3 horas atrás', type: 'review' },
  { id: 2, text: 'Atingiu a meta de leitura diária de 30 minutos', time: 'Ontem', type: 'streak' },
  { id: 3, text: 'Adicionou o livro O Hobbit à estante', time: '3 dias atrás', type: 'bookshelf' },
  { id: 4, text: 'Conquistou a insígnia "Leitor Voraz"', time: '5 dias atrás', type: 'achievement' }
]
</script>

<template>
  <div class="space-y-6 select-none font-poppins text-[#13213C]">
    
    <!-- Title -->
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl md:text-3xl font-bold text-[#806602]">Meu Perfil</h1>
      <p class="text-sm text-gray-400 font-medium">Veja seus detalhes pessoais, estatísticas acumuladas e conquistas.</p>
    </div>

    <!-- Profile Detail Banner Card -->
    <div class="bg-white border border-[#B06E02]/10 rounded-2xl p-6 md:p-8 shadow-[0_4px_16px_rgba(176,110,2,0.03)] flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <!-- Big Initials Avatar Circle -->
      <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#B06E02] flex items-center justify-center font-bold text-white text-3xl md:text-4xl shadow-sm tracking-wider flex-shrink-0 select-none uppercase">
        {{ user.initials }}
      </div>
      
      <!-- Profile text details -->
      <div class="flex-1 text-center sm:text-left space-y-4">
        <div>
          <h2 class="text-lg md:text-xl font-bold text-[#13213C]">{{ user.name }}</h2>
          <span class="text-xs md:text-sm text-gray-400 font-medium block mt-0.5">{{ user.email }}</span>
        </div>
        <p class="text-xs md:text-sm text-gray-500 leading-relaxed max-w-xl">
          {{ user.bio }}
        </p>
        <div>
          <button class="bg-[#FFF8D6] hover:bg-[#FFF8D6]/85 text-[#806602] border border-[#B06E02]/20 font-semibold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>

    <!-- Profile statistics grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="bg-white border border-[#B06E02]/10 p-5 rounded-2xl shadow-[0_4px_16px_rgba(176,110,2,0.02)] flex flex-col justify-between gap-4"
      >
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</span>
        <span class="text-2xl font-bold text-[#13213C]">{{ stat.value }}</span>
      </div>
    </div>

    <!-- Recent Activities Timeline Card -->
    <div class="bg-white p-6 rounded-2xl border border-[#B06E02]/10 shadow-[0_4px_16px_rgba(176,110,2,0.03)] space-y-4">
      <h2 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Atividades recentes</h2>
      
      <div class="relative pl-6 space-y-6 border-l border-gray-100 mt-2">
        <div 
          v-for="act in activities" 
          :key="act.id"
          class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
        >
          <!-- Timeline Indicator Dot -->
          <div class="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full ring-4 ring-white bg-[#B06E02]"></div>
          
          <p class="text-xs font-bold text-[#13213C] leading-normal">{{ act.text }}</p>
          <span class="text-[10px] text-gray-400 font-semibold whitespace-nowrap">{{ act.time }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
