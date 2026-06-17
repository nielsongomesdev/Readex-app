<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleResetPassword = () => {
  console.log('Resetting password:', {
    password: password.value,
    confirmPassword: confirmPassword.value
  })
  // Redirect to login on success
  router.push('/login')
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col md:flex-row font-poppins bg-[#FEF6D0] md:bg-white relative">
    
    <!-- ===== Left Section: Brand (Desktop only) ===== -->
    <div class="hidden md:flex w-1/2 bg-[#FEF6D0] flex-col items-center justify-center p-16 text-center select-none min-h-screen relative">
      
      <!-- Readex Logo (Top-Left) -->
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

      <!-- Mascot -->
      <div class="w-full max-w-[280px] flex justify-center">
        <img 
          src="../assets/images/mascote-4.png" 
          alt="Mascote Readex correndo" 
          class="w-full h-auto object-contain mix-blend-multiply"
        />
      </div>
      
      <!-- Welcome Texts -->
      <h2 class="text-3xl md:text-4xl font-bold text-[#806602] mt-6 mb-2 leading-tight">
        Redefinir senha
      </h2>
      <p class="text-sm md:text-base text-[#806602]/80 max-w-xs leading-relaxed">
        Crie uma senha forte e segura para proteger sua conta.
      </p>
    </div>

    <!-- ===== Mobile Header: Mascot (Mobile only) ===== -->
    <div class="flex md:hidden flex-col items-center pt-10 pb-2 px-6">
      <div class="w-20 h-20 flex items-center justify-center">
        <img 
          src="../assets/images/mascote-4.png" 
          alt="Mascote Readex correndo" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
    </div>

    <!-- ===== Right/Bottom Section: Reset Password Form ===== -->
    <div class="w-full md:w-1/2 md:bg-white flex items-start md:items-center justify-center px-6 pb-8 md:p-16">
      <div class="w-full max-w-md flex flex-col">
        
        <!-- Small Mascot Top Icon (Desktop only) -->
        <div class="hidden md:flex justify-center mb-6">
          <img 
            src="../assets/images/mascote-4.png" 
            alt="Mascote miniatura" 
            class="w-14 h-14 object-contain mix-blend-multiply select-none"
          />
        </div>

        <!-- Form Header -->
        <div class="mb-8 text-center">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#806602] mb-2">
            Nova Senha
          </h1>
          <p class="text-sm text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
            Crie uma nova senha para sua conta.
          </p>
        </div>

        <!-- Reset Password Form -->
        <form @submit.prevent="handleResetPassword" class="space-y-6">
          
          <!-- Password Input -->
          <div>
            <label for="password" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Nova senha
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#806602]/60">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                id="password" 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password"
                placeholder="Digite sua nova senha" 
                required
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl pl-12 pr-12 py-3.5 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80" 
              />
              <button 
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#806602]/70 hover:text-[#806602] focus:outline-none"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirmPassword" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Confirme a Senha
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#806602]/60">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                id="confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="confirmPassword"
                placeholder="Digite a senha novamente" 
                required
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl pl-12 pr-12 py-3.5 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80" 
              />
              <button 
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#806602]/70 hover:text-[#806602] focus:outline-none"
              >
                <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 shadow-sm cursor-pointer mt-2"
          >
            Redefinir Senha
          </button>
        </form>

        <!-- Cancel Link -->
        <div class="mt-8 text-center">
          <router-link to="/login" class="text-sm font-bold text-[#B06E02] hover:underline transition duration-150">
            Cancelar
          </router-link>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
