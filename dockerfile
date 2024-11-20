# Use the official Node.js image as the base
FROM node:18.0.0 as build

# Set the working directory 
WORKDIR /app  

# Copy the package.json and package-lock.json files 
COPY package*.json ./  

# Install dependencies 
RUN npm ci  

# Copy the app source code 
COPY . .  

# Build the Vite.js app 
RUN npm run build 

# Use a lightweight web server to serve the built app 
FROM nginx:1.19.0-alpine  

# Copy the built app from the previous stage to the correct Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# **Important:** Configure Nginx to find your 'index.html'
COPY nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80   
CMD ["nginx", "-g", "daemon off;"]
