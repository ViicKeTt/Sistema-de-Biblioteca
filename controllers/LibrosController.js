const Libro = require("../models/Libro");


exports.GetLibros = (req, res, next) => {
    Libro.findAll().then((result) => {
        //Lo que trae es como un JSON por lo cual hay que accesar a el, esto se usa mucho
        const libro = result.map((result) => result.dataValues);
        res.render("libro/ListaLibros", {
            pageTitle: "Mantenimientos de Libros",
            LibrosActive: true,
            libro: libro,
            hasLibro: libro.length > 0,
        });
    }).catch((err) => {
        console.log(err);
    });
};