exports.Index = (req, res, next) => {
    //OJO no lleva "/" para el llamado de una pagina

    res.render("home", {
        pageTitle: "Mantenimientos de libros",
        homeActive: true,
        // editMode: false,
    });
};