<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert('As senhas não coincidem.')
    return
  }

  
  loading.value = true

  
  setTimeout(() => {
    
    localStorage.setItem('token', 'mock-token-123')
    
    
    loading.value = false

    
    router.push('/verify-email')
  }, 1500)
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
          src="../assets/images/mascote-1.png" 
          alt="Mascote Readex feliz" 
          class="w-full h-auto object-contain mix-blend-multiply"
        />
      </div>
      
      
      <h2 class="text-3xl md:text-4xl font-bold text-[#806602] mt-6 mb-2 leading-tight">
        Crie sua conta
      </h2>
      <p class="text-sm md:text-base text-[#806602]/80 max-w-xs leading-relaxed">
        Junte-se a milhares de leitores e comece sua jornada.
      </p>
    </div>

    
    <div class="flex md:hidden flex-col items-center pt-8 pb-4 px-6">
      
      <div class="w-24 h-24 flex items-center justify-center">
        <img 
          src="../assets/images/mascote-3.png" 
          alt="Mascote Readex lendo" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
      
      <span class="text-2xl font-bold text-[#806602] tracking-wide mt-1">Readex</span>
      
      <span class="text-sm text-[#806602]/80 mt-1">Bem-vindo, crie sua nova conta</span>
    </div>

    
    <div class="w-full md:w-1/2 md:bg-white flex items-start md:items-center justify-center px-6 pb-8 md:p-16">
      <div class="w-full max-w-md flex flex-col">
        
        
        <div class="mb-6 text-center hidden md:block">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#806602] mb-1">
            Criar nova conta
          </h1>
          <p class="text-sm text-gray-400 font-medium">
            Bem-vindo, crie sua nova conta
          </p>
        </div>

        
        <form @submit.prevent="handleRegister" class="space-y-4">
          
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
                Primeiro nome
              </label>
              <input 
                id="firstName" 
                type="text" 
                v-model="firstName"
                placeholder="Primeiro nome" 
                required
                :disabled="loading"
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl px-4 py-3 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80 disabled:opacity-50" 
              />
            </div>
            <div>
              <label for="lastName" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
                Último nome
              </label>
              <input 
                id="lastName" 
                type="text" 
                v-model="lastName"
                placeholder="Último nome" 
                required
                :disabled="loading"
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl px-4 py-3 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80 disabled:opacity-50" 
              />
            </div>
          </div>

          
          <div>
            <label for="email" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Email*
            </label>
            <input 
              id="email" 
              type="email" 
              v-model="email"
              placeholder="teste@teste.com.br" 
              required
              :disabled="loading"
              class="w-full border border-[#B06E02]/40 bg-white rounded-xl px-4 py-3 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80 disabled:opacity-50" 
            />
          </div>

          
          <div>
            <label for="phone" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Telefone*
            </label>
            <input 
              id="phone" 
              type="tel" 
              v-model="phone"
              placeholder="+55 88 99999-9999" 
              required
              :disabled="loading"
              class="w-full border border-[#B06E02]/40 bg-white rounded-xl px-4 py-3 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80 disabled:opacity-50" 
            />
          </div>

          
          <div>
            <label for="password" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Senha*
            </label>
            <div class="relative">
              <input 
                id="password" 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password"
                placeholder="............" 
                required
                :disabled="loading"
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl pl-4 pr-12 py-3 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] tracking-widest placeholder-gray-400/80 disabled:opacity-50" 
              />
              <button 
                type="button"
                @click="togglePasswordVisibility"
                :disabled="loading"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#806602]/70 hover:text-[#806602] focus:outline-none disabled:opacity-50"
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

          
          <div>
            <label for="confirmPassword" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Confirmar Senha*
            </label>
            <div class="relative">
              <input 
                id="confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="confirmPassword"
                placeholder="............" 
                required
                :disabled="loading"
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl pl-4 pr-12 py-3 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] tracking-widest placeholder-gray-400/80 disabled:opacity-50" 
              />
              <button 
                type="button"
                @click="toggleConfirmPasswordVisibility"
                :disabled="loading"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#806602]/70 hover:text-[#806602] focus:outline-none disabled:opacity-50"
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

          
          <div class="flex items-center text-sm">
            <label class="flex items-center gap-2 text-[#806602]/85 font-medium select-none cursor-pointer">
              <input 
                type="checkbox" 
                class="w-4 h-4 rounded border-[#B06E02]/40 text-[#806602] focus:ring-[#806602]" 
              />
              Lembrar-se
            </label>
          </div>

          
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 shadow-sm cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
          >
            
            <svg v-if="loading" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Criando conta...' : 'Continue' }}
          </button>
        </form>

        
        <p class="text-sm text-center text-gray-500 mt-6 select-none">
          Já tem uma conta?
          <router-link to="/login" class="text-[#B06E02] hover:underline font-bold transition duration-150">
            Entrar
          </router-link>
        </p>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
