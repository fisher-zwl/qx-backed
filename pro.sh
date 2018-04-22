#!/usr/bin/env bash


docker run --rm -v "$PWD":/app -w /app iron/node:dev npm install --registry=https://registry.npm.taobao.org

docker build -t activity-ne-backstage .

#!删除容器
docker rm -f activity-ne-backstage-container


docker run --name activity-ne-backstage-container -d -p 80:7800 activity-ne-backstage