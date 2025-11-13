# 🚀 Deploy na Vercel

## Opção 1: Deploy Separado (Recomendado)

### Backend (API)
1. Crie um novo projeto na Vercel
2. Importe o repositório
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Adicione as variáveis de ambiente:
   - `DATABASE_URL`: URL do PostgreSQL (use Neon, Supabase ou Railway)
   - `JWT_SECRET`: Sua chave secreta
   - `PORT`: 3000

### Frontend
1. Crie outro projeto na Vercel
2. Importe o repositório
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Adicione variável de ambiente:
   - `VITE_API_URL`: URL da API do backend (ex: https://seu-backend.vercel.app)

## Opção 2: Banco de Dados

### Neon (PostgreSQL Serverless - Grátis)
1. Acesse https://neon.tech
2. Crie um projeto
3. Copie a connection string
4. Cole em `DATABASE_URL` na Vercel

### Supabase (PostgreSQL - Grátis)
1. Acesse https://supabase.com
2. Crie um projeto
3. Vá em Settings > Database
4. Copie a connection string
5. Cole em `DATABASE_URL` na Vercel

## Opção 3: Railway (Backend + DB)
1. Acesse https://railway.app
2. New Project > Deploy from GitHub
3. Adicione PostgreSQL
4. Configure variáveis de ambiente
5. Deploy automático

## Passos Finais

1. Execute migrations no banco:
```bash
npx prisma migrate deploy
```

2. Atualize a URL da API no frontend:
```typescript
// frontend/src/services/api.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});
```

3. Commit e push:
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

## Comandos Úteis

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy local
vercel

# Deploy production
vercel --prod
```
