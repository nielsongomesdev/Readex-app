<script setup lang="ts">
// OnboardingView.vue - Onboarding view matching Figma layout
</script>

<template>
  <div class="min-h-screen w-full bg-[#FEF6D0] font-poppins relative flex items-center justify-center p-6 md:p-12 overflow-x-hidden">
    
    <!-- Logo Badge (Top-Left) -->
    <div class="absolute top-6 left-6 md:top-8 md:left-12 flex items-center gap-3 select-none">
      <div class="w-12 h-12 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center p-2">
        <img 
          src="../assets/images/mascote-3.png" 
          alt="Mascote Readex lendo" 
          class="w-full h-full object-contain"
        />
      </div>
      <span class="text-2xl font-bold text-[#806602] tracking-wide">Readex</span>
    </div>

    <!-- Main Content Grid/Flex Container -->
    <div class="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24 pt-24 md:pt-0">
      
      <!-- Left side: Mascot Image (mascote-5 sits directly on the page background) -->
      <div class="w-full md:w-1/2 flex justify-center max-w-[280px] sm:max-w-[340px] md:max-w-[420px]">
        <img 
          src="../assets/images/mascote-5.png" 
          alt="Mascote Readex lendo na estante" 
          class="w-full h-auto object-contain select-none mix-blend-multiply"
        />
      </div>

      <!-- Right side: Texts & Stacked CTAs -->
      <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <!-- Tagline -->
        <span class="text-[#806602]/95 text-sm font-medium mb-3 md:mb-4">
          Anotações, metas, progresso e comunidade.
        </span>

        <!-- Main Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#806602] mb-4 md:mb-6 leading-tight max-w-lg">
          Controle suas leituras em um só lugar.
        </h1>

        <!-- Subtitle Description -->
        <p class="text-sm md:text-base text-[#13213C]/70 mb-8 leading-relaxed max-w-md">
          Junte-se a milhares de leitores e transforme sua jornada literária. Acompanhe metas, descubra novos livros e compartilhe resenhas.
        </p>

        <!-- Buttons Stack -->
        <div class="flex flex-col gap-4 w-full max-w-xs md:max-w-sm">
          <router-link 
            to="/register" 
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-[14px] hover:bg-[#13213C]/95 hover:scale-[1.02] active:scale-[0.98] transition duration-200 shadow-sm cursor-pointer text-center"
          >
            Criar conta
          </router-link>
          <router-link 
            to="/login" 
            class="w-full border border-[#13213C] bg-white text-[#13213C] font-semibold py-3.5 px-6 rounded-[14px] hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition duration-200 shadow-sm cursor-pointer text-center"
          >
            Entrar
          </router-link>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* Scoped styles kept minimal, Tailwind handles typography and layout constraints. */
</style>
