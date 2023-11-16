# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /send_mail_api

# Copy package.json and package-lock.json to the container
COPY send_mail_api/package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY send_mail_api/ ./

# Expose port 3325
EXPOSE 3325

# Start the application
CMD ["node", "server.js"]
