# Build stage
FROM node:18-alpine AS build
# Set working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json files
COPY package*.json ./
# Install all dependencies (including development)
RUN npm ci
# Copy the rest of the application code
COPY . .
# Build the React application
RUN npm run build
# Production stage
FROM node:18-alpine AS prod
# Set working directory inside the container
WORKDIR /app
# Copy only package.json and package-lock.json files to the final image
COPY package*.json ./
# Install only production dependencies
RUN npm ci --only=production
# Copy the build generated from the previous stage
COPY --from=build /app/build /app/build
# Use a base Nginx image to serve the static build
FROM nginx:stable-alpine
# Copy the build from the previous stage to the Nginx distribution folder
COPY --from=build /app/build /usr/share/nginx/html
# Expose the port that Nginx will use
EXPOSE 80
# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]