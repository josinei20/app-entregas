# Delivery Documentation App 📦

Sistema de registro e envio de documentos de entrega para motoristas com painel administrativo.

## 🚀 Recursos Principais

### Para Motoristas
- ✅ Login individual com usuário e senha
- 📸 Captura de fotos dos documentos obrigatórios
- 📋 Formulário simples com informações da entrega
- 📤 Upload rápido com compressão de imagens
- 📱 Interface responsiva (Mobile e Desktop)
- 🔄 Recuperação automática em caso de erro de conexão

### Para Admin
- 📊 Painel administrativo com filtros
- 📈 Gráficos e estatísticas de entregas
- 🔍 Busca por motorista, data ou número da entrega
- 📥 Visualização e download de documentos

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express**
- **MongoDB** para banco de dados
- **JWT** para autenticação
- **Multer** para upload de arquivos
- **Sharp** para compressão de imagens

### Frontend
- **React 18**
- **Tailwind CSS** para styling
- **React Router** para navegação
- **Axios** para requisições HTTP
- **Recharts** para gráficos

## 📦 Instalação

### 1. Clonar o repositório
```bash
git clone <repo-url>
cd App
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Editar .env com suas configurações
```

### 3. Instalar dependências

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## 🚀 Executar a aplicação

### Desenvolvimento (ambos os servidores)
```bash
npm run dev
```

Isso iniciará:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Produção
```bash
npm run build
npm run start
```

## 📂 Estrutura do Projeto

```
App/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .env.example
├── package.json
└── README.md
```

## 🔐 Segurança

- Autenticação JWT
- Senhas hasheadas com bcrypt
- Validação de entrada
- CORS configurado
- Rate limiting em rotas de upload

## 📱 Responsividade

A aplicação foi desenvolvida com mobile-first approach:
- Botões grandes e táteis
- Otimizado para iPhone e dispositivos Android
- Funciona perfeitamente em desktop

## 🐛 Tratamento de Erros

- Mensagens claras ao usuário
- Retry automático em falhas de conexão
- Cache local de fotos antes do envio
- Não perde dados em caso de erro

## 📊 Documentação da API

Veja [API_DOCS.md](./backend/API_DOCS.md) para detalhes completos da API REST.

## 🤝 Suporte

Para problemas ou sugestões, contate o desenvolvedor.

## 📄 Licença

MIT
