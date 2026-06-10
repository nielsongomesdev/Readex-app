<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const receiveEmailNotifs = ref(true)
const receivePushNotifs = ref(false)

const handleLogout = () => {
  console.log('Logging out user...')
  // Mock logout, redirect to login page
  router.push('/login')
}
</script>

<template>
  <div class="space-y-6 select-none font-poppins">
    <h1 class="text-2xl md:text-3xl font-bold text-[#13213C]">Configurações</h1>

    <div class="bg-white rounded-2xl border border-[#B06E02]/10 p-6 md:p-8 shadow-xs max-w-2xl space-y-6">
      
      <!-- Notifications Config -->
      <div class="space-y-4">
        <h2 class="text-base font-bold text-[#13213C] border-b border-gray-100 pb-2">Notificações</h2>
        <div class="space-y-3">
          <label class="flex items-center gap-3 text-sm text-[#13213C]/85 font-medium select-none cursor-pointer">
            <input 
              type="checkbox" 
              v-model="receiveEmailNotifs"
              class="w-4 h-4 rounded border-gray-300 text-[#B06E02] focus:ring-[#B06E02]" 
            />
            Receber atualizações por e-mail
          </label>
          <label class="flex items-center gap-3 text-sm text-[#13213C]/85 font-medium select-none cursor-pointer">
            <input 
              type="checkbox" 
              v-model="receivePushNotifs"
              class="w-4 h-4 rounded border-gray-300 text-[#B06E02] focus:ring-[#B06E02]" 
            />
            Receber notificações push no navegador
          </label>
        </div>
      </div>

      <!-- Account Actions -->
      <div class="space-y-4 pt-4">
        <h2 class="text-base font-bold text-[#13213C] border-b border-gray-100 pb-2">Conta</h2>
        <button 
          type="button" 
          @click="handleLogout"
          class="w-full sm:w-auto bg-red-50 text-red-600 border border-red-200 font-bold px-5 py-2.5 rounded-xl hover:bg-red-100/50 hover:border-red-300 text-sm transition cursor-pointer text-center"
        >
          Sair da Conta (Logout)
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
