const Editorial = require("../models/Editorial");

exports.GetEditorial = (req, res, next) => {
    Editorial.findAll({
        order: [
            ['nombreEditorial', 'ASC'],
        ]
    }).then((result) => {
        //Lo que trae es como un JSON por lo cual hay que accesar a el, esto se usa mucho
        const editorial = result.map((result) => result.dataValues);
        res.render("editorial/ListaEditorial", {
            pageTitle: "Mantenimientos de Editoriales",
            EditorialActive: true,
            editoriales: editorial,
            hasEditorial: editorial.length > 0,
        });
    }).catch((err) => {
        console.log(err);
    });
};
exports.GetAddEditorial = (req, res, next) => {
    res.render("editorial/AgregarEditorial", {
        pageTitle: "Añadir Editorial",
        editorialActive: true,
        editMode: false,
    });
};
exports.PostAddEditorial = (req, res, next) => {
    const NombreEditorial = req.body.nombreEditorial;
    const TelefonoEditorial = req.body.telefonoEditorial;
    const PaisEditorial = req.body.paisEditorial;

    Editorial.create({
        nombreEditorial: NombreEditorial,
        telefonoEditorial: TelefonoEditorial,
        paisEditorial: PaisEditorial,
    }).then((result) => {
        res.redirect("/Editoriales");
    }).catch((err) => {
        console.log(err);
    });
};
exports.GetEditEditorial = (req, res, next) => {
    const edit = req.query.edit;
    const IdEditorial = req.params.IdEditorial;

    if (!edit) {
        return res.redirect("/Editoriales");
    }
    Editorial.findOne({ where: { idEditorial: IdEditorial } })
        .then((result) => {
            const editorial = result.dataValues;
            if (!editorial) {
                return res.redirect("/Editoriales");
            }
            res.render("editorial/AgregarEditorial", {
                pageTitle: "Editando editorial",
                editorialActive: true,
                editMode: edit,
                editorial: editorial,
            });
        }).catch((err) => {
            console.log(err);
        });
};
exports.PostEditEditorial = (req, res, next) => {
    const IdEditorial = req.body.idEditorial;
    const NombreEditorial = req.body.nombreEditorial;
    const TelefonoEditorial = req.body.telefonoEditorial;
    const PaisEditorial = req.body.paisEditorial;

    Editorial.update({ nombreEditorial: NombreEditorial, telefonoEditorial: TelefonoEditorial, paisEditorial: PaisEditorial }, { where: { idEditorial: IdEditorial } }).then((result) => {
            return res.redirect("/Editoriales");
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.PostDeleteEditorial = (req, res, next) => {
    const IdEditorial = req.body.idEditorial;

    Editorial.destroy({ where: { idEditorial: IdEditorial } })
        .then((result) => {
            return res.redirect("/Editoriales");
        })
        .catch((err) => {
            console.log(err);
        });
};