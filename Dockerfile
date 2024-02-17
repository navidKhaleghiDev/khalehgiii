FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build
RUN npm run preview

# Stage 2: Serve the built app with a lightweight HTTP server
# FROM node:18-alpine AS production
# WORKDIR /app

# # Copy the built app from the previous stage
# COPY --from=build /app/dist ./dist

# COPY package*.json ./
# RUN npm run preview

# Install a lightweight HTTP server
# RUN npm install -g serve

# Set the command to start the server
# CMD ["serve", "-s", "dist"]

# Expose the port that the server listens on (optional)
# EXPOSE 5000
