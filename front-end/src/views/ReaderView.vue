<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../services/api'
import { googleBooksApi } from '../services/googleBooks'
import { getMockBookDetails } from '../services/mockBooks'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const currentPage = ref(1)
const saving = ref(false)
const showControls = ref(true)
const showFinishedModal = ref(false)

// Customization preferences
const readingTheme = ref(localStorage.getItem('reader-theme') || 'sepia') // 'light', 'sepia', 'dark'
const fontSizeClass = ref(localStorage.getItem('reader-font-size') || 'medium') // 'small', 'medium', 'large', 'xl'

const book = ref({
  id: '',
  title: '',
  author: '',
  cover: '',
  paginas: 250,
  genre: ''
})

const fetchBook = async () => {
  const id = route.params.id as string
  if (!id) return

  loading.value = true
  try {
    const res = await googleBooksApi.getVolume(id)
    const info = res.data.volumeInfo || {}
    book.value = {
      id,
      title: info.title || 'Título desconhecido',
      author: info.authors ? info.authors[0] : 'Autor desconhecido',
      cover: info.imageLinks?.thumbnail || '',
      paginas: info.pageCount || 250,
      genre: info.categories ? info.categories[0] : 'Literatura'
    }
  } catch (err) {
    const mock = getMockBookDetails(id)
    book.value = {
      id,
      title: mock.title || 'Título desconhecido',
      author: mock.author || 'Autor desconhecido',
      cover: mock.cover || '',
      paginas: mock.pages || 250,
      genre: mock.genre || 'Literatura'
    }
  } finally {
    loading.value = false
  }
}

const fetchProgress = async () => {
  try {
    const res = await api.get('/shelf')
    const items = res.data || []
    const currentItem = items.find((item: any) => item.bookId === route.params.id)
    if (currentItem) {
      currentPage.value = currentItem.pagesRead || 1
      if (currentPage.value === 0) currentPage.value = 1
    }
  } catch (err) {
    console.error('Erro ao carregar progresso:', err)
  }
}

const updateProgress = async () => {
  saving.value = true
  try {
    const isFinished = currentPage.value >= book.value.paginas
    const status = isFinished ? 'Lido' : 'Lendo'
    
    // Ensure book is registered in backend
    try {
      await api.post('/books', {
        id: book.value.id,
        title: book.value.title,
        author: book.value.author,
        description: '',
        coverUrl: book.value.cover
      })
    } catch (_) {
      // Swallowed (book already exists)
    }

    await api.post('/shelf', {
      bookId: book.value.id,
      status,
      pagesRead: currentPage.value
    })

    if (isFinished) {
      showFinishedModal.value = true
    }
  } catch (err) {
    console.error('Erro ao atualizar progresso de leitura:', err)
  } finally {
    saving.value = false
  }
}

const handlePageChange = (direction: 'prev' | 'next') => {
  if (direction === 'prev' && currentPage.value > 1) {
    currentPage.value--
  } else if (direction === 'next' && currentPage.value < book.value.paginas) {
    currentPage.value++
  }
}

// Watchers for customization persistence
watch(readingTheme, (newTheme) => {
  localStorage.setItem('reader-theme', newTheme)
})

watch(fontSizeClass, (newSize) => {
  localStorage.setItem('reader-font-size', newSize)
})

// Auto-save progress periodically (debounce/watch)
let saveTimeout: any = null
watch(currentPage, () => {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    updateProgress()
  }, 1000) // Sync 1 second after page turns
})

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    handlePageChange('next')
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    handlePageChange('prev')
  } else if (e.key === 'Escape') {
    exitReader()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)
  await fetchBook()
  await fetchProgress()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (saveTimeout) clearTimeout(saveTimeout)
})

const exitReader = () => {
  router.push(`/livro/${book.value.id}`)
}

// Generate premium simulated content based on book title
const getPageContent = (pageNum: number) => {
  const titleLower = book.value.title.toLowerCase()
  
  if (titleLower.includes('harry potter')) {
    const chapters = [
      "Capítulo 1: O Menino que Sobreviveu",
      "Capítulo 2: O Vidro que Sumiu",
      "Capítulo 3: As Cartas de Ninguém",
      "Capítulo 4: O Guardião das Chaves",
      "Capítulo 5: O Beco Diagonal",
      "Capítulo 6: A Viagem da Plataforma Nove e Meia",
      "Capítulo 7: O Chapéu Seletor",
      "Capítulo 8: O Mestre das Poções"
    ]
    const chapterIndex = Math.min(chapters.length - 1, Math.floor((pageNum - 1) / 8))
    const chTitle = chapters[chapterIndex]

    if (pageNum % 2 === 1) {
      return {
        chapter: chTitle,
        text: `O garoto Harry Potter vivia sob o armário das escadas na casa dos Dursley. Para ele, o mundo era cinza, sem graça e hostil. Mas segredos antigos estavam para ser desvendados. \n\nNo dia de seu aniversário de 11 anos, cartas misteriosas começaram a chegar pelo correio, trazidas por corujas de asas silenciosas. Os tios tentaram confiscá-las, trancando as portas e fugindo para um farol isolado no meio do oceano. Mas a magia não conhece barreiras, e o destino de Harry estava prestes a mudar drasticamente com uma batida estrondosa na porta.`
      }
    } else {
      return {
        chapter: chTitle,
        text: `Rúbeo Hagrid, um gigante de barba densa e olhos gentis, entrou segurando um bolo de aniversário amassado. "Você é um bruxo, Harry", ele disse, mudando o rumo da história para sempre. \n\nA partir desse momento, as luzes do Beco Diagonal se abriram: lojas de caldeirões, varinhas mágicas e criaturas aladas. Harry descobriu Hogwarts, a escola de magia, onde encontrou amizade verdadeira em Rony e Hermione. Juntos, eles enfrentariam mistérios soterrados nas profundezas do castelo e o retorno de uma sombra terrível.`
      }
    }
  }

  if (titleLower.includes('duna')) {
    const chapters = [
      "Capítulo 1: Arrakis e os Atreides",
      "Capítulo 2: A Prova do Gom Jabbar",
      "Capítulo 3: Partida para o Planeta Deserto",
      "Capítulo 4: Conspirações na Escuridão",
      "Capítulo 5: Os Fremen e a Especiaria"
    ]
    const chapterIndex = Math.min(chapters.length - 1, Math.floor((pageNum - 1) / 10))
    const chTitle = chapters[chapterIndex]

    if (pageNum % 2 === 1) {
      return {
        chapter: chTitle,
        text: `O planeta Arrakis, também conhecido como Duna, era um vasto deserto de areias escaldantes e perigos mortais. No entanto, era o único lugar no universo conhecido onde a Especiaria — a substância que expande a consciência e viabiliza a viagem espacial — podia ser colhida. \n\nPaul Atreides, o jovem herdeiro da prestigiosa Casa Atreides, olhava fixamente para o horizonte arenoso. A transição de Caladan para Arrakis foi um choque térmico e cultural. A poeira de especiaria brilhava na atmosfera como pequenos pontos de luz dourada sob os sóis implacáveis.`
      }
    } else {
      return {
        chapter: chTitle,
        text: `A Reverenda Madre testou Paul com o Gom Jabbar, a caixa de dor que avaliava se ele era humano ou apenas um animal guiado por instinto. Paul recitou o mantra contra o medo: \n\n"Não devo temer. O medo é o assassino da mente. O medo é a pequena morte que traz a obliteração total. Encararei meu medo. Permitirei que passe por cima e através de mim." \n\nNas profundezas do deserto, os gigantescos vermes de areia patrulhavam o território, e a lenda do Muad'Dib começava a ecoar entre as tribos Fremen.`
      }
    }
  }

  // Generic fallback content
  const chapters = [
    "Capítulo 1: O Começo de Tudo",
    "Capítulo 2: A Jornada Se Inicia",
    "Capítulo 3: Encontros Inesperados",
    "Capítulo 4: Desafios pelo Caminho",
    "Capítulo 5: Revelações e Mistérios",
    "Capítulo 6: O Destino em Jogo",
    "Capítulo 7: A Resolução Final",
    "Capítulo 8: O Epílogo da História"
  ]
  const chapterIndex = Math.min(chapters.length - 1, Math.floor((pageNum - 1) / 12))
  const chTitle = chapters[chapterIndex]

  if (pageNum % 2 === 1) {
    return {
      chapter: chTitle,
      text: `Você abriu as páginas de "${book.value.title}". O autor, ${book.value.author}, convida você para um mergulho profundo nesta narrativa intrigante. \n\nA cada frase, somos transportados para cenários ricos em detalhes, onde o tempo corre de maneira diferente e cada escolha dos personagens reverbera no tecido dos acontecimentos futuros. A escrita expressiva e envolvente cria um ambiente propício para reflexão e entretenimento, aguçando nossa curiosidade sobre o desfecho de cada cena.`
    }
  } else {
    return {
      chapter: chTitle,
      text: `Os capítulos se sucedem revelando nuances complexas da trama de "${book.value.title}". Sentimos o amadurecimento dos temas propostos e a profundidade com que ${book.value.author} conduz a história. \n\nAs luzes mudam, as sombras se alongam e a jornada literária continua guiando nossa imaginação por territórios desconhecidos. Continue lendo e folheando as páginas para completar esta enriquecedora experiência de leitura.`
    }
  }
}
</script>

<template>
  <div 
    class="min-h-screen w-full flex flex-col font-serif select-none transition-colors duration-300 relative overflow-x-hidden"
    :class="{
      'bg-[#FAF8F5] text-[#2C2C2C]': readingTheme === 'light',
      'bg-[#F4ECD8] text-[#3F2F20]': readingTheme === 'sepia',
      'bg-[#121620] text-[#E2E8F0]': readingTheme === 'dark'
    }"
  >
    <!-- Top Control Bar -->
    <transition name="slide-down">
      <div 
        v-if="showControls" 
        class="fixed top-0 left-0 right-0 py-3 px-6 flex items-center justify-between border-b backdrop-blur-md z-40 transition-colors"
        :class="{
          'bg-[#FAF8F5]/90 border-gray-200/80': readingTheme === 'light',
          'bg-[#F4ECD8]/90 border-[#D2B48C]/60': readingTheme === 'sepia',
          'bg-[#121620]/95 border-white/10': readingTheme === 'dark'
        }"
      >
        <button 
          @click="exitReader" 
          class="flex items-center gap-2 font-poppins text-xs font-bold transition hover:opacity-80 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Sair da Leitura
        </button>

        <div class="flex items-center gap-1 font-poppins text-sm font-bold truncate max-w-xs md:max-w-md">
          <span class="opacity-60">{{ book.title }}</span>
          <span class="opacity-40 mx-1.5">•</span>
          <span class="opacity-80 truncate text-xs">{{ book.author }}</span>
        </div>

        <!-- Preferences controls -->
        <div class="flex items-center gap-4">
          <!-- Theme Switcher -->
          <div class="flex bg-black/5 dark:bg-white/5 rounded-lg p-0.5 border border-black/10 dark:border-white/10">
            <button 
              @click="readingTheme = 'light'" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs transition cursor-pointer"
              :class="readingTheme === 'light' ? 'bg-white text-black shadow-xs font-bold' : 'opacity-60'"
            >
              A
            </button>
            <button 
              @click="readingTheme = 'sepia'" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs bg-[#F4ECD8] text-[#3F2F20] transition cursor-pointer font-bold border border-[#D2B48C]"
              :class="readingTheme === 'sepia' ? 'scale-105 shadow-xs' : 'opacity-80'"
            >
              S
            </button>
            <button 
              @click="readingTheme = 'dark'" 
              class="w-6 h-6 rounded-md flex items-center justify-center text-xs bg-[#1A1F2C] text-white transition cursor-pointer font-bold"
              :class="readingTheme === 'dark' ? 'scale-105 shadow-xs border border-white/20' : 'opacity-60'"
            >
              N
            </button>
          </div>

          <!-- Font Sizes -->
          <div class="flex bg-black/5 dark:bg-white/5 rounded-lg p-0.5 border border-black/10 dark:border-white/10 text-xs font-poppins font-bold">
            <button 
              @click="fontSizeClass = 'small'" 
              class="px-2 py-0.5 rounded-md transition cursor-pointer"
              :class="fontSizeClass === 'small' ? 'bg-[#FCAE1E] text-white' : 'opacity-60'"
            >
              A-
            </button>
            <button 
              @click="fontSizeClass = 'medium'" 
              class="px-2 py-0.5 rounded-md transition cursor-pointer"
              :class="fontSizeClass === 'medium' ? 'bg-[#FCAE1E] text-white' : 'opacity-60'"
            >
              A
            </button>
            <button 
              @click="fontSizeClass = 'large'" 
              class="px-2 py-0.5 rounded-md transition cursor-pointer"
              :class="fontSizeClass === 'large' ? 'bg-[#FCAE1E] text-white' : 'opacity-60'"
            >
              A+
            </button>
            <button 
              @click="fontSizeClass = 'xl'" 
              class="px-2 py-0.5 rounded-md transition cursor-pointer"
              :class="fontSizeClass === 'xl' ? 'bg-[#FCAE1E] text-white' : 'opacity-60'"
            >
              A++
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Reading Area -->
    <div 
      class="flex-1 flex flex-col justify-center items-center px-6 md:px-12 py-24 md:py-28 max-w-3xl mx-auto w-full cursor-pointer select-text"
      @click="showControls = !showControls"
    >
      <!-- Loading indicator -->
      <div v-if="loading" class="flex flex-col items-center gap-3">
        <svg class="animate-spin h-8 w-8 text-[#FCAE1E]" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="font-poppins text-xs tracking-wider opacity-60 font-bold uppercase animate-pulse">Carregando e-book...</span>
      </div>

      <!-- Book Page Content -->
      <div v-else class="w-full space-y-8 animate-fade-in">
        <h2 class="text-xs font-poppins font-bold tracking-widest uppercase opacity-55 text-center mb-2">
          {{ getPageContent(currentPage).chapter }}
        </h2>
        
        <div 
          class="leading-relaxed text-justify whitespace-pre-line select-text"
          :class="{
            'text-sm md:text-base': fontSizeClass === 'small',
            'text-base md:text-lg': fontSizeClass === 'medium',
            'text-lg md:text-xl': fontSizeClass === 'large',
            'text-xl md:text-2xl': fontSizeClass === 'xl'
          }"
        >
          {{ getPageContent(currentPage).text }}
        </div>
      </div>
    </div>

    <!-- Bottom Navigation Bar -->
    <div 
      class="fixed bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-between border-t z-30 font-poppins transition-colors select-none"
      :class="{
        'bg-[#FAF8F5] border-gray-200/80': readingTheme === 'light',
        'bg-[#F4ECD8] border-[#D2B48C]/60': readingTheme === 'sepia',
        'bg-[#121620] border-white/10': readingTheme === 'dark'
      }"
    >
      <button 
        @click.stop="handlePageChange('prev')" 
        :disabled="currentPage === 1"
        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition select-none disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Anterior
      </button>

      <div class="text-xs font-bold opacity-60 flex flex-col items-center">
        <span>Página {{ currentPage }} de {{ book.paginas }}</span>
        <span class="text-[10px] opacity-75 mt-0.5">{{ Math.round((currentPage / book.paginas) * 100) }}% concluído</span>
      </div>

      <button 
        @click.stop="handlePageChange('next')" 
        :disabled="currentPage === book.paginas"
        class="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition select-none disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
      >
        Próxima
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Sincronização Indicator -->
    <transition name="fade">
      <div 
        v-if="saving" 
        class="fixed bottom-20 right-6 bg-[#13213C] text-white text-[10px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-md z-40 select-none animate-pulse"
      >
        <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sincronizando progresso...
      </div>
    </transition>

    <!-- Finished Reading Modal -->
    <div v-if="showFinishedModal" class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in font-poppins">
      <div class="bg-white text-[#13213C] rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border border-gray-100">
        <div class="w-20 h-20 bg-[#FFF5CD] rounded-full flex items-center justify-center mx-auto text-4xl shadow-sm">
          🏆
        </div>
        <div class="space-y-2">
          <h2 class="text-2xl font-bold text-[#806602]">Parabéns!</h2>
          <p class="text-sm text-gray-500 font-semibold leading-relaxed">Você concluiu a leitura de <strong>{{ book.title }}</strong>! Este livro foi adicionado à sua lista de lidos.</p>
        </div>
        <button 
          @click="showFinishedModal = false; exitReader()" 
          class="w-full bg-[#13213C] text-white font-bold text-sm py-3.5 px-6 rounded-xl hover:bg-[#13213C]/95 transition cursor-pointer shadow-sm"
        >
          Voltar para Estante
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page Animations */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Control bar transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Fade transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
