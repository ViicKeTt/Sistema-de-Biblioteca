const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Libro = sequelize.define("Libros", {
    idLibro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombreLibro: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    anoPublicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Libro;