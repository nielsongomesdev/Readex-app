import { ref } from 'vue'
import { api } from '../services/api'
import defaultAvatar from '../assets/images/anderson_avatar.png'

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}')
  } catch {
    return {}
  }
}

const storedUser = getStoredUser()
export const userId = ref(storedUser.id || '')
export const name = ref(storedUser.name || '')
export const handle = ref(storedUser.handle || '')
export const bio = ref(storedUser.bio || '')
export const avatarUrl = ref(localStorage.getItem('avatarUrl') || defaultAvatar)

export function updateAvatar(url: string) {
  avatarUrl.value = url
  localStorage.setItem('avatarUrl', url)
}

export const token = ref(localStorage.getItem('token') || '')

export const temaClaro = ref(true) 
export const tamanhoFonte = ref('Médio') 
export const idioma = ref('Português') 
export const metaDiaria = ref('30 min') 
export const generosFavoritosCount = ref(4) 

export function setToken(t: string | null) {
	if (t) {
		token.value = t
		localStorage.setItem('token', t)
		api.defaults.headers.common['Authorization'] = `Bearer ${t}`
		loadUser()
	} else {
		token.value = ''
		userId.value = ''
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		delete api.defaults.headers.common['Authorization']
	}
}

export async function loadUser() {
	try {
		const res = await api.get('/users/me')
		const user = res.data
		if (user) {
			userId.value = user.id ?? ''
			name.value = user.name ?? ''
			handle.value = user.handle ?? ''
			bio.value = user.bio ?? ''
			localStorage.setItem('user', JSON.stringify(user))
		}
	} catch (err) {
		console.error('Falha ao carregar usuário', err)
	}
}

if (token.value) {
	loadUser()
}

export async function login(credentials: { email: string; password: string }) {
	const res = await api.post('/login', credentials)
	if (res.data?.token) setToken(res.data.token)
	return res
}

export function logout() {
	setToken(null)
	name.value = ''
	handle.value = ''
	bio.value = ''
}
