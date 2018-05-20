FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install
ENV NODE_ENV=production

RUN apk update && apk add --no-cache libstdc++ libgcc
EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ] 
