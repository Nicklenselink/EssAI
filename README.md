# Fauna

Fauna is an application that allows students to get feedback on their essay whilst writing. For this, Fauna uses the GPT-4 API.

## Development

To set up a local development environment, execute the following steps on your local device:

1. Clone the project using Git
2. Install the Node dependencies by running `npm install` (This requires NodeJS to be installed on your device)
3. Create a `.env` file with the required environment variables (See [Environment Variables](#environment-variables))
4. Start the local Docker environment by running `docker compose -f docker-compose.local.yml up -d` (This starts a local PostgreSQL database) (This requires Docker to be installed on your device)
5. Run database migrations by running `npx prisma migrate deploy`
6. Start the development environment by running `npm run dev`

After you finish, you can shut down the database by running `docker compose -f docker-compose.local.yml down`

## Deployment

To deploy the application to production, execute the following steps on the server:

1. Clone or pull the latest version of the project using Git
2. Create a `.env` file with the required environment variables, if it does not exist already (See [Environment Variables](#environment-variables))
3. If the application is already running, stop the application by running `docker compose -f docker-compose.production.yml down`
4. Build the latest production image by running `docker compose -f docker-compose.production.yml build` (This requires Docker to be installed on your device)
5. Start production image by running `docker compose -f docker-compose.production.yml up -d`

## Environment variables

The Fauna application requires the environment variables below to be set. This can be done by adding them to the `.env` file.

```
DOMAIN="fauna.socsci.ru.nl"
DATABASE_URL="postgresql://postgres:PASSWORDHERE@localhost:5432/postgres?schema=public"
DATABASE_PASSWORD="PASSWORDHERE"
AUTH_SECRET="AUTHSECRETHERE"
OPENAI_API_KEY="OPENAIAPIKEYHERE"
```

Replace all occurances of `PASSWORDHERE` with a secure password. This password is used for connecting to the database.

Replace `AUTHSECRETHERE` with a secret key. This key is used to sign authentication tokens.

Replace `OPENAIAPIKEYHERE` with your OpenAI API key. This API key can be obtained from the OpenAI Platform Dashboard.
