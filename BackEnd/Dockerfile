# -------- Base Image --------
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Backend runs on port 4000
EXPOSE 4000

# Start server
CMD ["node", "index.js"]
