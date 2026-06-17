<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close', 'submit'])

const rating = ref(0)
const text = ref('')
const selectedTags = ref<string[]>([])

const availableTags = ['Ficção', 'Fantasia', 'Clássico', 'Suspense', 'Histórico', 'Recomendado']

const hoverRating = ref(0)

const setRating = (val: number) => {
  rating.value = val
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

const submitForm = () => {
  if (rating.value === 0) {
    alert('Por favor, selecione uma nota de avaliação (estrelas).')
    return
  }
  if (!text.value.trim()) {
    alert('Por favor, escreva o texto da sua resenha.')
    return
  }

  emit('submit', {
    rating: rating.value,
    text: text.value,
    tags: [...selectedTags.value]
  })

  
  rating.value = 0
  text.value = ''
  selectedTags.value = []
}
</script>

<template>
  <div class="bg-white p-6 rounded-2xl w-full max-w-lg select-none font-poppins text-[#13213C]">
    
    <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
      <h2 class="text-lg font-bold text-[#806602]">Escrever Resenha</h2>
      <button 
        type="button" 
        @click="emit('close')" 
        class="text-gray-400 hover:text-gray-600 focus:outline-none p-1 hover:bg-gray-50 rounded-lg transition cursor-pointer"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="submitForm" class="space-y-5">
      
      
      <div class="space-y-2">
        <label class="block text-xs font-bold text-[#806602] uppercase tracking-wider">Sua Avaliação*</label>
        <div class="flex items-center gap-1.5">
          <button 
            v-for="star in 5" 
            :key="star"
            type="button"
            @click="setRating(star)"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
            class="text-2xl transition-transform duration-150 hover:scale-110 focus:outline-none cursor-pointer"
            :class="[(hoverRating || rating) >= star ? 'text-amber-500' : 'text-gray-200']"
          >
            
            <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
          <span class="text-xs font-bold text-gray-400 ml-2 select-none" v-if="rating > 0">
            ({{ rating }} de 5 estrelas)
          </span>
        </div>
      </div>

      
      <div class="space-y-2">
        <label for="review-text" class="block text-xs font-bold text-[#806602] uppercase tracking-wider">Texto da Resenha*</label>
        <textarea 
          id="review-text" 
          v-model="text"
          rows="5"
          placeholder="Compartilhe suas impressões detalhadas sobre este livro..."
          required
          class="w-full border border-[#B06E02]/30 rounded-xl px-4 py-3 text-sm text-[#13213C] focus:border-[#806602] focus:ring-1 focus:ring-[#806602] focus:outline-none transition duration-150 bg-gray-50/50 placeholder-gray-400/80 resize-none leading-relaxed"
        ></textarea>
      </div>

      
      <div class="space-y-2">
        <label class="block text-xs font-bold text-[#806602] uppercase tracking-wider">Adicionar Tags</label>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="tag in availableTags" 
            :key="tag"
            type="button"
            @click="toggleTag(tag)"
            class="text-xs font-semibold px-3 py-1.5 rounded-full border transition duration-150 cursor-pointer select-none"
            :class="[selectedTags.includes(tag) 
              ? 'bg-[#B06E02] text-white border-transparent shadow-xs' 
              : 'bg-white text-gray-400 border-gray-200 hover:border-[#B06E02]/30'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      
      <div class="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 mt-6">
        <button 
          type="button" 
          @click="emit('close')"
          class="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 font-semibold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          class="bg-[#13213C] hover:bg-[#13213C]/95 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
        >
          Publicar Resenha
        </button>
      </div>

    </form>
  </div>
</template>

<style scoped>
</style>
