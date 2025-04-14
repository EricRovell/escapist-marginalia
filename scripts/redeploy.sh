#!/bin/bash

echo "Starting redeployment"

git checkout migrate-astro
git pull

docker compose up -d --build
