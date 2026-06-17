<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { name, handle, bio, temaClaro, tamanhoFonte, idioma, metaDiaria, generosFavoritosCount } from '../store/userStore'
import andersonAvatar from '../assets/images/anderson_avatar.png'

const router = useRouter()
const route = useRoute()

// Toggles states
const metaDiariaNotif = ref(true)
const recomendacoesNotif = ref(false)
const atividadeSocialNotif = ref(true)
const novosSeguidoresNotif = ref(true)
const resumoSemanalNotif = ref(false)

const cycleTamanhoFonte = () => {
  if (tamanhoFonte.value === 'Pequeno') {
    tamanhoFonte.value = 'Médio'
  } else if (tamanhoFonte.value === 'Médio') {
    tamanhoFonte.value = 'Grande'
  } else {
    tamanhoFonte.value = 'Pequeno'
  }
}

const cycleIdioma = () => {
  if (idioma.value === 'Português') {
    idioma.value = 'Inglês'
  } else if (idioma.value === 'Inglês') {
    idioma.value = 'Espanhol'
  } else {
    idioma.value = 'Português'
  }
}

const cycleMetaDiaria = () => {
  if (metaDiaria.value === '15 min') {
    metaDiaria.value = '30 min'
  } else if (metaDiaria.value === '30 min') {
    metaDiaria.value = '45 min'
  } else if (metaDiaria.value === '45 min') {
    metaDiaria.value = '60 min'
  } else {
    metaDiaria.value = '15 min'
  }
}

const cycleGeneros = () => {
  if (generosFavoritosCount.value < 10) {
    generosFavoritosCount.value += 1
  } else {
    generosFavoritosCount.value = 1
  }
}

// Edit Profile Modal states
const showEditModal = ref(false)
const editName = ref('')
const editHandle = ref('')
const editBio = ref('')

const openEditModal = () => {
  editName.value = name.value
  editHandle.value = handle.value
  editBio.value = bio.value
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  // Clean up the query param
  router.replace('/configuracoes')
}

const saveProfile = () => {
  if (!editName.value.trim()) {
    alert('O nome não pode estar vazio!')
    return
  }
  name.value = editName.value.trim()
  
  let formattedHandle = editHandle.value.trim()
  if (formattedHandle) {
    if (!formattedHandle.startsWith('@')) {
      formattedHandle = '@' + formattedHandle
    }
    handle.value = formattedHandle
  }
  
  bio.value = editBio.value.trim()
  closeEditModal()
}

const handleLogout = () => {
  if (confirm('Deseja realmente sair da conta?')) {
    router.push('/login')
  }
}

const handleDeleteAccount = () => {
  if (confirm('ATENÇÃO: Deseja realmente excluir sua conta de forma permanente? Esta ação não pode ser desfeita.')) {
    router.push('/')
  }
}

onMounted(() => {
  if (route.query.edit === 'true') {
    openEditModal()
  }
})
</script>

<template>
  <div class="select-none font-poppins text-[#13213C] pb-6 relative">

    <!-- Screen Title (Desktop only) -->
    <div class="hidden lg:flex items-center justify-between pb-3 border-b border-[#B06E02]/10 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-[#13213C]">Configurações</h1>
        <p class="text-sm text-gray-400 font-semibold mt-1">Gerencie sua conta, preferências e privacidade</p>
      </div>
      <!-- Right Icons -->
      <div class="flex items-center gap-3 text-[#FCAE1E]">
        <button class="p-2 hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button class="p-2 hover:bg-[#FFF5CD]/50 rounded-xl transition cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Header Bar (Overrides standard mobile header) -->
    <div class="lg:hidden sticky top-0 z-40 bg-[#FFFDF3] px-6 py-4 border-b border-[#B06E02]/10 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 select-none flex items-center justify-between">
      <h1 class="text-xl font-bold text-[#13213C]">Configurações</h1>
    </div>

    <!-- Main Content Layout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 lg:mt-0">
      
      <!-- ================= LEFT COLUMN ================= -->
      <div class="space-y-6">
        
        <!-- User Profile Card -->
        <router-link 
          to="/perfil"
          class="bg-white border border-[#B06E02]/5 p-5 rounded-2xl shadow-xs flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer block"
        >
          <div class="flex items-center gap-4 min-w-0">
            <img :src="andersonAvatar" alt="Avatar" class="w-14 h-14 rounded-full object-cover border border-gray-100 flex-shrink-0" />
            <div class="min-w-0">
              <h2 class="text-base font-bold text-[#13213C] truncate leading-tight">{{ name }}</h2>
              <p class="text-xs text-gray-400 font-semibold truncate mt-0.5">{{ handle }}</p>
              <span class="text-xs text-[#B06E02] font-bold mt-1.5 block hover:underline">Ver perfil completo</span>
            </div>
          </div>
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>

        <!-- Category: Conta -->
        <div class="space-y-2.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest pl-1">Conta</h3>
          <div class="bg-white border border-[#B06E02]/5 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100">
            
            <!-- Editar perfil -->
            <button 
              @click="openEditModal"
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Editar perfil</span>
              </div>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Senha e segurança -->
            <button 
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Senha e segurança</span>
              </div>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Privacidade e dados -->
            <button 
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
                <span>Privacidade e dados</span>
              </div>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>

        <!-- Category: Aparência -->
        <div class="space-y-2.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest pl-1">Aparência</h3>
          <div class="bg-white border border-[#B06E02]/5 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100">
            
            <!-- Tema claro -->
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tema claro</span>
              </div>
              <!-- Custom switch toggler -->
              <button 
                @click="temaClaro = !temaClaro"
                class="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 select-none outline-hidden"
                :class="temaClaro ? 'bg-[#FCAE1E]' : 'bg-gray-200'"
              >
                <div 
                  class="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200"
                  :class="temaClaro ? 'translate-x-5' : 'translate-x-0'"
                ></div>
              </button>
            </div>

            <!-- Tamanho da fonte -->
            <button 
              @click="cycleTamanhoFonte"
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tamanho da fonte</span>
              </div>
              <div class="flex items-center gap-1 text-gray-400">
                <span class="text-xs font-semibold">{{ tamanhoFonte }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <!-- Idioma -->
            <button 
              @click="cycleIdioma"
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Idioma</span>
              </div>
              <div class="flex items-center gap-1 text-gray-400">
                <span class="text-xs font-semibold">{{ idioma }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

          </div>
        </div>

      </div>

      <!-- ================= RIGHT COLUMN ================= -->
      <div class="space-y-6">
        
        <!-- Category: Notificações -->
        <div class="space-y-2.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest pl-1">Notificações</h3>
          <div class="bg-white border border-[#B06E02]/5 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100">
            
            <!-- Metas diárias -->
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Metas diárias</span>
              </div>
              <button 
                @click="metaDiariaNotif = !metaDiariaNotif"
                class="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 select-none outline-hidden"
                :class="metaDiariaNotif ? 'bg-[#FCAE1E]' : 'bg-gray-200'"
              >
                <div class="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200" :class="metaDiariaNotif ? 'translate-x-5' : 'translate-x-0'"></div>
              </button>
            </div>

            <!-- Recomendações -->
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Recomendações</span>
              </div>
              <button 
                @click="recomendacoesNotif = !recomendacoesNotif"
                class="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 select-none outline-hidden"
                :class="recomendacoesNotif ? 'bg-[#FCAE1E]' : 'bg-gray-200'"
              >
                <div class="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200" :class="recomendacoesNotif ? 'translate-x-5' : 'translate-x-0'"></div>
              </button>
            </div>

            <!-- Atividade social -->
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Atividade social</span>
              </div>
              <button 
                @click="atividadeSocialNotif = !atividadeSocialNotif"
                class="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 select-none outline-hidden"
                :class="atividadeSocialNotif ? 'bg-[#FCAE1E]' : 'bg-gray-200'"
              >
                <div class="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200" :class="atividadeSocialNotif ? 'translate-x-5' : 'translate-x-0'"></div>
              </button>
            </div>

            <!-- Novos seguidores -->
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Novos seguidores</span>
              </div>
              <button 
                @click="novosSeguidoresNotif = !novosSeguidoresNotif"
                class="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 select-none outline-hidden"
                :class="novosSeguidoresNotif ? 'bg-[#FCAE1E]' : 'bg-gray-200'"
              >
                <div class="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200" :class="novosSeguidoresNotif ? 'translate-x-5' : 'translate-x-0'"></div>
              </button>
            </div>

            <!-- Resumo semanal -->
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Resumo semanal</span>
              </div>
              <button 
                @click="resumoSemanalNotif = !resumoSemanalNotif"
                class="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 select-none outline-hidden"
                :class="resumoSemanalNotif ? 'bg-[#FCAE1E]' : 'bg-gray-200'"
              >
                <div class="bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform duration-200" :class="resumoSemanalNotif ? 'translate-x-5' : 'translate-x-0'"></div>
              </button>
            </div>

          </div>
        </div>

        <!-- Category: Preferências de leitura -->
        <div class="space-y-2.5">
          <h3 class="text-xs font-bold text-[#B06E02] uppercase tracking-widest pl-1">Preferências de leitura</h3>
          <div class="bg-white border border-[#B06E02]/5 rounded-2xl shadow-xs overflow-hidden divide-y divide-gray-100">
            
            <!-- Meta diária -->
            <button 
              @click="cycleMetaDiaria"
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Meta diária</span>
              </div>
              <div class="flex items-center gap-1 text-gray-400">
                <span class="text-xs font-semibold">{{ metaDiaria }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <!-- Gêneros favoritos -->
            <button 
              @click="cycleGeneros"
              class="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors text-left cursor-pointer outline-hidden"
            >
              <div class="flex items-center gap-3.5 text-sm font-semibold text-[#13213C]">
                <svg class="w-5 h-5 text-[#B06E02]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Gêneros favoritos</span>
              </div>
              <div class="flex items-center gap-1 text-gray-400">
                <span class="text-xs font-semibold">{{ generosFavoritosCount }} selecionados</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

          </div>
        </div>

        <!-- Category: Zona de perigo -->
        <div class="space-y-2.5">
          <h3 class="text-xs font-bold text-[#E04B6E] uppercase tracking-widest pl-1">Zona de perigo</h3>
          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              @click="handleLogout"
              class="flex-1 border-2 border-[#E04B6E] text-[#E04B6E] hover:bg-red-50 transition-colors font-bold text-sm py-3 rounded-xl cursor-pointer text-center select-none"
            >
              Sair da conta
            </button>
            <button 
              @click="handleDeleteAccount"
              class="flex-1 bg-[#E04B6E] text-white hover:bg-[#c03b5a] transition-colors font-bold text-sm py-3 rounded-xl cursor-pointer text-center select-none"
            >
              Excluir conta
            </button>
          </div>
        </div>

      </div>

    </div>

    <!-- ===================================================================== -->
    <!-- ==================== CREATIVE EDIT PROFILE MODAL ==================== -->
    <!-- ===================================================================== -->
    <div 
      v-if="showEditModal" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none"
    >
      <!-- Modal Box -->
      <div class="bg-white border border-[#B06E02]/10 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 transform transition-all duration-300 animate-slide-in">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 class="text-lg font-bold text-[#13213C]">Editar perfil</h3>
          <button 
            @click="closeEditModal"
            class="text-gray-400 hover:text-[#B06E02] transition-colors cursor-pointer p-1"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Form Fields -->
        <div class="space-y-4">
          <!-- Name Field -->
          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#B06E02] uppercase tracking-wider">Nome completo</label>
            <input 
              type="text" 
              v-model="editName"
              placeholder="Digite seu nome"
              class="w-full border border-gray-200 focus:border-[#FCAE1E] focus:ring-1 focus:ring-[#FCAE1E] rounded-xl px-4 py-2.5 text-sm font-medium text-[#13213C] outline-hidden transition"
            />
          </div>

          <!-- Handle Field -->
          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#B06E02] uppercase tracking-wider">Nome de usuário</label>
            <input 
              type="text" 
              v-model="editHandle"
              placeholder="Ex: @charmander"
              class="w-full border border-gray-200 focus:border-[#FCAE1E] focus:ring-1 focus:ring-[#FCAE1E] rounded-xl px-4 py-2.5 text-sm font-medium text-[#13213C] outline-hidden transition"
            />
          </div>

          <!-- Bio Field -->
          <div class="space-y-1">
            <label class="block text-xs font-bold text-[#B06E02] uppercase tracking-wider">Biografia</label>
            <textarea 
              v-model="editBio"
              placeholder="Fale um pouco sobre você..."
              rows="3"
              class="w-full border border-gray-200 focus:border-[#FCAE1E] focus:ring-1 focus:ring-[#FCAE1E] rounded-xl px-4 py-2.5 text-sm font-medium text-[#13213C] outline-hidden transition resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="flex items-center gap-3 pt-2">
          <button 
            @click="closeEditModal"
            class="flex-1 border border-gray-200 text-[#13213C] hover:bg-gray-50 transition font-bold text-xs py-3 rounded-xl cursor-pointer text-center select-none"
          >
            Cancelar
          </button>
          <button 
            @click="saveProfile"
            class="flex-1 bg-[#13213C] text-[#FFF5CD] hover:bg-[#1b2f54] transition font-bold text-xs py-3 rounded-xl cursor-pointer text-center select-none"
          >
            Salvar alterações
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Simple pop entry animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-in {
  animation: slideIn 0.2s ease-out forwards;
}
</style>
