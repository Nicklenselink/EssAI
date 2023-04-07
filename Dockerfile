FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm ci
RUN npx prisma generate

ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

RUN npm run build


FROM node:18-alpine AS run

WORKDIR /app
COPY --from=build /app/package*.json .
COPY --from=build /app/production_start.sh /app/production_start.sh
COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma

RUN npm ci --omit=dev --ignore-scripts
RUN npx prisma generate

EXPOSE 3000
ENTRYPOINT ["sh", "/app/production_start.sh"]