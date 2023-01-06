require('dotenv').config();
const {
    DATABASE_DIALECT,
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD
} = process.env;

module.exports = {
    development: {
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: DATABASE_HOST,
        dialect: DATABASE_DIALECT
    }
};