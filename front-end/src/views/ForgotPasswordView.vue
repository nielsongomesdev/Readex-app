<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

const handleForgotPassword = () => {
  console.log('Forgot password request for email:', email.value)
  
  router.push('/reset-password')
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row font-poppins bg-[#FEF6D0] md:bg-white relative">
    
    
    <div class="hidden md:flex w-1/2 bg-[#FEF6D0] flex-col items-center justify-center p-16 text-center select-none min-h-screen relative">
      
      
      <div class="absolute top-8 left-12 flex items-center gap-3">
        <div class="w-10 h-10 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center p-2">
          <img 
            src="../assets/images/mascote-3.png" 
            alt="Mascote Readex lendo" 
            class="w-full h-full object-contain"
          />
        </div>
        <span class="text-xl font-bold text-[#806602] tracking-wide">Readex</span>
      </div>

      
      <div class="w-full max-w-[280px] flex justify-center">
        <img 
          src="../assets/images/mascote-4.png" 
          alt="Mascote Readex correndo" 
          class="w-full h-auto object-contain mix-blend-multiply"
        />
      </div>
      
      
      <h2 class="text-3xl md:text-4xl font-bold text-[#806602] mt-6 mb-2 leading-tight">
        Recuperar acesso
      </h2>
      <p class="text-sm md:text-base text-[#806602]/80 max-w-xs leading-relaxed">
        Enviaremos um link para redefinir sua senha.
      </p>
    </div>

    
    <div class="flex md:hidden flex-col items-center pt-10 pb-2 px-6">
      <div class="w-20 h-20 flex items-center justify-center">
        <img 
          src="../assets/images/mascote-4.png" 
          alt="Mascote Readex correndo" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
    </div>

    
    <div class="w-full md:w-1/2 md:bg-white flex items-start md:items-center justify-center px-6 pb-8 md:p-16">
      <div class="w-full max-w-md flex flex-col">
        
        
        <div class="hidden md:flex justify-center mb-6">
          <img 
            src="../assets/images/mascote-4.png" 
            alt="Mascote miniatura" 
            class="w-14 h-14 object-contain mix-blend-multiply select-none"
          />
        </div>

        
        <div class="mb-8 text-center">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#806602] mb-2">
            Esqueceu a senha?
          </h1>
          <p class="text-sm text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
            Digite seu email para receber o link de redefinição.
          </p>
        </div>

        
        <form @submit.prevent="handleForgotPassword" class="space-y-6">
          
          
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
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl pl-12 pr-4 py-3.5 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80" 
              />
            </div>
          </div>

          
          <button 
            type="submit" 
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 shadow-sm cursor-pointer"
          >
            Enviar link
          </button>
        </form>

        
        <div class="mt-8 text-center">
          <router-link to="/login" class="text-sm font-bold text-[#806602] hover:underline transition duration-150">
            Voltar ao Login
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
