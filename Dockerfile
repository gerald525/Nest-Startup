# environment setting
ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-alpine AS base

# work directory setting
WORKDIR /usr/src/app

# copy package.json to install node modules
COPY package.json ./

# install node module(cached)
RUN npm ci

# copy all the necessary files
COPY . .

# input argument when docker build(docker build --build-arg [env=development, ...args] -t [tag-name])
ARG env
ENV NODE_ENV=${env}

# set microservice port(if don't set, it will be set automatically to the backend service port)
# EXPOSE 8000

# Run the application.
CMD npm run start
