#!/bin/bash

echo "Starting redeployment"

cd ..

git checkout migrate-astro
git pull

docker compose up -d --build
