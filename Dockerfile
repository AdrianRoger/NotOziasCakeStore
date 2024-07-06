# Etapa de build
FROM node:18-alpine AS build
# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app
# Copie os arquivos package.json e package-lock.json
COPY package*.json ./
# Instale todas as dependências (incluindo as de desenvolvimento)
RUN npm ci
# Copie o restante do código do aplicativo
COPY . .
# Crie o build do aplicativo React
RUN npm run build
# Etapa final
FROM node:18-alpine AS prod
# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app
# Copie apenas os arquivos package.json e package-lock.json para a imagem final
COPY package*.json ./
# Instale apenas as dependências de produção
RUN npm ci --only=production
# Copie o build gerado na etapa anterior
COPY --from=build /app/build /app/build
# Use uma imagem base do Nginx para servir o build estático
FROM nginx:stable-alpine
# Copie o build da etapa anterior para a pasta de distribuição do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta que o Nginx irá usar
EXPOSE 80

# Inicie o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
