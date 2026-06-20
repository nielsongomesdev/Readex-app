import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Limpa os dados existentes para evitar duplicidade
  await prisma.userBook.deleteMany()
  await prisma.review.deleteMany()
  await prisma.book.deleteMany()

  // Dados de livros padrão correspondentes aos mocks do front-end
  const books = [
    {
      title: 'Atelier of Witch Hat',
      author: 'Kamome Shirahama',
      description: 'Um mangá maravilhoso sobre magia, arte e determinação.',
      coverUrl: '/src/assets/images/atelier_cover.png',
    },
    {
      title: 'O Nome do Vento',
      author: 'Patrick Rothfuss',
      description: 'Kvothe, o lendário mago, herói e músico, narra sua própria história em três dias. De uma infância mágica entre artistas itinerantes ao tempo que passou como estudante pobre numa universidade de magia.',
      coverUrl: '/src/assets/images/o_nome_do_vento_cover.png',
    },
    {
      title: 'Duna',
      author: 'Frank Herbert',
      description: 'A obra-prima da ficção científica de Frank Herbert sobre o planeta desértico Arrakis.',
      coverUrl: '/src/assets/images/duna_cover.png',
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'O clássico romance distópico sobre vigilância governamental e totalitarismo.',
      coverUrl: '/src/assets/images/1984_cover.png',
    },
    {
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      description: 'A clássica história de aventura de Bilbo Bolseiro nas Terras Ermas.',
      coverUrl: '/src/assets/images/o_hobbit_cover.png',
    },
    {
      title: 'Objetos Cortantes',
      author: 'Gillian Flynn',
      description: 'Um thriller psicológico sombrio da autora de Garota Exemplar.',
      coverUrl: '/src/assets/images/objetos_cortantes_cover.png',
    },
    {
      title: 'Sapiens',
      author: 'Y.N. Harari',
      description: 'Uma breve história da humanidade, desde os primeiros hominídeos até o presente.',
      coverUrl: '/src/assets/images/sapiens_cover.png',
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Um guia prático para criar bons hábitos e quebrar os ruins.',
      coverUrl: '/src/assets/images/atomic_habits_cover.png',
    },
    {
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      description: 'A jornada de Santiago em busca de sua Lenda Pessoal.',
      coverUrl: '/src/assets/images/o_alquimista_cover.png',
    }
  ]

  for (const book of books) {
    const createdBook = await prisma.book.create({
      data: book
    })
    console.log(`Livro criado: ${createdBook.title} (${createdBook.id})`)
  }

  console.log('Seed do banco de dados concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
