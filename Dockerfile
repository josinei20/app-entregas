# Usa imagem Debian slim (recomendado pelo Render)
FROM node:18-slim

# Diretório de trabalho
WORKDIR /app

# Copia package.json primeiro (melhor cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do projeto
COPY . .

# Render usa a variável PORT
EXPOSE 3000

# Comando de start
CMD ["npm", "start"]

