# Step 1: Build the ReactJS app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Debug: List files before building
RUN echo "Files before build:" && ls -la /app

# Build the React app for production with error handling
RUN npm run build

# Debug: Check if build directory exists and show its contents
RUN ls -la /app/build

# Step 2: Serve the built app using a static server
FROM nginx:alpine

# Copy built React app from the build stage to nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
