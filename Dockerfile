# Use a lightweight Node.js image as the base
FROM node:lts AS Runtime

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN git clone https://github.com/STEAMer-Academy/steamer-academy.me.git 
# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npx", "serve", "-s", "dist", "--listen", "0.0.0.0:3000"]

