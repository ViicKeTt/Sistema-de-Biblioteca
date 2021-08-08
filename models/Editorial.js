const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Editorial = sequelize.define("Editoriales", {
    idEditorial: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombreEditorial: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefonoEditorial: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    paisEditorial: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Editorial;