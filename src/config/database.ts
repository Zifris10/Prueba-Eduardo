import { Dialect, Sequelize } from 'sequelize';
const databaseName = process.env.DATABASE_NAME as string;
const databaseUsername = process.env.DATABASE_USERNAME as string;
const databaseHost = process.env.DATABASE_HOST;
const databaseDialect = process.env.DATABASE_DIALECT as Dialect;
const databasePassword = process.env.DATABASE_PASSWORD;

export const sequelizeConnection = new Sequelize(databaseName, databaseUsername, databasePassword, {
    dialect: databaseDialect,
    host: databaseHost,
    define: {
        timestamps: true,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});