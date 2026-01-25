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
COPY package*.json ./
# Install only production dependencies
RUN npm install --only=production

# Copy built assets from stage 1
COPY --from=build-stage /app/dist ./dist
# Copy backend files
COPY index.js .
COPY .env .

# SQLite database will be mounted as a volume for persistence
# EXPOSE the Express port
EXPOSE 19245

CMD ["node", "index.js"]
