# Use official lightweight Node image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy all project files (server.js + public folder)
COPY . .

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
