FROM node:24.12-alpine AS builder
WORKDIR /app

# Install deps needed for build
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npm run build

FROM node:24.12-alpine
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy built output
COPY --from=builder /app/dist ./dist

EXPOSE 3333
CMD ["node", "dist/main"]
