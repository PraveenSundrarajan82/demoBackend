const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize) =>{
    const Demo = sequelize.define('demo', {
        title: {
        type: Sequelize.STRING
        },
        description: {
        type: Sequelize.STRING
        },
        isLive: {
        type: Sequelize.BOOLEAN
        }
    });

    return Demo;

}