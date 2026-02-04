# Stage 1: Build the frontend (React/Vite)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine
WORKDIR /app

# Install build dependencies for native modules (sqlite3)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
# Install only production dependencies and rebuild sqlite3
RUN npm install --only=production && npm rebuild sqlite3

# Copy built assets from stage 1
COPY --from=build-stage /app/dist ./dist
# Copy backend files
COPY index.js .

# SQLite database will be mounted as a volume for persistence
EXPOSE 19245

CMD ["node", "index.js"]
