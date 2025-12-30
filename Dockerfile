# 1️⃣ Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Generar Prisma client
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# 2️⃣ Run stage
FROM node:22-alpine
WORKDIR /app

# Copiar solo lo necesario desde la etapa build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

EXPOSE 3000

# Ejecutar la app
CMD ["node", "dist/src/main.js"]
