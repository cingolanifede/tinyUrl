export default {
    ENV: process.env.NODE_ENV ?? 'dev',
    NAME: process.env.APP_NAME ?? 'tiny-url',
    PORT: process.env.PORT ?? 9000,
    DB_PATH: process.env.DB_PATH ?? 'localhost',
    BASE_URL: process.env.BASE_URL ?? 'http://localhost:9001'
}