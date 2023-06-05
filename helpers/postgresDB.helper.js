const { Sequelize, DataTypes, Op } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.PDB_NAME,
    process.env.PDB_USER,
    process.env.PDB_PASS,
    {
    host: process.env.PDB_HOST,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        timezone: process.env.DB_TIMEZONE
    },
    pool: {
        max: 5,
        min: 0,
        // acquire: 100 * 1000,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
});

module.exports = {
    sequelize,
    Sequelize,
}