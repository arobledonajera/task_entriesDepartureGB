const { sequelize, Sequelize } = require('../helpers/postgresDB.helper');

async function executePostgresQuery(query, replacements, oneRecord) {
    try {
        const result = await sequelize.query(query, {
            replacements,
            type: Sequelize.QueryTypes.SELECT
        });
        if(oneRecord) {
            return result[0];
        }

        return result;
    }
    catch(error) {
        throw error;
    }
}

module.exports = {
    executePostgresQuery
}