# Fetching the latest node image on apline linux
FROM node:alpine

# Setting up the work directory
WORKDIR /app

# Setting up frontend
COPY ./package.json .
RUN npm install --legacy-peer-deps
RUN npm install -g serve
COPY . .
RUN npm run build

EXPOSE 4000

# Start frontend
CMD serve -s ./build -l 4000
