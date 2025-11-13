# 📊 Gestão Pro - Sistema de Gestão Empresarial

Sistema completo de gestão empresarial com controle de estoque, vendas, clientes e fornecedores.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.3.3-blue)

## 🚀 Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Prisma ORM** - Gerenciamento de banco de dados
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas

### Frontend
- **React** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Navegação
- **Axios** - Requisições HTTP
- **Recharts** - Gráficos interativos
- **React Hot Toast** - Notificações

## ✨ Funcionalidades

- ✅ Autenticação JWT com controle de sessão
- ✅ Dashboard com KPIs e gráficos interativos
- ✅ Gestão completa de produtos e categorias
- ✅ Controle de estoque (entrada/saída)
- ✅ Sistema de vendas com carrinho
- ✅ Cadastro de clientes e fornecedores
- ✅ Relatórios detalhados de vendas e estoque
- ✅ Pesquisa global em tempo real
- ✅ Sidebar colapsável com ícones
- ✅ Design responsivo e moderno
- ✅ Notificações toast em todas as ações
- ✅ Modais de confirmação customizados

## 📦 Instalação

### Pré-requisitos
- Node.js >= 18.0.0
- PostgreSQL >= 17
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/gestao-pro.git
cd gestao-pro
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/gestao_db"
JWT_SECRET="sua_chave_secreta_super_segura"
PORT=3000
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Execute as migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

Popule o banco com dados de exemplo (opcional):
```bash
npm run seed
```

Inicie o servidor:
```bash
npm run dev
```

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
npm run dev
```

## 🎯 Uso

1. Acesse http://localhost:5173
2. Crie uma conta em "Cadastre-se" ou use o Prisma Studio para criar um usuário
3. Faça login com suas credenciais
4. Explore o sistema!

### Criar primeiro usuário via Prisma Studio
```bash
cd backend
npx prisma studio
```

## 📁 Estrutura do Projeto

```
gestao-pro/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── icons/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## 🎨 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Produtos
![Produtos](screenshots/produtos.png)

### Vendas
![Vendas](screenshots/vendas.png)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

## 📧 Contato

- Email: seu@email.com
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
