#!/bin/bash

# PRODUCTION
# git reset --hard
git checkout develop
git pull origin develop

docker compose up -d