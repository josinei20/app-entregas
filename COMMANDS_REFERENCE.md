# 🔧 Referência Rápida de Comandos

## 📦 Instalação e Setup

```bash
# Instalar dependências (backend + frontend)
npm run setup

# Instalar só dependências do backend
cd backend && npm install

# Instalar só dependências do frontend
cd frontend && npm install

# Reinstalar tudo (limpar cache)
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Iniciar Desenvolvimento

```bash
# Ambos os servidores (requer 2 terminais)
npm run dev

# Apenas backend (porta 5000)
npm run dev:backend
cd backend && npm run dev

# Apenas frontend (porta 3000)
npm run dev:frontend
cd frontend && npm start
```

## 🏗️ Build e Deploy

```bash
# Build para produção
npm run build
npm run build:backend
npm run build:frontend

# Iniciar em produção
npm run start
npm run start:backend
npm run start:frontend
```

## 🗂️ Gerenciamento de Arquivos

```bash
# Criar arquivo .env
cp .env.example .env

# Listar estrutura
tree -L 3

# Deletar pasta
rm -rf pasta_nome

# Criar pasta
mkdir pasta_nome

# Mover arquivo
mv de/arquivo para/arquivo
```

## 🗄️ MongoDB

```bash
# Conectar local
mongosh

# Conectar remoto (MongoDB Atlas)
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/database"

# No shell MongoDB:
use delivery-docs

# Ver coleções
show collections

# Ver documentos
db.drivers.find()
db.deliveries.find()

# Contar documentos
db.drivers.countDocuments()

# Atualizar papel para admin
db.drivers.updateOne(
  { username: "seu.usuario" },
  { $set: { role: "admin" } }
)

# Deletar coleção
db.drivers.deleteMany({})

# Deletar um documento
db.deliveries.deleteOne({ _id: ObjectId("...") })

# Criar índice
db.deliveries.createIndex({ driverId: 1, deliveryDate: -1 })
```

## 🔧 Debug e Troubleshooting

```bash
# Verificar porta em uso
lsof -i :5000              # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Matar processo
kill -9 PID                # macOS/Linux
taskkill /PID PID /F       # Windows

# Verificar Node version
node -v
npm -v

# Verificar espaço em disco
df -h                      # macOS/Linux
dir C:                     # Windows

# Ver logs em tempo real
tail -f app.log
tail -f backend/logs/*.log

# Limpar cache npm
npm cache clean --force

# Verificar instalação
npm list
npm list --depth=0

# Atualizar dependências
npm update
npm outdated
```

## 🌐 Endpoints Úteis (Local)

```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
API:      http://localhost:5000/api

Health check: GET http://localhost:5000/api/health

Login:    POST http://localhost:5000/api/auth/login
Register: POST http://localhost:5000/api/auth/register
```

## 📝 Git (se usar)

```bash
# Clonar projeto
git clone <url>

# Verificar status
git status

# Adicionar arquivos
git add .
git add arquivo.js

# Commit
git commit -m "mensagem"

# Push
git push

# Pull
git pull

# Ver log
git log

# Criar branch
git branch -b feature/nome

# Mudar branch
git checkout branch-nome

# Deletar branch
git branch -d branch-nome
```

## 🐳 Docker (opcional)

```bash
# Se usar Docker:
docker build -t delivery-app .
docker run -p 3000:3000 -p 5000:5000 delivery-app

# Docker Compose
docker-compose up
docker-compose down
```

## 📊 Performance

```bash
# Ver uso de memória Node
node --max-old-space-size=4096 src/server.js

# Profiling
node --prof src/server.js

# Ver tamanho de arquivos
du -sh *
ls -lah

# Verificar tamanho build
du -sh frontend/build
```

## 🔍 Verificação de Código

```bash
# ESLint (se instalado)
npm run lint

# Prettier (se instalado)
npm run format

# Verificar sintaxe
node -c arquivo.js

# Testes (se houver)
npm test
npm test -- --coverage
```

## 📱 Mobile Testing

```bash
# Usar seu telefone na mesma rede
# Descobrir IP local
ifconfig | grep "inet "        # macOS/Linux
ipconfig | findstr "IPv4"      # Windows

# Acessar pelo telefone
http://<seu-ip-local>:3000
http://<seu-ip-local>:5000/api

# Chrome DevTools mobile
Press F12 → Ctrl+Shift+M (ou Cmd+Shift+M)
```

## 💾 Backup

```bash
# Backup MongoDB local
mongodump -d delivery-docs -o backup/

# Restaurar
mongorestore backup/delivery-docs/

# Backup arquivos
tar -czf backup.tar.gz App/
zip -r backup.zip App/
```

## 🚀 Deployment

```bash
# Heroku
heroku login
heroku create app-name
heroku config:set VAR=value
git push heroku main
heroku logs --tail

# Vercel
vercel deploy
vercel --prod

# AWS
aws ec2 run-instances ...
aws deploy ...

# DigitalOcean
doctl compute droplet create ...
```

## 📚 Úteis

```bash
# Verificar Node path
which node              # macOS/Linux
where node              # Windows

# Executar script npm
npm run [script-name]

# Ver scripts disponíveis
npm run

# NPM info
npm info package-name

# Atualizar npm
npm install -g npm@latest

# Verificar arquivos grandes
npm list --depth=0 --all

# Audit (vulnerabilidades)
npm audit
npm audit fix
```

## ⚡ Atalhos Úteis

```bash
# Abrir VSCode na pasta
code .

# Abrir navegador
open http://localhost:3000         # macOS
xdg-open http://localhost:3000     # Linux
start http://localhost:3000        # Windows

# Editar .env
nano .env (macOS/Linux)
code .env (VSCode)

# Limpar terminal
clear (macOS/Linux)
cls   (Windows)
```

---

## 📖 Mais Informações

Para detalhes completos, consulte:
- **SETUP.md** - Instalação
- **API_DOCS.md** - Endpoints
- **USER_GUIDE.md** - Como usar
- **DEPLOY.md** - Deploy

---

**Dica:** Adicione este arquivo como bookmark para referência rápida! 🔖
