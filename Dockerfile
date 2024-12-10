# Use an official Node.js image as a base
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY ./ ./

# Expose port 3000 (or your desired port)
EXPOSE 3001

RUN npx sequelize-cli db:migrate

# Command to run the application using nodemon for hot reloading
CMD ["npm", "run", "serve"]
