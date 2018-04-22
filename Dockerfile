# Official Node image for fat version
# FROM node:argon
# Awesome tiny node image
FROM node:7.6.0

WORKDIR /app
ADD . /app

ENTRYPOINT [ "node", "app/entry.js" ]
