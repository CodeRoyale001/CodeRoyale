# Use Node.js LTS base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Set the environment variable for production
# ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "dev"]
