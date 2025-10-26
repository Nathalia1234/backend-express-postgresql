#  Mini-Projeto Fullstack Parte I/II.v2 — Backend com PostgreSQL

## 📦 Versão
**Tag:** [v2.0.0](https://github.com/Nathalia1234/backend-express-postgresql/releases/tag/v2.0.0)


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

![alt text](./src/img/img-0.png)

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

🔹Tabela de **users** e **notes**:

![alt text](/img/img-1.png)

![alt text](/img/img-2.png)



---
## 🟣 Exemplo de requisições locais

🔹 Registro de usuário:

![alt text](/img/img-3.png)

![alt text](/img/img-4.png)

🔹 Login de usuário:

![alt text](/img/img-5.png)

🔹 Criação de nota:

![alt text](/img/img-6.png)

🔹 Acesso de nota de outro usuário:

![alt text](/img/img-7.png)

> Os testes locais confirmaram o correto funcionamento da API antes da migração para o banco remoto Neon.tech e deploy na Vercel.
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

Tabela **users**:
![alt text](/img/img-8.png)


Tabela **notes**:
![alt text](/img/img-9.png)

> A API apresentou o mesmo comportamento do ambiente local, com dados sendo armazenados e consultados com sucesso no banco remoto.
--- 
## 🟣 Logs registrados no Vercel

![alt text](/img/img-10.png)

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

![alt text](/img/img-11.png)

> O gerenciamento do banco de dados em ambiente local foi realizado com o **pgAdmin 4**, permitindo a criação das tabelas, consultas SQL e acompanhamento das inserções durante os testes.

---
## 🟣 Testes de Requisição (Insomnia)

Foram criados dois ambientes no Insomnia:
- **Local:** `http://localhost:3000`
- **Produção:** https://backend-express-postgresql-flame.vercel.app/

Em ambos:

Header:  ```Authorization: Bearer {{token_local}}```


A pasta `requests/` contém todas as requisições (local e produção).

![alt text](/img/img-12.png)

- [📄 Download requests.yaml](./requests/requests.yaml)

---

## 🟣 Hospedagem e Acesso

Backend em Produção (Vercel): https://backend-express-postgresql-flame.vercel.app/

Banco de Dados em Produção:  **Neon.tech** (https://neon.tech)

Base URL Local: http://localhost:3000

Backend em Produção no meu domínio pessoal: 

> A API está hospedada na Vercel e conecta-se a um banco de dados PostgreSQL remoto (Neon.tech).  

> Todas as rotas foram testadas e validadas com sucesso via Insomnia.
---

## 🟣 Deploy (Vercel)
- Subir o projeto para o GitHub

- Importar o repositório na plataforma [Vercel](https://vercel.com/) (garantindo integração direta com o repositório GitHub e execução estável da API em ambiente de produção.)

- Configurar variáveis de ambiente:
    - DATABASE_URL → string do banco Neon
    - JWT_SECRET → chave secreta para JWT
    - PORT → 3000

Obs.: Foi utilizado o banco em nuvem **Neon.tech** para armazenamento de dados em produção.

- Após o deploy, o backend será acessível no vercel.
---
## 🌐 Deploy em Produção
- **API com PostgreSQL:** [https://pg-notes.nathaliaohana.dev](https://pg-notes.nathaliaohana.dev)
- **API com MongoDB:** [https://notes.nathaliaohana.dev](https://notes.nathaliaohana.dev)

>  Ambas as versões estão em produção: a primeira com MongoDB (Parte I/II.v1) e a segunda com PostgreSQL (Parte I/II.v2), mantendo as mesmas rotas, funcionalidades e autenticação JWT.
---

## 🟣 Vídeo de Demonstração

O vídeo da entrega demonstra:

- Execução das requisições no Insomnia (localmente e em produção);

- Exibição dos logs (localmente e em produção);

- Visualização dos dados cadastrados no pgAdmin;

- Rotas CRUD protegidas com JWT.


🔗 [Assista ao vídeo de demonstração](https://drive.google.com/file/d/1wE6-NIC_yLPUUpDWGMzdCQBPAUQ3rlW4/view?usp=sharing)

---