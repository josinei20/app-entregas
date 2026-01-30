# Multi-stage Dockerfile: build frontend and run backend serving the build

# Stage 1 - build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --silent
COPY frontend/ .
RUN npm run build

# Stage 2 - build backend and copy frontend build
FROM node:18-alpine AS backend
WORKDIR /app

# Install backend deps
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --production --silent

# Copy backend source
COPY backend/ ./backend/

# Copy frontend build from builder
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Do NOT copy a local .env into the image (secrets should be set via the host / Render environment)
# Render and other hosts expose environment variables at runtime. Configure them in the
# service dashboard (NODE_ENV, PORT, JWT_SECRET, etc.) instead of including a .env file.

# Expose port and run
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000
WORKDIR /app/backend
CMD ["node", "src/server.js"]
