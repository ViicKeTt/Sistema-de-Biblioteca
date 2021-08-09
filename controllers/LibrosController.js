const Libro = require("../models/Libro");

exports.GetLibros = (req, res, next) => {
    Libro.findAll().then((result) => {
        //Lo que trae es como un JSON por lo cual hay que accesar a el, esto se usa mucho
        const Libro = result.map((result) => result.dataValues);
        res.render("libro/ListaLibros", {
            pageTitle: "Mantenimientos de libros",
            LibroActive: true,
            libro: Libro,
            hasLibro: Libro.length > 0,
        });
    }).catch((err) => {
        console.log(err);
    });
};
exports.GetAddLibro = (req, res, next) => {
    res.render("Libro/AgregarLibro", {
        pageTitle: "Añadir Libro",
        LibroActive: true,
        editMode: false,
    });
};
exports.PostAddLibro = (req, res, next) => {
    const NombreLibro = req.body.nombreLibro;
    const anoPublicacion = req.body.anoPublicacion;

    Libro.create({
        nombreLibro: NombreLibro,
        anoPublicacion: anoPublicacion,
    }).then((result) => {
        res.redirect("/Libros");
    }).catch((err) => {
        console.log(err);
    });
};
exports.GetEditLibro = (req, res, next) => {
    const edit = req.query.edit;
    const IdLibro = req.params.IdLibro;

    if (!edit) {
        return res.redirect("/Libros");
    }
    Libro.findOne({ where: { idLibro: IdLibro } })
        .then((result) => {
            const libro = result.dataValues;
            if (!libro) {
                return res.redirect("/Libros");
            }
            res.render("libro/AgregarLibro", {
                pageTitle: "Editando Libro",
                LibroActive: true,
                editMode: edit,
                libro: libro,
            });
        }).catch((err) => {
            console.log(err);
        });
};
exports.PostEditLibro = (req, res, next) => {
    const IdLibro = req.body.idLibro;
    const NombreLibro = req.body.nombreLibro;
    const AnoPublicacion = req.body.anoPublicacion;

    Libro.update({ nombreLibro: NombreLibro, anoPublicacion: AnoPublicacion }, { where: { idLibro: IdLibro } }).then((result) => {
        return res.redirect("/Libros");
    }).catch((err) => {
        console.log(err);
    });
};
exports.PostDeleteLibro = (req, res, next) => {
    const IdLibro = req.body.idLibro;

    Libro.destroy({ where: { idLibro: IdLibro } })
        .then((result) => {
            return res.redirect("/Libros");
        })
        .catch((err) => {
            console.log(err);
        });
};