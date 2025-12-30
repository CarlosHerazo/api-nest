# 1. Build
FROM node:22-alpine AS build
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./
RUN npm install

# Generar Prisma client antes de build
RUN npx prisma generate

# Copiar el resto del código
COPY . .

# Compilar TS
RUN npm run build

# 2. Run
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --production
EXPOSE 3001
CMD ["node", "dist/src/main.js"]
