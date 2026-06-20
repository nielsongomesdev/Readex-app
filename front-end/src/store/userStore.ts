import { ref } from 'vue'
import { api } from '../services/api'

export const name = ref('')
export const handle = ref('')
export const bio = ref('')

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
	} else {
		token.value = ''
		localStorage.removeItem('token')
		delete api.defaults.headers.common['Authorization']
	}
}

export async function loadUser() {
	try {
		const res = await api.get('/users')
		const user = Array.isArray(res.data) ? res.data[0] : res.data
		if (user) {
			name.value = user.name ?? ''
			handle.value = user.handle ?? ''
			bio.value = user.bio ?? ''
		}
	} catch (err) {
		console.error('Falha ao carregar usuário', err)
	}
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
