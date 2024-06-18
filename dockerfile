# build stage
FROM node:lts-alpine as build-stage

WORKDIR /temp

# Copying package files and installing dependencies
COPY package.json yarn.lock .
RUN yarn config set registry https://registry.npmmirror.com/ && \
    yarn install --frozen-lockfile && \
    yarn cache clean

# Copying source files and building the application
COPY . .
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage

# Clearing the nginx default directory
RUN rm -rf /usr/share/nginx/html/*

# Copying only necessary files from build-stage
COPY --from=build-stage /temp/dist /usr/share/nginx/html
COPY --from=build-stage /temp/nginx.conf /etc/nginx/conf.d

# Exposing the right port
EXPOSE 5173

# Since we are using an Nginx image, it will start Nginx automatically,
# but we can still specify the command explicitly
CMD ["nginx", "-g", "daemon off;"]
