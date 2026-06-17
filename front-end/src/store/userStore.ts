import { ref } from 'vue'

export const name = ref('Anderson Ramalho')
export const handle = ref('@charmander')
export const bio = ref('Apaixonado por fantasia e ficção científica. 47 livros lidos em 2026.')

// Appearance and Reading Preferences states
export const temaClaro = ref(true) // true = Light, false = Dark
export const tamanhoFonte = ref('Médio') // 'Pequeno', 'Médio', 'Grande'
export const idioma = ref('Português') // 'Português', 'Inglês', 'Espanhol'
export const metaDiaria = ref('30 min') // '15 min', '30 min', '45 min', '60 min'
export const generosFavoritosCount = ref(4) // selected genres count
