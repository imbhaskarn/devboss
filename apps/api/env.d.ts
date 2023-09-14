// env.d.ts
export {};
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT: string;
            DATABASE_URL: string;
            SECRET_KEY: string;
            MAIL_HOST: string;
            MAIL_PORT: string;
            MAIL_USER: string;
            MAIL_PASS: string;
            MAIL_FROM: string;
            REDIS_HOST: string;
            REDIS_PORT: number;
            REDIS_PASSWORD: string;
            REDIS_EXPIRE: string;
            REDIS_URL: string;
        }
    }
}
