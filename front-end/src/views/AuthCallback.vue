<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSessionFromUrl } from '../supabase'
import api from '../services/api'
import { setToken, loadUser } from '../store/userStore'

const router = useRouter()

onMounted(async () => {
  try {
    const { data, error } = await getSessionFromUrl()
    if (error) {
      console.error('Erro ao obter sessão do Supabase:', error)
      router.push('/login')
      return
    }

    const session = data?.session
    if (!session) {
      router.push('/login')
      return
    }

    const accessToken = session.access_token

    
    const res = await api.post('/auth/social', { access_token: accessToken })
    if (res?.data?.token) {
      setToken(res.data.token)
      await loadUser()
      router.push('/dashboard')
    } else {
      console.error('Resposta inesperada do back-end', res)
      router.push('/login')
    }
  } catch (err) {
    console.error('Erro no callback de autenticação', err)
    router.push('/login')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div>Validando login...</div>
  </div>
</template>
