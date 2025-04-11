# Use the official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the application port (3000 for this app)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
