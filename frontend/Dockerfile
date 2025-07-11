FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install

# Copy rest of the project
COPY . .

# Expose port (default Vite port)
EXPOSE 3000

# Start dev server (Vite) and allow external connections
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
