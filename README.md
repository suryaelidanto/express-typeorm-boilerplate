# Express TypeORM Boilerplate 😎

Steps to run this project:

1. Run `npm i` command
2. Copy `.env.example`

```bash
cp .env.example .env
```

3. Setup your `.env`

```bash
#SERVER
SERVER_PORT=

#JWT
JWT_SECRET=

# CLOUDINARY
CLOUD_NAME=
API_KEY=
API_SECRET=

# DATABASE
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

4. Migrate Role seeder :

```
npm run migration:run
```

5. Run `npm start` command
