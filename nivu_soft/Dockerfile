# Etapa 1: build del proyecto
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Construye el proyecto (para producción)
RUN npm run build

# Etapa 2: servidor estático con NGINX
FROM nginx:stable-alpine

# Copia los archivos generados al directorio público de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia una configuración básica de NGINX (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
