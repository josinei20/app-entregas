# 🚀 Deploy Guide - Delivery Documentation App

## Deploy Local (Windows/Mac/Linux)

### Pré-requisitos
- Node.js instalado
- MongoDB instalado ou conta MongoDB Atlas
- Git (opcional)

### Passos

1. **Clonar/Descompactar o projeto**
```bash
cd App
```

2. **Instalar dependências**
```bash
npm run setup
```

3. **Configurar .env**
```bash
cp .env.example .env
# Editar .env com suas configurações
```

4. **Iniciar (desenvolvimento)**
```bash
npm run dev
```

---

## Deploy em Servidor (Produção)

### Opção 1: Heroku (Recomendado para começar)

#### Backend no Heroku

1. **Criar conta em Heroku.com**

2. **Instalar Heroku CLI**

3. **Login**
```bash
heroku login
```

4. **Criar aplicação**
```bash
heroku create seu-app-backend
```

5. **Configurar variáveis de ambiente**
```bash
heroku config:set MONGODB_URI=seu_mongodb_uri
heroku config:set JWT_SECRET=sua_chave_secreta_longa
heroku config:set NODE_ENV=production
```

6. **Deploy**
```bash
cd backend
git push heroku main
```

#### Frontend no Vercel

1. **Criar conta em Vercel.com**

2. **Conectar repositório GitHub**

3. **Configurar**
   - Framework: React
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build

4. **Variáveis de Ambiente**
   ```
   REACT_APP_API_URL=https://seu-app-backend.herokuapp.com/api
   ```

---

### Opção 2: DigitalOcean App Platform

1. **Criar conta em DigitalOcean**

2. **Criar novo App**

3. **Conectar repositório GitHub**

4. **Configurar:**
   - Backend: Node.js, ./backend
   - Frontend: Static site, ./frontend/build

5. **Adicionar MongoDB:**
   - Usar MongoDB Atlas ou DigitalOcean Managed Database

---

### Opção 3: AWS

#### EC2 Instance

1. **Criar instância EC2 (Ubuntu)**

2. **Conectar via SSH**

3. **Instalar Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Instalar MongoDB** ou usar AWS DocumentDB

5. **Clonar projeto**
```bash
git clone seu-repo
cd App
npm run setup
```

6. **Usar PM2 para manter processo rodando**
```bash
npm install -g pm2
pm2 start backend/src/server.js --name "backend"
pm2 start frontend/scripts/start.js --name "frontend"
pm2 save
pm2 startup
```

7. **Configurar Nginx como reverse proxy**

---

## Checklist Pré-Deploy

- [ ] .env configurado corretamente
- [ ] MongoDB URI válido
- [ ] JWT_SECRET complexo e único
- [ ] Frontend REACT_APP_API_URL apontando para backend correto
- [ ] CORS configurado (já está)
- [ ] Teste de login funcionando
- [ ] Teste de upload de arquivo funcionando
- [ ] Admin conseguindo acessar painel

---

## Monitoramento em Produção

### Logs
```bash
# Heroku
heroku logs --tail

# SSH
tail -f /var/log/app.log
```

### Performance
- Monitorar uso de CPU e memória
- Verificar tempo de resposta da API
- Monitorar tamanho dos uploads

### Backup
- Fazer backup regular do MongoDB
- Se usando Atlas: Habilitar backup automático

---

## Scaling

Se muitos usuários/entregas:

1. **Database**: Usar MongoDB Atlas com replicação
2. **API**: Usar load balancer (Nginx, AWS ELB)
3. **Storage**: Usar S3, Google Cloud Storage ou similar para imagens
4. **Cache**: Adicionar Redis para cache de dados

---

## Segurança para Produção

1. **HTTPS**: Usar certificado SSL/TLS
2. **Rate Limiting**: Implementar rate limit na API
3. **CORS**: Especificar apenas domínios permitidos
4. **CSRF**: Adicionar CSRF token
5. **Validação**: Validar todos os inputs
6. **Senhas**: Usar bcrypt (já implementado)
7. **JWT**: Usar expiração curta (7 dias)

---

## Domínio Customizado

1. **Comprar domínio** (GoDaddy, Namecheap, etc)

2. **Apontar DNS para seu host**
   - Heroku: Usar CNAME
   - DigitalOcean: Usar nameservers
   - AWS: Usar Route 53

3. **Configurar SSL**
   - Heroku: Automático
   - Outros: Usar Let's Encrypt (gratuito)

---

## Troubleshooting Deploy

### Aplicação não inicia
- Verificar logs
- Verificar variáveis de ambiente
- Verificar conectividade com MongoDB

### Frontend não conecta ao backend
- Verificar CORS
- Verificar REACT_APP_API_URL
- Verificar se backend está rodando

### Uploads lentos
- Aumentar tamanho permitido se necessário
- Otimizar compressão de imagens
- Usar CDN para servir arquivos

---

**Sucesso no deploy!** 🎉
