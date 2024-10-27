# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Install only production dependencies
RUN npm install --only=production

# Install development dependencies for building TypeScript
RUN npm install --only=development

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine AS production

# Set NODE_ENV to production for optimization
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
