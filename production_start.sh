#!/bin/sh
npx prisma migrate deploy
node /app/build/index.js