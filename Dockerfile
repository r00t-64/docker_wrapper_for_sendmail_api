# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /api

# Copy package.json and package-lock.json to the container
COPY api/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY api/ ./

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
