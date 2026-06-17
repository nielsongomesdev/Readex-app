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

## 🔧 Como usar o Supabase (Postgres) com o projeto

1. Crie um projeto no Supabase (https://app.supabase.com) e anote a connection string Postgres (ex: `postgresql://postgres:<PASSWORD>@db.<REF>.supabase.co:5432/postgres?sslmode=require`).
2. No diretório `back-end/`, crie um arquivo `.env` copiando `back-end/.env.example` e cole a `DATABASE_URL` fornecida pelo Supabase.
3. Instale dependências e gere o cliente Prisma:

```bash
cd back-end
npm install
npx prisma generate
```

4. Execute as migrações no banco Supabase (aplique suas migrations existentes):

```bash
# Se já tiver migrations prontos
npx prisma migrate deploy

# Ou para criar a primeira migration localmente e aplicar
npx prisma migrate dev --name init
```

5. Inicie a aplicação back-end:

```bash
npm run dev
```

6. No front-end, configure `front-end/.env.local` com `VITE_API_URL` apontando para a API (ex: `http://localhost:3333`) ou para o host onde o back será deployado.

7. (Opcional) Se quiser usar Supabase diretamente no front-end para features como Storage/Realtime, adicione `SUPABASE_URL` e `SUPABASE_ANON_KEY` em `front-end/.env.local`.

Observações:
- Não compartilhe `DATABASE_URL` ou chaves privadas em repositórios públicos.
- O Supabase exige SSL; a connection string acima já inclui `sslmode=require`.
- Caso precise de ajuda aplicando as migrations no Supabase, posso gerar instruções e executar comandos locais, mas preciso da `DATABASE_URL` válida (não compartilhe publicamente — cole aqui se quer que eu rode os comandos no seu ambiente). 
