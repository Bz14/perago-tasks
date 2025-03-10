import "dotenv/config";

const config = {
  DBPort: process.env.DB_PORT,
  DBHost: process.env.DB_HOST,
  DBUser: process.env.DB_USER,
  DBPassword: process.env.DB_PASSWORD,
  DBName: process.env.DB_NAME,
  PORT: process.env.PORT,
  JWTSecret: process.env.JWT_SECRET || "secret",
};

export default config;
