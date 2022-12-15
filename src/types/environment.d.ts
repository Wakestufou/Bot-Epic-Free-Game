declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            TOKEN_DEV: string;
            APP_ID: string;
            APP_ID_DEV: string;
            GUILD_DEV: string;
            GUILD: string;
            CHANNEL: string;
            CHANNEL_DEV: string;
            ROLE_DEV_ID: string;
            ROLE_ID: string;
        }
    }
}

export {};
