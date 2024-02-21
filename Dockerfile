# Use the official Node.js 16 image as a parent image
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of your application's code
COPY . .

# Build your application
RUN pnpm run build

# Use the official Node.js 16 image for the runtime
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Your application runs on port 3000 by default, expose it
EXPOSE 3000

# Run the application
CMD ["node", "dist/src/main"]
