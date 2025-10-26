#  Mini-Projeto Fullstack Parte I/II.v2 — Backend com PostgreSQL

## 🟣 Versão
**Tag de versão:** [v2.0.0](https://github.com/Nathalia1234/backend-express-postgresql/releases/tag/v2.0.0)

Esta versão corresponde à **segunda etapa** do Mini-Projeto Fullstack, na qual o backend foi **migrado de MongoDB para PostgreSQL**, mantendo todas as funcionalidades da versão anterior.

---

## 🟣 Descrição Geral

Este projeto é a **continuação das Partes I e II** do Mini-Projeto Fullstack, com o objetivo de **substituir o banco de dados MongoDB por PostgreSQL**, mantendo toda a estrutura funcional e lógica da API.  

A aplicação backend foi desenvolvida em **Node.js + Express**, com autenticação via **JWT**, e conexão gerenciada com **PostgreSQL** utilizando a biblioteca `pg`.  

Todo o CRUD de usuários e notas foi mantido, assim como os logs, tratamento de erros e as requisições via Insomnia.

---

## 🟣 Ferramentas e serviços utilizados durante o desenvolvimento e testes:

| Ferramenta               | Finalidade                             |
| ------------------------ | -------------------------------------- |
| **Node.js / Express.js** | Criação do servidor e rotas da API     |
| **PostgreSQL**           | Banco de dados relacional              |
| **Neon.tech**            | Hospedagem do banco em nuvem           |
| **pgAdmin 4**            | Gerenciamento local do PostgreSQL      |
| **Vercel**               | Deploy e logs de execução              |
| **Insomnia**             | Testes das rotas HTTP                  |
| **bcryptjs**             | Criptografia de senhas                 |
| **jsonwebtoken**         | Autenticação via JWT                   |
| **dotenv**               | Gerenciamento de variáveis de ambiente |


---

## 🟣 Estrutura de Pastas

Abaixo está a organização dos arquivos e diretórios principais do projeto:

```
backend-express-postgresql/
├── node_modules
├── requests/
│   └── requests.yaml
│
├── src/
│   ├── controllers/
│   │   ├── note.controller.js
│   │   └── user.controller.js
│   │
│   ├── database/
│   │   └── connect.js
│   │
│   ├── middlewares/
│   │   ├── logger.js
│   │   └── verifyToken.js
│   │
│   ├── models/
│   │   ├── note.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── note.routes.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   │   ├── note.service.js
│   │   └── user.service.js
│
├── .env
├── .env.local
├── .gitignore
├── criacao_tabelas.sql
├── notas.sql
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── usuarios.sql
```
> **A estrutura segue o padrão MVC (Model-View-Controller)**, separando lógica de controle, regras de negócio, modelos de dados e rotas.
---
## 🟣 Como Executar Localmente

1. **Clone o repositório**
```bash
   git clone https://github.com/Nathalia1234/backend-express-postgresql
```

2. **Acesse o diretório do projeto**
```bash
cd backend-express-postgresql
```

3. **Instale as dependências**
```bash
npm install
```

4. **Configure o arquivo .env**
```bash
DATABASE_URL= url do banco
JWT_SECRET=chave_jwt
PORT=3000
```

5. **Inicie o servidor**
```bash
npm start
```

6. **Acesse a API**
```bash
http://localhost:3000
```

---

## 🟣 Testes Locais

Durante o desenvolvimento, o backend foi testado localmente utilizando o Insomnia e o PostgreSQL local.

O objetivo foi garantir o funcionamento completo da API antes do deploy em produção.


**Configuração local:**

- Base URL: http://localhost:3000
- Banco de dados: PostgreSQL (local)
- Ferramentas utilizadas: 
    -  Node.js + Express
    - pgAdmin 4
    - Insomnia

---
## 🟣 Funcionalidades testadas localmente

- Conexão com banco local via **pg.Pool**

- Registro e autenticação de usuários

- Criação, listagem, edição e exclusão de notas

- Geração e validação de tokens JWT

-  Proteção de rotas autenticadas

- Mensagens de erro e logs no terminal via Vs Code

- Estrutura MVC implementada corretamente

---
## 🟣 Dados registrados no banco local 

Durante os testes locais, as requisições realizadas via **Insomnia** inseriram corretamente os dados nas tabelas `users` e `notes` do banco **PostgreSQL**, conforme verificado pelo **pgAdmin 4**.

### 🔹Tabela `users` 

A tabela `users` contém os seguintes campos:
- `id` — identificador único do usuário (chave primária);
- `name` — nome do usuário;
- `email` — endereço de e-mail único;
- `password` — senha criptografada com **bcrypt**.

**Exemplo de registros armazenados localmente:**

| id | name             | email               | password (hash) |
|----|------------------|---------------------|------------------|
| 1  | Nathalia Ohana1  | nathalia1@email.com | `$2b$10$7rDf16oMOC...` |
| 2  | André Oliveira3  | andre3@email.com    | `$2b$10$Szm2mgBbSM...` |

---

### 🔹Tabela de  `notes`

A tabela `notes` registra as anotações associadas a cada usuário.  
Os campos principais são:
- `id` — identificador único da nota (chave primária);
- `title` — título da anotação;
- `content` — conteúdo textual da nota;
- `user_id` — referência ao usuário criador da nota (chave estrangeira para `users.id`).

**Exemplo de registros armazenados:**

| id | title                   | content                                              | user_id |
|----|--------------------------|------------------------------------------------------|---------|
| 1  | Seminário de MongoDB     | Esse seminário irá acontecer na quarta-feira        | 2       |
| 2  | Estudo: Primeira nota    | Essa é minha primeira anotação pessoal.             | 2       |

---

> As tabelas `users` e `notes` foram criadas corretamente e possuem relacionamento **1:N** (um usuário pode ter várias notas).  
> As operações de **cadastro, login, criação, listagem e atualização de notas** foram validadas localmente e refletidas no banco via **pgAdmin**.



---
## 🟣 Exemplo de requisições locais

Durante os testes locais, as requisições foram executadas no **Insomnia** utilizando a variável `{{baseUrl_local}}`, apontando para o servidor local em execução (`http://localhost:3000`).


### 🔹 Registro de usuário:

**Endpoint:**  
`POST {{baseUrl_local}}/api/register`

**Primeiro cadastro:**

**Corpo da requisição:**
```json
{
  "name": "Nathalia Ohana1",
  "email": "nathalia1@email.com",
  "password": "123456"
}
```

**Resposta (201 Created):**
```json
{
  "message": "Usuário cadastrado com sucesso!",
  "user": {
    "id": 2,
    "name": "Nathalia Ohana1",
    "email": "nathalia1@email.com"
  }
}
```
---

**Segundo cadastro:**
```json
{
  "name": "André Oliveira3",
  "email": "andre3@email.com",
  "password": "456123"
}
```
**Resposta (201 Created):**
```json
{
  "message": "Usuário cadastrado com sucesso!",
  "user": {
    "id": 3,
    "name": "André Oliveira3",
    "email": "andre3@email.com"
  }
}
```

### 🔹 Login de usuário:

**Endpoint:**  

`POST {{baseUrl_local}}/api/login`

**Corpo da requisição:**
```json
{
  "email": "nathalia1@email.com",
  "password": "123456"
}
```

**Resposta (200 OK):**
```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```
> O token retornado foi utilizado nas próximas requisições como autenticação Bearer Token.

---

### 🔹 Criação de nota:

**Endpoint:**  

`POST {{baseUrl_local}}/api/notes`

**Cabeçalho (Header):**
```
Authorization: Bearer {{token_local}}
```

**Corpo da requisição:**
```json
{
  "title": "Estudo: Primeira nota",
  "content": "Essa é minha primeira anotação pessoal."
}
```
**Resposta (201 Created):**
```json
{
  "id": 3,
  "title": "Estudo: Primeira nota",
  "content": "Essa é minha primeira anotação pessoal.",
  "user_id": 2
}
```
---

### 🔹 Acesso de nota de outro usuário:

**Endpoint:**  

`GET {{baseUrl_local}}/api/notes/:idDaNota_local`

**Cabeçalho (Header):**
```
Authorization: Bearer {{token_local}}
```

**Resposta (403 Forbidden):**
```json
{
  "error": "Acesso negado. Esta nota pertence a outro usuário."
}
```

> Essa requisição valida a regra de segurança que impede que um usuário acesse notas criadas por outro.

---
## 🟣 Testes em Produção

Após o deploy, os testes foram refeitos com o ambiente de produção:  https://backend-express-postgresql-flame.vercel.app/

Banco de dados remoto: **Neon.tech**

Ambiente de hospedagem: **Vercel**

---
## 🟣Funcionalidades testadas em produção

- Registro e login de usuários (Nathalia e Maria)

- Criação, listagem, atualização e exclusão de notas

- Associação correta entre user_id e notas

- Bloqueio de acesso entre usuários diferentes

- Validação de tokens JWT (inválido, expirado, ausente)

- Logs de segurança ativos no painel da Vercel

- Persistência dos dados confirmada no Neon.tech

---
## 🟣 Dados registrados no banco remoto

Após o deploy da API e a configuração do banco de dados remoto **Neon.tech**, as tabelas `users` e `notes` foram consultadas diretamente pelo painel **Database Studio**, confirmando o armazenamento e relacionamento correto dos dados.

---

### 🔹 Tabela `users`

A tabela `users` contém as informações dos usuários cadastrados via API em produção.

**Campos principais:**
- `id` — identificador único (chave primária)
- `name` — nome do usuário
- `email` — e-mail do usuário
- `password` — senha criptografada
- `notes` — relação com as anotações criadas pelo usuário

**Exemplo de registros armazenados no banco remoto:**

| id | name             | email               | password (hash)                    |
|----|------------------|---------------------|------------------------------------|
| 1  | Nathalia Ohana1  | nathalia1@email.com | `$2b$10$qhsgYbgoLbHLDyO6...`       |
| 2  | Maria Souza2     | maria2@email.com    | `$2b$10$eFaFM8RokeVfzsv...`        |

---

### 🔹 Tabela `notes`

A tabela `notes` armazena as anotações criadas pelos usuários autenticados, vinculadas pelo campo `user_id`.

**Campos principais:**
- `id` — identificador da nota (chave primária)
- `title` — título da nota
- `content` — conteúdo textual
- `user_id` — referência ao autor da nota (chave estrangeira para `users.id`)

**Exemplo de registros armazenados no banco remoto:**

| id | title                   | content                                             | user_id |
|----|--------------------------|-----------------------------------------------------|---------|
| 1  | Estudo: Primeira nota    | Essa é minha primeira anotação pessoal.            | 1       |
| 2  | Estudo: Segunda nota     | Essa é minha segunda anotação pessoal.             | 1       |
| 3  | Seminário de MongoDB     | Esse seminário irá acontecer na quarta-feira.      | 1       |

---

>  **A API apresentou o mesmo comportamento do ambiente local**, com dados sendo armazenados, consultados e validados com sucesso no banco remoto **Neon.tech** após o deploy na **Vercel**.


--- 
## 🟣 Logs registrados no Vercel

Durante os testes em produção, os logs disponibilizados no painel da **Vercel** confirmaram o funcionamento completo da API integrada ao banco remoto **Neon.tech**.

Os registros exibiram os eventos de autenticação, criação, leitura, atualização e exclusão de notas, além dos retornos de erro devidamente tratados pelo middleware de validação.

---

### 🔹 Exemplos de logs registrados

| Data e Hora | Status | Endpoint | Mensagem |
|--------------|---------|-----------|-----------|
| **OCT 25, 11:10:24** | `POST 201` | `/api/register` | 🟢 Novo usuário registrado: *nathalia1@email.com* |
| **OCT 25, 11:15:25** | `POST 201` | `/api/register` | 🟢 Novo usuário registrado: *maria2@email.com* |
| **OCT 25, 11:20:19** | `POST 201` | `/api/notes` | 🟢 Usuário 1 criou nota com sucesso (ID: 1) |
| **OCT 25, 11:23:16** | `POST 201` | `/api/notes` | 🟢 Usuário 1 criou nota com sucesso (ID: 2) |
| **OCT 25, 11:26:25** | `POST 201` | `/api/notes` | 🟢 Usuário 1 criou nota com sucesso (ID: 3) |
| **OCT 25, 11:30:03** | `GET 200` | `/api/notes` | 🟢 Usuário 1 listou 3 notas |
| **OCT 25, 11:35:29** | `GET 403` | `/api/notes/2` | 🔒 Usuário 2 tentou acessar nota de outro usuário |
| **OCT 25, 11:40:22** | `POST 401` | `/api/login` | ⚠️ Tentativa de login com senha incorreta |
| **OCT 25, 11:43:37** | `POST 400` | `/api/notes` | 🔴 Tentativa de criar nota com dados incompletos |
| **OCT 25, 11:46:47** | `GET 200` | `/api/profile` | 🟢 Usuário acessou seu perfil com sucesso |

---

> Todas as requisições esperadas foram registradas, incluindo **operações bem-sucedidas e mensagens de erro controladas**.  

--- 

## 🟣 Funcionalidades Implementadas

- ✅ **Cadastro e Login de usuários** com hash de senha e autenticação JWT  
- ✅ **CRUD completo** de anotações
- ✅ **Rotas protegidas por token JWT** (somente o usuário autenticado acessa suas próprias anotações)  
- ✅ **Tratamento de erros e respostas HTTP apropriadas**  
- ✅ **Logs de ações e erros no terminal**  
- ✅ **Utilização de variáveis de ambiente com dotenv**  
- ✅ **Hospedagem funcional (Vercel)**  

---

## 🟣 Rotas da API

### Autenticação

| Método | Rota            | Descrição                          | Autenticação |
|:--:|:--|:--|:--:|
| **POST** | `/api/register` | Registra um novo usuário           |  ❌
| **POST** | `/api/login`    | Realiza o login e gera o token JWT | ❌
| **GET**  | `/api/profile`  | Retorna o perfil do usuário logado | ✅


### Usuário
| Método | Rota | Descrição | Autenticação |
|:--:|:--|:--|:--:|
| **GET**  | `/api/users` | Lista todos os usuários (rota protegida) | ✅


### Notas
| Método | Rota | Descrição | Autenticação |
|:--:|:--|:--|:--:|
| **POST** | `/api/notes` | Cria uma nova nota | ✅ |
| **GET** | `/api/notes` | Lista todas as notas do usuário autenticado | ✅ |
| **GET** | `/api/notes?title=...` | Filtra notas por título | ✅ |
| **GET** | `/api/notes/:id` | Retorna uma nota específica | ✅ |
| **PUT** | `/api/notes/:id` | Atualiza todos os dados de uma nota existente | ✅ |
| **PATCH** | `/api/notes/:id` | Atualiza parcialmente uma nota | ✅ |
| **DELETE** | `/api/notes/:id` | Remove uma nota do usuário autenticado | ✅ |

---

## 🟣 Variáveis de Ambiente (.env)

```env
DATABASE_URL= url do banco
JWT_SECRET= chave_jwt
PORT= 3000
```
Obs.: No ambiente de produção, a variável **DATABASE_URL** foi substituída pela string do banco em nuvem (Neon).

---

## 🟣 Modelagem do Banco de Dados

O gerenciamento do banco de dados em ambiente local foi realizado com o **pgAdmin 4**, permitindo a criação das tabelas, consultas SQL e acompanhamento das inserções durante os testes.

--- 

### 🔹 Estrutura das tabelas criadas

O banco de dados foi modelado com duas tabelas principais: `users` e `notes`.  A tabela `users` armazena os dados dos usuários, enquanto `notes` registra as anotações vinculadas ao campo `user_id`.

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id)
);
```

> **Descrição da modelagem:**
> - A chave primária **(id)** é do tipo SERIAL, garantindo incremento automático.
> - O campo **email** possui a restrição UNIQUE, impedindo cadastros duplicados.
> - O campo **user_id** na tabela notes é uma chave estrangeira, estabelecendo o relacionamento entre o autor e suas anotações.
> - A estrutura foi projetada para garantir integridade referencial, simplicidade e escalabilidade no armazenamento das notas.
---

## 🟣 Testes de Requisição (Insomnia)

Foram criados dois ambientes no **Insomnia** para validação das rotas da API:

- **Local:** `http://localhost:3000`
- **Produção:** https://backend-express-postgresql-flame.vercel.app/

Em ambos os ambientes, foi utilizado o mesmo cabeçalho de autenticação JWT:

```bash
Header:  Authorization: Bearer {{token_local}}
```


A pasta `requests/` contém todas as requisições configuradas no Insomnia, incluindo rotas de **registro, login, criação, atualização, exclusão e listagem** de notas, tanto em ambiente local quanto em produção.

**Estrutura:**
```
requests/
└── requests.yaml
```

O arquivo `requests.yaml` pode ser importado diretamente no Insomnia para reproduzir todos os testes realizados:

- [📄 Download requests.yaml](./requests/requests.yaml)

---

## 🟣 Hospedagem e Acesso

Backend em Produção (Vercel): https://backend-express-postgresql-flame.vercel.app/

Banco de Dados em Produção:  **Neon.tech** (https://neon.tech)

Base URL Local: http://localhost:3000

Backend em Produção no meu domínio pessoal:  https://notes-pg.nathaliaohana.dev/

> A API está hospedada na Vercel e conecta-se a um banco de dados PostgreSQL remoto (Neon.tech).  

> Todas as rotas foram testadas e validadas com sucesso via Insomnia.
---

## 🟣 Deploy (Vercel)

O deploy do backend foi realizado utilizando a plataforma **[Vercel](https://vercel.com/)**, garantindo integração contínua com o repositório GitHub e execução estável da API em ambiente de produção.

### 🔹 Etapas do Deploy

1. **Subir o projeto** para o repositório no GitHub.  
2. **Importar o repositório** no painel da Vercel.  
3. **Selecionar o branch principal (`main`)** para o deploy.  
4. **Definir as variáveis de ambiente** necessárias para o funcionamento da API:

| Variável | Descrição |
|-----------|------------|
| `DATABASE_URL` | String de conexão do banco **Neon.tech** |
| `JWT_SECRET` | Chave secreta utilizada na autenticação JWT |
| `PORT` | Porta padrão do servidor (definida como `3000`) |

### 🔹 Banco de Dados em Produção

Foi utilizado o serviço em nuvem **[Neon.tech](https://neon.tech/)** para armazenamento dos dados em produção.  

A conexão foi estabelecida com sucesso, permitindo a persistência e leitura das informações através do **PostgreSQL remoto**.

### 🔹 Conclusão

Após o deploy:
- A API ficou **acessível publicamente** no domínio Vercel configurado.  
-  Todas as rotas funcionaram corretamente (registro, login, notas).  
-  A integração entre **Vercel** e **Neon.tech** apresentou **tempo de resposta estável** e **execução sem falhas**.

---
## 🌐 Deploy em Produção
- **API com PostgreSQL:** [https://pg-notes.nathaliaohana.dev](https://pg-notes.nathaliaohana.dev)
- **API com MongoDB:** [https://notes.nathaliaohana.dev](https://notes.nathaliaohana.dev)

>  Ambas as versões estão em produção: 
> - **Parte I / v1:** Desenvolvida com **MongoDB**;  
> - **Parte II / v2:** Migrada para **PostgreSQL** (Neon.tech).

As duas mantêm a mesma estrutura de rotas, autenticação JWT e operações CRUD completas, garantindo consistência entre os ambientes de persistência de dados.

Obs.: Cada versão foi hospedada em um **subdomínio próprio**, com integração contínua via **Vercel**.

---

## 🟣 Vídeo de Demonstração

O vídeo da entrega apresenta uma visão prática do funcionamento completo da API, abrangendo:

- **Execução das requisições no Insomnia** — em ambiente **local** e **produção**;  
  
-  **Exibição dos logs** registrados no terminal e no painel da **Vercel**;  

-  **Visualização dos dados** armazenados no **pgAdmin** (banco local) e no **Neon.tech** (banco remoto);  
  
-  **Demonstração das rotas CRUD protegidas por autenticação JWT**.

---

### 🔹Assista ao vídeo de demonstração:


👉 [Clique aqui para assistir no Google Drive](https://drive.google.com/file/d/1wE6-NIC_yLPUUpDWGMzdCQBPAUQ3rlW4/view?usp=sharing)

---