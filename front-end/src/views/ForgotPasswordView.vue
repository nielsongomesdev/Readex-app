<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

const handleForgotPassword = () => {
  console.log('Forgot password request for email:', email.value)
  // Mock success, redirect to reset-password view to demo the next page
  router.push('/reset-password')
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row font-poppins bg-white relative">
    
    <!-- Left/Top Section: Brand Info & Mascot (Beige-Yellow Background) -->
    <div class="w-full md:w-1/2 bg-[#FEF6D0] flex flex-col items-center justify-center p-8 md:p-16 text-center select-none py-12 md:py-0 min-h-[40vh] md:min-h-screen">
      
      <!-- Readex Logo in Top-Left -->
      <div class="md:absolute top-6 left-6 md:top-8 md:left-12 flex items-center gap-3 mb-8 md:mb-0">
        <div class="w-10 h-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center p-2">
          <img 
            src="../assets/images/mascote-3.png" 
            alt="Mascote Readex lendo" 
            class="w-full h-full object-contain"
          />
        </div>
        <span class="text-xl font-bold text-[#806602] tracking-wide">Readex</span>
      </div>

      <!-- Mascot Wrapper -->
      <div class="w-full max-w-[160px] sm:max-w-[200px] md:max-w-[280px] flex justify-center">
        <img 
          src="../assets/images/mascote-4.png" 
          alt="Mascote Readex correndo" 
          class="w-full h-auto object-contain mix-blend-multiply"
        />
      </div>
      
      <!-- Welcome Texts -->
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-[#806602] mt-6 mb-2 leading-tight">
        Recuperar acesso
      </h2>
      <p class="text-sm md:text-base text-[#806602]/80 max-w-xs leading-relaxed">
        Enviaremos um link para redefinir sua senha.
      </p>
    </div>

    <!-- Right/Bottom Section: Forgot Password Form (White Background) -->
    <div class="w-full md:w-1/2 bg-white flex items-center justify-center p-6 sm:p-12 md:p-16 py-12 md:py-0">
      <div class="w-full max-w-md flex flex-col">
        
        <!-- Small Mascot Top Icon -->
        <div class="flex justify-center mb-6">
          <img 
            src="../assets/images/mascote-4.png" 
            alt="Mascote miniatura" 
            class="w-14 h-14 object-contain mix-blend-multiply select-none"
          />
        </div>

        <!-- Form Header (Centered) -->
        <div class="mb-8 text-center">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#806602] mb-2">
            Esqueceu a senha?
          </h1>
          <p class="text-sm text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
            Digite seu email para receber o link de redefinição.
          </p>
        </div>

        <!-- Forgot Password Form -->
        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          
          <!-- Email Input with icon -->
          <div>
            <label for="email" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Email*
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#806602]/60">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input 
                id="email" 
                type="email" 
                v-model="email"
                placeholder="teste@teste.com.br" 
                required
                class="w-full border border-[#B06E02]/40 rounded-xl pl-12 pr-4 py-3.5 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80" 
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 shadow-sm cursor-pointer"
          >
            Enviar link
          </button>
        </form>

        <!-- Footer Text / Back to Login -->
        <div class="mt-8 text-center">
          <router-link to="/login" class="inline-flex items-center gap-2 text-sm font-bold text-[#806602] hover:underline transition duration-150">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Login
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
