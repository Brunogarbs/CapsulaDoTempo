# ⏳ Cápsula do Tempo Digital

Este projeto foi desenvolvido como parte do meu estudo prático de novas tecnologias no ecossistema **Full Stack**. A ideia foi criar uma aplicação que permite ao usuário registrar mensagens para o futuro — e quando a data de abertura chega, a cápsula é automaticamente exibida em um popup moderno.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend (React)
- React + Hooks
- Axios
- CSS customizado
- Popup com renderização condicional e controle via `localStorage`

### ⚙️ Backend (Node.js)
- Express.js
- PostgreSQL
- Biblioteca `pg` para conexão com o banco

---

## 💡 Funcionalidades

- ✅ Criar cápsulas do tempo com:
  - Nome do destinatário
  - Mensagem secreta
  - Data para abertura
- 📝 Editar e atualizar cápsulas existentes
- 🗑️ Deletar cápsulas
- 📅 Exibir automaticamente uma mensagem por vez quando a data de abertura chegar
- 💾 Evitar exibições repetidas com `localStorage`
- 🎨 Interface limpa e responsiva

---

## 📦 Estrutura de Pastas

---
```tree
📦 capsula-do-tempo
├── backend
│   └── server.js
├── frontend
│   ├── public
│   └── src
│       ├── App.js
│       ├── App.css
│       └── components
│           ├── PopupModal.js
│           └── PopupModal.css
├── README.md
└── package.json
```
---

## 🗃️ Banco de Dados (PostgreSQL)

Execute o seguinte script SQL:

```sql
CREATE TABLE time_capsules (
  id SERIAL PRIMARY KEY,
  recipient_name TEXT NOT NULL,
  message TEXT NOT NULL,
  open_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---
🔧 Como Executar o Projeto
1. Clone o repositório
   ```bash
   git clone https://github.com/seu-usuario/capsula-do-tempo.git
   cd capsula-do-tempo
    ```
2. Configure o Backend
```bash
  cd backend
  npm install
  node server.js
```
3. Configure o Frontend
```bash
  cd ../frontend
  npm install
  npm start
```
Acesse: http://localhost:3000
---

🎓 Sobre o Projeto
Esse projeto foi uma iniciativa prática para consolidar conhecimentos em:

Integração entre frontend e backend

Manipulação de datas e timezones

Comunicação com banco de dados relacional

Gerenciamento de estado com React

Git + GitHub + boas práticas de versionamento
