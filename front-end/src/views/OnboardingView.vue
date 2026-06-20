<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen w-full bg-[#FEF6D0] font-poppins flex flex-col items-center px-6 py-8 md:relative md:justify-center md:p-12 overflow-x-hidden">
    
    
    <div class="flex flex-col items-center gap-1 select-none mb-3 md:flex-row md:gap-3 md:absolute md:top-8 md:left-12 md:mb-0">
      <div class="w-28 h-28 mt-2 md:mt-0 md:w-12 md:h-12 rounded-none md:rounded-xl bg-transparent md:bg-white shadow-none md:shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center p-2">
        <img 
          src="../assets/images/mascote-3.png" 
          alt="Mascote Readex lendo" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      <span class="text-2xl font-bold text-[#806602] tracking-wide">Readex</span>
    </div>

    
    <span class="text-[#806602]/95 text-sm font-medium mb-4 text-center md:hidden">
      Anotações, metas, progresso e comunidade.
    </span>

    
    <div class="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-16 lg:gap-24 flex-1 md:flex-initial">
      
      
      <div class="w-full md:w-1/2 flex justify-center max-w-[240px] sm:max-w-[280px] md:max-w-[420px]">
        <img 
          src="../assets/images/mascote-5.png" 
          alt="Mascote Readex lendo na estante" 
          class="w-full h-auto object-contain select-none mix-blend-multiply"
        />
      </div>

      
      <div class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        
        <span class="text-[#806602]/95 text-sm font-medium mb-3 md:mb-4 hidden md:block">
          Anotações, metas, progresso e comunidade.
        </span>

        
        <h1 class="text-xl sm:text-3xl md:text-5xl font-bold text-[#806602] mb-2 md:mb-6 leading-tight max-w-xl">
          Controle suas leituras<br class="md:hidden" /> em um só lugar.
        </h1>

        
        <p class="text-sm text-[#13213C]/70 mb-6 leading-relaxed md:hidden">
          Junte-se a nós e transforme sua jornada!
        </p>
        
        <p class="text-sm md:text-base text-[#13213C]/70 mb-8 leading-relaxed max-w-md hidden md:block">
          Junte-se a milhares de leitores e transforme sua jornada literária. Acompanhe metas, descubra novos livros e compartilhe resenhas.
        </p>

        
        <div class="flex flex-col gap-4 w-full max-w-xs md:max-w-sm">
          <router-link 
            to="/cadastro" 
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

</style>
