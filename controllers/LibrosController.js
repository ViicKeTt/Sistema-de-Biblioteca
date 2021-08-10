const Libro = require("../models/Libro");
const Autor = require("../models/Autor");
const Editorial = require("../models/Editorial");

exports.GetLibros = (req, res, next) => {
    Autor.findAll().then((result) => {
        const hasEditorial = result.map((result) => result.dataValues);

        Editorial.findAll().then((result) => {
            const hasAutor = result.map((result2) => result2.dataValues);

            Libro.findAll({
                order: [
                    ['nombreLibro', 'ASC'],
                ]
            }).then((result) => {
                //Lo que trae es como un JSON por lo cual hay que accesar a el, esto se usa mucho
                const Libro = result.map((result) => result.dataValues);

                res.render("libro/ListaLibros", {
                    pageTitle: "Mantenimientos de libros",
                    LibroActive: true,
                    libro: Libro,
                    hasLibro: Libro.length > 0,
                    autores: hasAutor.length > 0,
                    editoriales: hasEditorial.length > 0,
                });
            });
        });
    });
};

exports.GetAddLibro = (req, res, next) => {
    Autor.findAll().then((result) => {
        const hasEditorial = result.map((result) => result.dataValues);
        Editorial.findAll().then((result) => {
            const hasAutor = result.map((result) => result.dataValues);

            res.render("Libro/AgregarLibro", {
                pageTitle: "Añadir Libro",
                LibroActive: true,
                editMode: false,
                autores: hasAutor.length > 0,
                editoriales: hasEditorial.length > 0,
                autor: hasAutor,
                editorial: hasEditorial,
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
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
                autores: true,
                editoriales: true,
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