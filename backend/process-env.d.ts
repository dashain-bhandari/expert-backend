declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        SUPER_ADMIN_EMAIL:string
        // add more environment variables and their types here
      }
    }
  }