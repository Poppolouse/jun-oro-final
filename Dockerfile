# Multi-stage Dockerfile for Neumorphism Portfolio Website
# Optimized for production deployment with security and performance

# Build stage
FROM node:18-alpine AS builder
LABEL maintainer="Portfolio Owner"
LABEL description="Neumorphism Portfolio Website - Build Stage"

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build and optimize assets
RUN npm run build

# Production stage
FROM nginx:alpine AS production
LABEL maintainer="Portfolio Owner"
LABEL description="Neumorphism Portfolio Website - Production"

# Install additional tools for health checks
RUN apk add --no-cache \
    curl \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S portfolio -u 1001

# Copy optimized assets from builder
COPY --from=builder --chown=portfolio:nodejs /app/. /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create health check script
RUN echo '#!/bin/sh' > /healthcheck.sh && \
    echo 'curl -f http://localhost:80/ || exit 1' >> /healthcheck.sh && \
    echo 'curl -f http://localhost:80/health || exit 1' >> /healthcheck.sh && \
    chmod +x /healthcheck.sh && \
    chown portfolio:nodejs /healthcheck.sh

# Set proper permissions
RUN chown -R portfolio:nodejs /usr/share/nginx/html && \
    chown -R portfolio:nodejs /var/cache/nginx && \
    chown -R portfolio:nodejs /var/log/nginx && \
    chown -R portfolio:nodejs /etc/nginx/conf.d

# Create nginx cache directory
RUN mkdir -p /var/cache/nginx && \
    chown -R portfolio:nodejs /var/cache/nginx

# Switch to non-root user
USER portfolio

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD /healthcheck.sh

# Start nginx
CMD ["nginx", "-g", "daemon off;"]