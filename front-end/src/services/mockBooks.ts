import atelierCover from '../assets/images/atelier_cover.png'
import nomeVentoCover from '../assets/images/o_nome_do_vento_cover.png'
import dunaCover from '../assets/images/duna_cover.png'
import orwellCover from '../assets/images/1984_cover.png'
import hobbitCover from '../assets/images/o_hobbit_cover.png'
import objetosCover from '../assets/images/objetos_cortantes_cover.png'
import sapiensCover from '../assets/images/sapiens_cover.png'
import atomicCover from '../assets/images/atomic_habits_cover.png'
import alquimistaCover from '../assets/images/o_alquimista_cover.png'

export interface MockBook {
  id: string
  title: string
  author: string
  rating: number
  reviewsCount: string
  pages: number
  genre: string
  cover: string
  editora: string
  ano: number
  synopsis: string
  tags: string[]
}

export const MOCK_BOOKS: MockBook[] = [
  {
    id: 'oN-ODwAAQBAJ',
    title: 'Atelier of Witch Hat',
    author: 'Kamome Shirahama',
    rating: 4.8,
    reviewsCount: '850',
    pages: 208,
    genre: 'Fantasia',
    cover: atelierCover,
    editora: 'Panini',
    ano: 2016,
    synopsis: 'Coco, uma menina que vive em um pequeno vilarejo, sempre sonhou em se tornar uma bruxa. No entanto, apenas aqueles que nasceram com o dom da magia podem praticá-la, e a entrada para esse mundo é rigorosamente guardada pela Ordem dos Bruxos. Um dia, o misterioso mago Qifrey visita o vilarejo e Coco descobre o segredo de como a magia é desenhada, mudando seu destino para sempre.',
    tags: ['Fantasia', 'Magia', 'Mangá']
  },
  {
    id: 'L_SjAgAAQBAJ',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    rating: 4.9,
    reviewsCount: '4.2k',
    pages: 656,
    genre: 'Fantasia',
    cover: nomeVentoCover,
    editora: 'Arqueiro',
    ano: 2007,
    synopsis: 'Ninguém sabe o que aconteceu com Kvothe, o mago mais famoso que o mundo já conheceu. Mas agora, sob o nome de Kote, ele vive disfarçado como dono de uma hospedagem no meio do nada. Até que um cronista o encontra e o convence a revelar a verdade por trás de suas próprias lendas e feitos heróicos ou terríveis.',
    tags: ['Fantasia', 'Épico', 'Magia']
  },
  {
    id: 'oT9-DwAAQBAJ',
    title: 'Duna',
    author: 'Frank Herbert',
    rating: 4.8,
    reviewsCount: '3.1k',
    pages: 688,
    genre: 'Ficção Científica',
    cover: dunaCover,
    editora: 'Aleph',
    ano: 1965,
    synopsis: 'Uma das maiores obras de ficção científica de todos os tempos, Duna conta a história de Paul Atreides, um jovem herdeiro de uma família nobre encarregada de governar o árido planeta Arrakis, a única fonte da substância mais valiosa do universo, a "especiaria". Entre intrigas políticas, religião e ecologia, Paul precisa sobreviver no deserto hostil e guiar uma revolução.',
    tags: ['Ficção Científica', 'Épico', 'Clássico']
  },
  {
    id: '1N8zEAAAQBAJ',
    title: '1984',
    author: 'George Orwell',
    rating: 4.7,
    reviewsCount: '5.6k',
    pages: 416,
    genre: 'Clássicos',
    cover: orwellCover,
    editora: 'Companhia das Letras',
    ano: 1949,
    synopsis: 'Winston Smith vive sob a constante vigilância do Grande Irmão em um regime totalitário onde a verdade é moldada pelo Partido e qualquer pensamento independente é considerado um crime de pensamento. Ao se apaixonar por Julia, ele resolve se rebelar contra a opressão sufocante.',
    tags: ['Clássicos', 'Distopia', 'Ficção Científica']
  },
  {
    id: '0s1u9iT788AC',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    rating: 4.8,
    reviewsCount: '2.9k',
    pages: 328,
    genre: 'Fantasia',
    cover: hobbitCover,
    editora: 'HarperCollins',
    ano: 1937,
    synopsis: 'Bilbo Bolseiro era um hobbit de vida pacata e confortável até o dia em que o mago Gandalf e uma comitiva de treze anões batem à sua porta, convidando-o para uma jornada cheia de perigos em busca de um tesouro roubado pelo temível dragão Smaug.',
    tags: ['Fantasia', 'Aventura', 'Clássico']
  },
  {
    id: 'qjZPAAAAMAAJ',
    title: 'Objetos Cortantes',
    author: 'Gillian Flynn',
    rating: 4.4,
    reviewsCount: '1.8k',
    pages: 256,
    genre: 'Terror',
    cover: objetosCover,
    editora: 'Intrínseca',
    ano: 2006,
    synopsis: 'Camille Preaker, uma jornalista recém-saída de uma breve internação psiquiátrica, é enviada de volta à sua cidade natal para cobrir o brutal assassinato de uma menina e o desaparecimento de outra. Na casa de sua infância, Camille é forçada a confrontar a mãe controladora e hipocondríaca e uma meia-irmã misteriosa, reabrindo velhas feridas psicológicas.',
    tags: ['Terror', 'Mistério', 'Suspense']
  },
  {
    id: 'w9P3BAAAQBAJ',
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    rating: 4.8,
    reviewsCount: '6.7k',
    pages: 464,
    genre: 'Não-ficção',
    cover: sapiensCover,
    editora: 'L&PM Editores',
    ano: 2011,
    synopsis: 'Yuval Noah Harari aborda a história da humanidade sob uma perspectiva evolutiva, explorando como a nossa espécie conseguiu se destacar e moldar o planeta Terra por meio de revoluções cognitivas, agrícolas e científicas.',
    tags: ['Não-ficção', 'História', 'Antropologia']
  },
  {
    id: 'W1_LDQAAQBAJ',
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    rating: 4.8,
    reviewsCount: '8.1k',
    pages: 320,
    genre: 'Não-ficção',
    cover: atomicCover,
    editora: 'Alta Life',
    ano: 2018,
    synopsis: 'Um guia prático para mudar seus hábitos e obter resultados extraordinários. James Clear explica as regras fundamentais baseadas na psicologia para criar bons hábitos e quebrar os ruins de forma progressiva e sustentável.',
    tags: ['Não-ficção', 'Desenvolvimento Pessoal', 'Produtividade']
  },
  {
    id: 'o3v8AgAAQBAJ',
    title: 'O Alquimista',
    author: 'Paulo Coelho',
    rating: 4.5,
    reviewsCount: '3.4k',
    pages: 206,
    genre: 'Romance',
    cover: alquimistaCover,
    editora: 'Paralela',
    ano: 1988,
    synopsis: 'A jornada de Santiago, um jovem pastor espanhol que viaja ao deserto do Egito em busca de um tesouro escondido, descobrindo o valor de ouvir o próprio coração e de seguir sua Lenda Pessoal.',
    tags: ['Romance', 'Aventura', 'Espiritualidade']
  },
  {
    id: 'i48xDQAAQBAJ',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    rating: 4.9,
    reviewsCount: '15k',
    pages: 264,
    genre: 'Fantasia',
    cover: 'https://covers.openlibrary.org/b/isbn/9788532511010-L.jpg',
    editora: 'Rocco',
    ano: 1997,
    synopsis: 'Harry Potter é um garoto órfão que vive infeliz com seus tios Dursley até descobrir, no seu aniversário de onze anos, que é um bruxo e foi convidado a ingressar na Escola de Magia e Bruxaria de Hogwarts.',
    tags: ['Fantasia', 'Magia', 'Clássico']
  },
  {
    id: 'bJg0DwAAQBAJ',
    title: 'Harry Potter e a Câmara Secreta',
    author: 'J.K. Rowling',
    rating: 4.8,
    reviewsCount: '12k',
    pages: 288,
    genre: 'Fantasia',
    cover: 'https://covers.openlibrary.org/b/isbn/9788532511669-L.jpg',
    editora: 'Rocco',
    ano: 1998,
    synopsis: 'No seu segundo ano em Hogwarts, Harry Potter e seus amigos enfrentam uma ameaça misteriosa: uma antiga câmara secreta foi aberta, libertando um monstro que petrifica os alunos e ameaça fechar a escola.',
    tags: ['Fantasia', 'Magia', 'Mistério']
  },
  {
    id: 'y_ZCDwAAQBAJ',
    title: 'Harry Potter e o Prisioneiro de Azkaban',
    author: 'J.K. Rowling',
    rating: 4.9,
    reviewsCount: '14k',
    pages: 348,
    genre: 'Fantasia',
    cover: 'https://covers.openlibrary.org/b/isbn/9788532512062-L.jpg',
    editora: 'Rocco',
    ano: 1999,
    synopsis: 'Harry Potter retorna a Hogwarts para o seu terceiro ano letivo e descobre que o perigoso prisioneiro Sirius Black escapou da prisão de segurança máxima de Azkaban e está no seu encalço.',
    tags: ['Fantasia', 'Magia', 'Aventura']
  },
  {
    id: 'pequeno_principe',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    rating: 4.9,
    reviewsCount: '25k',
    pages: 96,
    genre: 'Clássicos',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81794b-X8tL.jpg',
    editora: 'HarperCollins',
    ano: 1943,
    synopsis: 'Uma das obras mais lidas do mundo, conta a história de um piloto de avião que cai no deserto do Saara e lá encontra um jovem príncipe vindo de um asteroide distante, com quem aprende valiosas lições sobre a vida, o amor e a amizade.',
    tags: ['Clássicos', 'Fábula', 'Filosofia', 'Fantasia']
  },
  {
    id: 'culpa_estrelas',
    title: 'A Culpa é das Estrelas',
    author: 'John Green',
    rating: 4.7,
    reviewsCount: '18k',
    pages: 288,
    genre: 'Romance',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81Mbg6iW2OL.jpg',
    editora: 'Intrínseca',
    ano: 2012,
    synopsis: 'Hazel Grace é uma paciente terminal que descobre um novo sentido na vida quando conhece Augustus Waters no grupo de apoio para jovens com câncer. Juntos, eles compartilham uma história intensa e comovente sobre a vida, o amor e a fragilidade humana.',
    tags: ['Romance', 'Drama', 'Jovem Adulto']
  },
  {
    id: 'dom_casmurro',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    rating: 4.8,
    reviewsCount: '8k',
    pages: 256,
    genre: 'Clássicos',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81v5P5vOqyL.jpg',
    editora: 'Carambaia',
    ano: 1899,
    synopsis: 'O clássico romance brasileiro narrado em primeira pessoa por Bento Santiago (Bentinho), que relata sua obsessão e ciúme doentio pela enigmática Capitu, questionando se ela o traiu com seu melhor amigo Escobar.',
    tags: ['Clássicos', 'Romance', 'Realismo']
  },
  {
    id: 'iluminado',
    title: 'O Iluminado',
    author: 'Stephen King',
    rating: 4.8,
    reviewsCount: '9k',
    pages: 464,
    genre: 'Terror',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81x1hLecV8L.jpg',
    editora: 'Suma',
    ano: 1977,
    synopsis: 'Jack Torrance consegue um emprego como zelador de inverno no isolado hotel Overlook, para onde se muda com sua esposa e seu jovem filho Danny, que possui poderes telepáticos. Isolados pela neve, forças sombrias começam a influenciar a mente de Jack.',
    tags: ['Terror', 'Suspense', 'Clássico']
  },
  {
    id: 'dracula',
    title: 'Drácula',
    author: 'Bram Stoker',
    rating: 4.7,
    reviewsCount: '6k',
    pages: 480,
    genre: 'Terror',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/818f92+oVvL.jpg',
    editora: 'Darkside',
    ano: 1897,
    synopsis: 'O clássico romance epistolar de Bram Stoker que introduziu o conde vampiro mais famoso da história. Acompanhamos a jornada de Jonathan Harker, Van Helsing e seus aliados para deter o conde Drácula em sua tentativa de espalhar a maldição na Inglaterra.',
    tags: ['Terror', 'Gótico', 'Clássicos']
  },
  {
    id: 'frankenstein',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    rating: 4.8,
    reviewsCount: '7k',
    pages: 240,
    genre: 'Terror',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81-y6-5pVOL.jpg',
    editora: 'Darkside',
    ano: 1818,
    synopsis: 'A pioneira obra de Mary Shelley sobre Victor Frankenstein, um cientista brilhante mas obcecado que dá vida a uma criatura construída a partir de restos humanos, desencadeando tragédia e questionamentos éticos profundos.',
    tags: ['Terror', 'Ficção Científica', 'Clássicos']
  }
]

export const getMockBooks = (query: string): MockBook[] => {
  const q = query.toLowerCase().trim()
  if (!q) return []

  // Check specific queries
  if (q.includes('harry') || q.includes('potter')) {
    return MOCK_BOOKS.filter(b => ['i48xDQAAQBAJ', 'bJg0DwAAQBAJ', 'y_ZCDwAAQBAJ'].includes(b.id))
  }
  if (q.includes('duna') || q.includes('dune')) {
    return MOCK_BOOKS.filter(b => b.id === 'oT9-DwAAQBAJ')
  }
  if (q.includes('alquimista')) {
    return MOCK_BOOKS.filter(b => b.id === 'o3v8AgAAQBAJ')
  }
  if (q.includes('vento') || q.includes('patrick') || q.includes('rothfuss')) {
    return MOCK_BOOKS.filter(b => b.id === 'L_SjAgAAQBAJ')
  }
  if (q.includes('1984') || q.includes('orwell')) {
    return MOCK_BOOKS.filter(b => b.id === '1N8zEAAAQBAJ')
  }
  if (q.includes('hobbit') || q.includes('tolkien')) {
    return MOCK_BOOKS.filter(b => b.id === '0s1u9iT788AC')
  }
  if (q.includes('objetos') || q.includes('cortantes') || q.includes('flynn')) {
    return MOCK_BOOKS.filter(b => b.id === 'qjZPAAAAMAAJ')
  }
  if (q.includes('sapiens') || q.includes('harari')) {
    return MOCK_BOOKS.filter(b => b.id === 'w9P3BAAAQBAJ')
  }
  if (q.includes('habits') || q.includes('habitos') || q.includes('clear')) {
    return MOCK_BOOKS.filter(b => b.id === 'W1_LDQAAQBAJ')
  }
  if (q.includes('pequeno') || q.includes('principe') || q.includes('exupéry')) {
    return MOCK_BOOKS.filter(b => b.id === 'pequeno_principe')
  }
  if (q.includes('culpa') || q.includes('estrelas') || q.includes('green')) {
    return MOCK_BOOKS.filter(b => b.id === 'culpa_estrelas')
  }
  if (q.includes('casmurro') || q.includes('machado') || q.includes('assis')) {
    return MOCK_BOOKS.filter(b => b.id === 'dom_casmurro')
  }
  if (q.includes('iluminado') || q.includes('king')) {
    return MOCK_BOOKS.filter(b => b.id === 'iluminado')
  }
  if (q.includes('dracula') || q.includes('stoker')) {
    return MOCK_BOOKS.filter(b => b.id === 'dracula')
  }
  if (q.includes('frankenstein') || q.includes('shelley')) {
    return MOCK_BOOKS.filter(b => b.id === 'frankenstein')
  }

  // Genre/Category matches (matching accurately in lower case)
  const normalizedGenre = q.replace('-', ' ')
  if (normalizedGenre === 'ficcao cientifica' || normalizedGenre === 'ficção científica' || normalizedGenre === 'scifi' || normalizedGenre === 'ficção') {
    return MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes('ficção científica') || b.id === 'oT9-DwAAQBAJ' || b.id === '1N8zEAAAQBAJ')
  }
  if (normalizedGenre === 'fantasia' || normalizedGenre === 'fantasy') {
    return MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes('fantasia') || ['i48xDQAAQBAJ', 'bJg0DwAAQBAJ', 'y_ZCDwAAQBAJ', 'pequeno_principe'].includes(b.id))
  }
  if (normalizedGenre === 'nao ficcao' || normalizedGenre === 'não ficção' || normalizedGenre === 'não-ficção' || normalizedGenre === 'nonfiction') {
    return MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes('não-ficção') || b.id === 'w9P3BAAAQBAJ' || b.id === 'W1_LDQAAQBAJ')
  }
  if (normalizedGenre === 'romance') {
    return MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes('romance') || ['o3v8AgAAQBAJ', 'culpa_estrelas', 'dom_casmurro'].includes(b.id))
  }
  if (normalizedGenre === 'terror') {
    return MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes('terror') || ['qjZPAAAAMAAJ', 'iluminado', 'dracula', 'frankenstein'].includes(b.id))
  }
  if (normalizedGenre === 'classicos' || normalizedGenre === 'clássicos' || normalizedGenre === 'classics') {
    return MOCK_BOOKS.filter(b => b.genre.toLowerCase().includes('clássicos') || ['1N8zEAAAQBAJ', '0s1u9iT788AC', 'pequeno_principe', 'dom_casmurro', 'dracula', 'frankenstein'].includes(b.id))
  }

  // Fallback: search within title, author or description
  const results = MOCK_BOOKS.filter(
    b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.synopsis.toLowerCase().includes(q)
  )

  if (results.length > 0) return results

  // Global default fallback when no results match, so that the search never feels broken
  return MOCK_BOOKS.slice(0, 5)
}

export const getMockBookDetails = (id: string): MockBook => {
  // Support legacy offline IDs
  let targetId = id
  if (id === 'harry_potter_1') targetId = 'i48xDQAAQBAJ'
  else if (id === 'harry_potter_2') targetId = 'bJg0DwAAQBAJ'
  else if (id === 'harry_potter_3') targetId = 'y_ZCDwAAQBAJ'

  const book = MOCK_BOOKS.find(b => b.id === targetId)
  if (book) return book

  // Dynamic fallback for any other ID, using Duna as template with unique ID
  return {
    id: id,
    title: 'Livro Desconhecido (Offline)',
    author: 'Autor Desconhecido',
    rating: 4.5,
    reviewsCount: '100',
    pages: 250,
    genre: 'Geral',
    cover: '',
    editora: 'Editora Offline',
    ano: 2026,
    synopsis: 'Este livro foi carregado no modo offline devido a limitações de conexão ou requisições na API do Google Books. Você ainda pode adicioná-lo à sua estante, marcar o progresso de leitura e escrever resenhas normalmente.',
    tags: ['Offline', 'Geral']
  }
}
