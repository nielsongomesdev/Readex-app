<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const code = ref(['', '', '', '', '', ''])
const codeInputs = ref<HTMLInputElement[]>([])

const handleInput = (e: Event, idx: number) => {
  const input = e.target as HTMLInputElement
  const val = input.value.replace(/[^0-9]/g, '') // Keep numeric only
  code.value[idx] = val

  // Auto-focus next input field
  if (val && idx < 5) {
    codeInputs.value[idx + 1]?.focus()
  }
}

const handleDelete = (e: KeyboardEvent, idx: number) => {
  if (e.key === 'Backspace' && !code.value[idx] && idx > 0) {
    code.value[idx - 1] = ''
    codeInputs.value[idx - 1]?.focus()
  }
}

const handleVerify = () => {
  const codeString = code.value.join('')
  console.log('Verifying email code:', codeString)
  // Mock verification complete, redirect to login
  router.push('/login')
}

const handleResend = () => {
  console.log('Resending verification email code...')
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
        Quase lá!
      </h2>
      <p class="text-sm md:text-base text-[#806602]/80 max-w-xs leading-relaxed">
        Verifique seu e-mail para ativar sua conta e começar a leitura.
      </p>
    </div>

    <!-- ===== Mobile Header: Mascot (Mobile only) ===== -->
    <div class="flex md:hidden flex-col items-center pt-10 pb-4 px-6">
      <!-- Mascot icon -->
      <div class="w-20 h-20 flex items-center justify-center">
        <img 
          src="../assets/images/mascote-4.png" 
          alt="Mascote Readex correndo" 
          class="w-full h-full object-contain mix-blend-multiply"
        />
      </div>
    </div>

    <!-- ===== Right/Bottom Section: Verification Form ===== -->
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
        <div class="mb-6 text-center">
          <h1 class="text-2xl sm:text-3xl font-bold text-[#806602] mb-2">
            Verifique seu E-mail
          </h1>
          <p class="text-sm text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
            Enviamos um código para sua caixa de entrada. Digite abaixo o código de 6 dígitos
          </p>
        </div>

        <!-- Verification Form -->
        <form @submit.prevent="handleVerify" class="space-y-6">
          
          <!-- 6-digit Code Inputs Grid -->
          <div class="flex justify-center gap-2 sm:gap-3 my-6">
            <input 
              v-for="(digit, idx) in 6" 
              :key="idx" 
              type="text" 
              maxlength="1" 
              pattern="[0-9]*"
              inputmode="numeric"
              v-model="code[idx]"
              @input="handleInput($event, idx)"
              @keydown="handleDelete($event, idx)"
              ref="codeInputs"
              required
              class="w-12 h-12 sm:w-14 sm:h-14 border border-[#B06E02]/30 rounded-xl text-center text-lg sm:text-xl font-bold text-[#13213C] focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-200 bg-white md:bg-gray-50/50" 
            />
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-[#13213C] text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 hover:scale-[1.01] active:scale-[0.99] transition duration-200 shadow-sm cursor-pointer"
          >
            Verificar
          </button>
        </form>

        <!-- Footer Text -->
        <p class="text-sm text-center text-gray-500 mt-8 select-none">
          Não recebeu?
          <button 
            type="button" 
            @click="handleResend" 
            class="text-[#B06E02] hover:underline font-bold transition duration-150 ml-1 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            Reenviar código
          </button>
        </p>

      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
