const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Autor = sequelize.define("Autores", {
    idAutor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombreAutor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Autor;