FROM node:22.6-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

ENV NODE_ENV "development"
ENV PORT "8080"
ENV HOST "localhost"
ENV COMMON_RATE_LIMIT_WINDOW_MS "1000"
ENV COMMON_RATE_LIMIT_MAX_REQUESTS "20"


# Start the app
CMD npm run start
