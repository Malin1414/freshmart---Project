declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    FRONTEND_URL?: string;
    NODE_ENV?: string;
    MONGODB_URI?: string;
  }
}
