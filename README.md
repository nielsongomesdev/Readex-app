# 📚 Readex-app

## 🎯 Tema do Projeto
O **Readex-app** é uma plataforma web voltada para amantes da leitura. O objetivo principal é permitir que os usuários explorem um catálogo de livros, visualizem detalhes e acompanhem resenhas. O sistema utilizará a arquitetura de Monorepo e o padrão em camadas (Layered Architecture) no back-end.

## 👥 Integrantes da Equipe
Nielson e Anderson

## 🛠 Tecnologias Escolhidas
**Front-end:** Vue.js 3 (Vite), Vue Router, Tailwind CSS.
**Back-end:** Node.js (TypeScript), Fastify, Prisma ORM, PostgreSQL.
**Deploy:** Vercel (Front) e Render (Back).


## 🗄 Modelagem de Dados
1. **User:** id, nome, email, senha.
2. **Book:** id, titulo, autor, descricao.
3. **Review:** id, nota, comentario, usuarioId (FK), livroId (FK).

## 🔌 Endpoints da API REST (Base)
* `GET /api/books` - Lista livros.
* `GET /api/books/:id` - Detalhes do livro.
* `POST /api/books` - Cria livro.
* `PUT /api/books/:id` - Atualiza livro.
* `DELETE /api/books/:id` - Remove livro.