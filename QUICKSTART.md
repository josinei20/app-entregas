# ⚡ Quick Start - 5 Minutos

## 1️⃣ Pré-requisitos (1 min)

Ter instalado:
- **Node.js** v14+ → https://nodejs.org
- **MongoDB** local ou **MongoDB Atlas** (cloud) → https://www.mongodb.com

## 2️⃣ Setup (2 min)

```bash
# Abrir terminal na pasta App

# Instalar dependências
npm run setup

# Copiar arquivo de configuração
cp .env.example .env

# Editar .env com seus dados (se usar MongoDB local, deixar como está)
# Se usar MongoDB Atlas, copiar connection string
```

**Arquivo .env (padrão):**
```
MONGODB_URI=mongodb://localhost:27017/delivery-docs
JWT_SECRET=sua_chave_secreta
PORT=5000
REACT_APP_API_URL=http://localhost:5000/api
```

## 3️⃣ Iniciar (1 min)

```bash
# Dois terminais:

# Terminal 1 - Backend
cd backend && npm run dev
# Saída: ✓ Servidor rodando na porta 5000

# Terminal 2 - Frontend
cd frontend && npm start
# Saída: ✓ http://localhost:3000
```

## 4️⃣ Acessar (1 min)

Abrir: **http://localhost:3000**

## 5️⃣ Primeiro Acesso

1. Clique **"Criar novo motorista"**
2. Preencha dados (nome, usuário, email, senha)
3. Clique **"Cadastrar"**
4. Pronto! 🎉

---

## 🚀 Próximas Ações

### Como Motorista:
```
Home → Nova Entrega → Preencher → Anexar 5 docs → Enviar
```

### Como Admin:
Precisa virar admin. No terminal MongoDB:
```bash
mongosh
# Depois copiar-colar:
use delivery-docs
db.drivers.updateOne({ username: "seu.usuario" }, { $set: { role: "admin" } })
```

Agora têm acesso a "Painel Admin" na tela inicial.

---

## 📋 Checklist

- [ ] Node.js instalado (`node -v`)
- [ ] MongoDB rodando localmente ou Atlas URL pronto
- [ ] Dependências instaladas (`npm run setup`)
- [ ] .env configurado
- [ ] Backend rodando (porta 5000)
- [ ] Frontend rodando (porta 3000)
- [ ] Login funcionando
- [ ] Entrega criada com sucesso

---

## 🆘 Erros Comuns

| Erro | Solução |
|------|---------|
| "Cannot connect to MongoDB" | Iniciar MongoDB: `mongod` |
| "Port 5000 already in use" | Fechar outro programa na porta 5000 |
| "Cannot find module" | Rodar `npm install` novamente |
| "Frontend não conecta" | Verificar `REACT_APP_API_URL` em .env |

---

## 📚 Documentação Completa

Para detalhes, veja:
- **[README.md](README.md)** - Visão geral
- **[SETUP.md](SETUP.md)** - Instalação detalhada
- **[USER_GUIDE.md](USER_GUIDE.md)** - Como usar
- **[API_DOCS.md](backend/API_DOCS.md)** - Endpoints da API
- **[DEPLOY.md](DEPLOY.md)** - Colocar em produção

---

## 🎯 Funcionalidades

✅ Login de motoristas
✅ Criação de entregas
✅ Upload de 5 documentos obrigatórios
✅ Compressão automática de imagens
✅ Painel admin com gráficos
✅ Filtros e busca
✅ Responsivo (mobile/desktop)
✅ Seguro (JWT + bcrypt)

---

## 💡 Dicas

- Frontend funciona mesmo com internet lenta (compressão)
- Documentos são comprimidos automaticamente
- Fotos são obrigatórias para enviar
- Admin vê todas as entregas
- Cada motorista vê apenas suas entregas

---

**Está funcionando?** Perfeito! 🎉

**Quer customizar?** Veja os arquivos em `src/` (frontend) e `backend/src/` (backend)

**Quer fazer deploy?** Veja [DEPLOY.md](DEPLOY.md)

---

**Versão 1.0.0** | Janeiro 2025
