<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithProvider } from '../supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const handleLogin = () => {
  console.log('Login attempt:', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  })
  
  router.push('/dashboard')
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleGoogle = async () => {
  try {
    await signInWithProvider('google')
  } catch (err) {
    console.error('Erro ao iniciar OAuth Google', err)
  }
}

const handleApple = async () => {
  try {
    await signInWithProvider('apple')
  } catch (err) {
    console.error('Erro ao iniciar OAuth Apple', err)
  }
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
          src="../assets/images/mascote-2.png" 
          alt="Mascote Readex dando as boas-vindas" 
          class="w-full h-auto object-contain mix-blend-multiply"
        />
      </div>
      
      
      <h2 class="text-3xl md:text-4xl font-bold text-[#806602] mt-6 mb-2 leading-tight">
        Bem-vindo de volta!
      </h2>
      <p class="text-sm md:text-base text-[#806602]/80 max-w-xs leading-relaxed">
        Acesse sua conta e continue sua jornada de leitura.
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
      
      <span class="text-sm text-[#806602]/80 mt-1">Bem-vindo de volta!</span>
    </div>

    
    <div class="w-full md:w-1/2 md:bg-white flex items-start md:items-center justify-center px-6 pb-8 md:p-16">
      <div class="w-full max-w-md flex flex-col">
        
        
        <div class="mb-8 text-center hidden md:block">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#806602] mb-1">
            Entrar na sua conta
          </h1>
          <p class="text-sm text-gray-400 font-medium">
            Bem-vindo de volta!
          </p>
        </div>

        
        <form @submit.prevent="handleLogin" class="space-y-5">
          
          
          <div>
            <label for="username" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Username ou Email
            </label>
            <input 
              id="username" 
              type="text" 
              v-model="email"
              placeholder="Insira seu email ou username" 
              required
              class="w-full border border-[#B06E02]/40 bg-white rounded-xl px-4 py-3.5 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] placeholder-gray-400/80" 
            />
          </div>

          
          <div>
            <label for="password" class="block text-xs font-bold text-[#806602] uppercase tracking-wider mb-2">
              Senha
            </label>
            <div class="relative">
              <input 
                id="password" 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password"
                placeholder="............" 
                required
                class="w-full border border-[#B06E02]/40 bg-white rounded-xl pl-4 pr-12 py-3.5 focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 text-sm font-medium text-[#13213C] tracking-widest placeholder-gray-400/80" 
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

          
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-[#806602]/85 font-medium select-none cursor-pointer">
              <input 
                type="checkbox" 
                v-model="rememberMe"
                class="w-4 h-4 rounded border-[#B06E02]/40 text-[#806602] focus:ring-[#806602]" 
              />
              Lembrar-se
            </label>
            
            <router-link to="/forgot-password" class="text-[#B06E02] hover:underline font-bold transition duration-150 hidden md:inline">
              Esqueci senha
            </router-link>
          </div>

          
          <button 
            type="submit" 
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 shadow-sm cursor-pointer mt-2"
          >
            Entrar
          </button>
        </form>

        
        <router-link to="/forgot-password" class="text-[#B06E02] hover:underline font-bold transition duration-150 text-sm text-center mt-4 md:hidden">
          Esqueci senha
        </router-link>

        
        <div class="flex items-center gap-4 my-6">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="text-xs text-gray-400 font-semibold uppercase select-none">Ou</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        
        <div class="flex flex-col gap-3">
          
          <button 
            type="button" 
            @click="handleGoogle"
            class="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-[#13213C] font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer text-sm"
          >
            
            <svg class="w-5 h-5 select-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue com o Google
          </button>
          
          
          <button 
            type="button" 
            @click="handleApple"
            class="w-full flex items-center justify-center gap-3 border border-gray-200 bg-white text-[#13213C] font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer text-sm"
          >
            
            <svg class="w-5 h-5 select-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.73-1.2 1.87-1.05 2.99 1.11.09 2.26-.54 3-1.43z"/>
            </svg>
            Continue com a Apple
          </button>
        </div>

        
        <p class="text-sm text-center text-gray-500 mt-8 select-none">
          Não tem uma conta?
          <router-link to="/cadastro" class="text-[#B06E02] hover:underline font-bold transition duration-150">
            Cadastre-se
          </router-link>
        </p>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
