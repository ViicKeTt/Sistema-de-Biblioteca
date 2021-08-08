const Editorial = require("../models/Editorial");

exports.GetEditorial = (req, res, next) => {
    Editorial.findAll().then((result) => {
        //Lo que trae es como un JSON por lo cual hay que accesar a el, esto se usa mucho
        const editorial = result.map((result) => result.dataValues);
        res.render("editorial/ListaEditorial", {
            pageTitle: "Mantenimientos de Editoriales",
            EditorialActive: true,
            autor: editorial,
            hasAutor: editorial.length > 0,
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