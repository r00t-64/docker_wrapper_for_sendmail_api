# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY app/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY app/ ./

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
