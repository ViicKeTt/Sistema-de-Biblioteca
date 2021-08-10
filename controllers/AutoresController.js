const Autor = require("../models/Autor");

exports.GetAutores = (req, res, next) => {
    Autor.findAll({
        order: [
            ['nombreAutor', 'ASC'],
        ]
    }).then((result) => {
        //Lo que trae es como un JSON por lo cual hay que accesar a el, esto se usa mucho
        const autores = result.map((result) => result.dataValues);

        res.render("autor/ListaAutores", {
            pageTitle: "Mantenimientos de Autores1",
            AutorActive: true,
            autor: autores,
            hasAutor: autores.length > 0,
        });
    }).catch((err) => {
        console.log(err);
    });
};
exports.GetAddAutor = (req, res, next) => {

    res.render("autor/AgregarAutor", {
        pageTitle: "Añadir Autor",
        AutorActive: true,
        editMode: false,
    });
};
exports.PostAddAutor = (req, res, next) => {
    const NombreAutor = req.body.nombreAutor;
    const correoAutor = req.body.correo;

    Autor.create({
        nombreAutor: NombreAutor,
        correo: correoAutor,
    }).then((result) => {
        res.redirect("/Autores");
    }).catch((err) => {
        console.log(err);
    });
};
exports.GetEditAutor = (req, res, next) => {
    const edit = req.query.edit;
    const idAutor = req.params.IdAutor;

    if (!edit) {
        return res.redirect("/");
    }

    Autor.findOne({ where: { idAutor: idAutor } })
        .then((result) => {
            const autor = result.dataValues;

            if (!autor) {
                return res.redirect("/");
            }
            console.log(autor);

            res.render("autor/AgregarAutor", {
                pageTitle: "Editando autor",
                AutorActive: true,
                editMode: edit,
                autor: autor,
            });

        })
        .catch((err) => {
            console.log(err);
        });
};

exports.PostEditAutor = (req, res, next) => {
    const IdAutor = req.body.idAutor;
    const Nombre = req.body.nombreAutor;
    const Correo = req.body.Description;

    Autor.update({ nombreAutor: Nombre, correo: Correo }, { where: { idAutor: IdAutor } }).then((result) => {
            return res.redirect("/Autores");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.PostDeleteAutor = (req, res, next) => {
    const idAutor = req.body.idAutor;

    Autor.destroy({ where: { idAutor: idAutor } })
        .then((result) => {
            return res.redirect("/Autores");
        })
        .catch((err) => {
            console.log(err);
        });
};