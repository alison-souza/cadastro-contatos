# 📇 Gerenciador de Contatos

Um sistema completo de gerenciamento de contatos (CRUD) com interface web e servidor Node.js. O projeto permite cadastrar, listar, editar e excluir contatos, mantendo os dados persistidos em um arquivo JSON local.

---

## 🚀 Funcionalidades

- **CRUD Completo:** Adição, leitura, atualização e exclusão de contatos.
- **📥 Exportação de Dados:** Permite **baixar a lista de contatos** diretamente para o formato Excel (.xls) com apenas um clique.
- **Persistência Local:** Utiliza o sistema de arquivos do Node (`fs`) para salvar dados em um arquivo `contatos.json`.
- **Interface Dark Mode:** Design moderno e responsivo focado em usabilidade.
- **Contador em Tempo Real:** Exibição dinâmica da quantidade de contatos cadastrados.

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- HTML5, CSS3 (Custom Properties e Flexbox)
- JavaScript Vanilla (Fetch API e Manipulação de DOM)

### **Backend**

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [Path](https://nodejs.org/api/path.html)

## 📁 Estrutura de Pastas

```text
cadastro-contatos/
├── backend/
│   ├── index.js           # Servidor Express e rotas da API
│   ├── contatos.json      # Arquivo de persistência (DB)
│   └── package.json       # Dependências e scripts
├── frontend/
│   ├── index.html         # Estrutura principal
│   ├── script.js          # Consumo da API e lógica de UI
│   └── style.css          # Estilização (Dark Mode)
└── icons/
    └── favicon.png        # Ícone da aplicação
```

## 🔧 Como Executar o Projeto

Siga os passos abaixo para configurar o ambiente e rodar a aplicação em sua máquina local.

### 📋 Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- Um gerenciador de pacotes (NPM já vem instalado com o Node)

---

### 1️⃣ Configuração do Backend (Servidor)

O backend é responsável por gerenciar os dados e servir a API.

1.  Abra o terminal e navegue até a pasta do backend:
    ```bash
    cd backend
    ```
2.  Instale as dependências necessárias:
    ```bash
    npm install
    ```
3.  Inicie o servidor:
    ```bash
    node index.js
    ```
4.  Você verá a mensagem: `Servidor rodando na porta 3000`.

---

### 2️⃣ Configuração do Frontend (Interface)

O frontend é a interface visual onde você gerencia os contatos.

1.  Com o servidor ainda rodando, abra uma nova janela no seu gerenciador de arquivos.
2.  Navegue até a pasta `frontend`.
3.  Abra o arquivo `index.html` em qualquer navegador (Chrome, Edge, Firefox).

> **Dica:** Se você usa o VS Code, pode clicar com o botão direito no `index.html` e selecionar **"Open with Live Server"** para uma experiência melhor.

---

### 3️⃣ Testando as Funcionalidades

Com tudo conectado, você poderá:

1.  **Cadastrar:** Preencha o formulário e clique em "Adicionar".
2.  **Visualizar:** O novo contato aparecerá na tabela abaixo imediatamente.
3.  **Exportar:** Clique no botão **"Exportar para Excel"** para baixar um arquivo `.xls` com todos os seus contatos salvos.
4.  **Persistência:** Verifique que os dados foram gravados no arquivo `backend/contatos.json`.
