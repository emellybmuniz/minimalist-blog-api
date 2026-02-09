# Minimalist Blog API

![GitHub License](https://img.shields.io/github/license/emellybmuniz/minimalist-blog)
![GitHub language count](https://img.shields.io/github/languages/count/emellybmuniz/minimalist-blog)
![GitHub last commit](https://img.shields.io/github/last-commit/emellybmuniz/minimalist-blog)
![GitHub repo size](https://img.shields.io/github/repo-size/emellybmuniz/minimalist-blog)
![Project Status](https://img.shields.io/badge/Status%20-%20Finalizado%20-%20%234BC21E)
![GitHub Stars](https://img.shields.io/github/stars/emellybmuniz/minimalist-blog?style=social)

## API Backend para um blog minimalista, desenvolvida para gerenciar autores, publicações e categorias com persistência robusta em banco de dados relacional PostgreSQL.

### 📋 Índice

- [Visão Geral do Projeto](#-visão-geral-do-projeto)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Destaques & Funcionalidades](#-destaques--funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração do .env e Banco](#-configuração-do-env-e-banco)
- [Deploy no Render](#-deploy-no-render)
- [API/Funcionalidades Avançadas](#-apifuncionalidades-avançadas)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Autora](#-autora)

---

## 🚀 Visão Geral do Projeto

Este projeto consiste em uma API RESTful construída com Node.js e TypeScript, utilizando TypeORM para orquestrar a interação com um banco de dados PostgreSQL.

O objetivo principal é demonstrar a implementação de relacionamentos complexos (One-to-Many, Many-to-Many) e boas práticas de arquitetura em camadas (Service/Controller), permitindo a criação de autores, postagens de artigos e categorização de conteúdo de forma eficiente e escalável.

## 📂 Estrutura de Diretórios

```bash
📦 minimalist-blog/
├── src/
│   ├── controllers/       # Camada de controle (HTTP)
│   ├── entity/            # Definição das tabelas (User, Post, Category)
│   ├── migration/         # Migrações do banco de dados
│   ├── services/          # Lógica de negócio
│   ├── routes/            # Definição das rotas da API
│   ├── data-source.ts     # Configuração do banco de dados
│   └── index.ts           # Ponto de entrada da aplicação
├── package.json           # Dependências do projeto
├── tsconfig.json          # Configuração do TypeScript
├── LICENSE                # Licença do projeto
└── README.md              # Este arquivo
```

## ✨ Destaques & Funcionalidades

### 🎯 **Gestão de Conteúdo (CRUD)**

- Criação e gerenciamento de Autores (Users) e Artigos (Posts).
- Sistema de publicação (rascunho vs publicado).
- Utilização do TypeORM para abstração do SQL.

### 🔗 **Relacionamentos Avançados**

- **Um-para-Muitos:** Um autor pode ter vários posts.
- **Muitos-para-Muitos:** Posts podem ter várias categorias e vice-versa.
- Recuperação de dados aninhados (Eager Loading) para trazer autores junto com seus posts.

### 🔍 **Busca e Filtragem**

- Filtragem de posts por palavras-chave no título.
- Ordenação cronológica (mais recentes primeiro).
- Consultas otimizadas para performance.

### ✅ **Arquitetura e Qualidade**

- **Data Mapper Pattern:** Separação clara entre entidades e lógica de persistência.
- **TypeScript:** Tipagem estática para maior segurança e manutenibilidade.
- **Express:** Servidor web rápido e minimalista.

## ️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-%23FE0604.svg?style=for-the-badge&logo=typeorm&logoColor=white)

### Detalhes Técnicos:

- **TypeORM**: ORM utilizado para mapeamento objeto-relacional e migrações.
- **PostgreSQL**: Banco de dados relacional robusto para persistência.
- **Express**: Framework para criação das rotas e middleware da API.

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (v18 ou superior)
- **npm** (Gerenciador de pacotes)
- **PostgreSQL** (Banco de Dados)
- **pgAdmin 4** (opcional, para visualizar o banco)

## 📦 Instalação

```bash
# 1. Clone este repositório
$ git clone https://github.com/emellybmuniz/minimalist-blog-api.git
# 2. Navegue até o diretório do projeto
$ cd minimalist-blog-api
# 3. Instale as dependências
$ npm install
# 4. Inicie o servidor
$ npm run dev
```

**Veja a Documentação da API**: http://localhost:3000/api-docs

## 🧩 Configuração do .env e Banco

Crie um arquivo `.env` com base no `.env.example`.

```bash
$ cp .env.example .env
```

Se você já tiver uma string de conexão completa (Render/Neon/Supabase), basta preencher:

- `DATABASE_URL` (ex: `postgres://user:pass@host:5432/db`)

Caso prefira as variáveis separadas, use:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

Depois, crie o banco relacional no PostgreSQL com o nome definido em `DB_NAME`.
Se estiver usando pgAdmin, basta criar um novo banco com o nome desejado.

Se utilizar migrações:

```bash
$ npm run migration:run
```

## ☁️ Deploy no Render

1. Crie uma conta no Render.com.
2. Clique em **New +** e selecione **Web Service**.
3. Conecte seu repositório do GitHub.

**Build Command**:

```
npm install && npm run build
```

**Start Command**:

```
npm start
```

**Environment Variables**:

- `NODE_ENV=production`
- `DATABASE_URL=<sua_string_de_conexao>`

### Sobre o banco de dados

- **Render PostgreSQL**: muito prático, porém o plano gratuito expira em 90 dias.
- **Neon/Supabase**: alternativas gratuitas que não expiram; indicadas para portfólio.

Depois do deploy, seu Swagger ficará disponível em:

```
https://seu-app.onrender.com/api-docs
```

## 🔌 API/Funcionalidades Avançadas

### Endpoints Disponíveis:

| Método | Endpoint          | Descrição                         | Parâmetros                |
| ------ | ----------------- | --------------------------------- | ------------------------- |
| GET    | `/api/users`      | Lista todos os usuários           | -                         |
| POST   | `/api/users`      | Cria um novo usuário              | `{ name, email }`         |
| GET    | `/api/posts`      | Lista posts (com filtro opcional) | `?title=algo`             |
| POST   | `/api/posts`      | Cria um novo post                 | `{ title, body, userId }` |
| GET    | `/api/categories` | Lista todas as categorias         | -                         |
| POST   | `/api/categories` | Cria uma nova categoria           | `{ name }`                |

## 🤝 Contribuição

Contribuições são sempre bem-vindas e **muito apreciadas!** Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

### Como contribuir:

1. **Fork** este repositório
2. **Clone** seu fork
3. **Crie uma branch** para sua feature: `git checkout -b feature/nova-funcionalidade`
4. **Faça suas alterações** e teste completamente
5. **Commit** suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
6. **Push** para a branch: `git push origin feature/nova-funcionalidade`
7. **Abra um Pull Request** com descrição detalhada das mudanças

## 🔑 Licença

Este projeto está licenciado sob a **Licença MIT** - consulte o arquivo LICENSE para obter mais detalhes.

## ✍️ Autora

Desenvolvido por **Emelly Beatriz** com ❤️

📬 Entre em contato:

📧 emellybmuniz@gmail.com |
💼 [Linkedin](https://www.linkedin.com/in/emellybmuniz) |
🐙 [Github](https://github.com/emellybmuniz)

---

⭐ **Gostou do projeto?** Deixe uma estrela no repositório para apoiar o desenvolvimento!

**#NodeJS #TypeORM #PostgreSQL #TypeScript #API**
