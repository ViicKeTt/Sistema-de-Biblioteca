const express = require("express");
const path = require('path');
const expressHbs = require("express-handlebars"); //Handlebars 
const sequelize = require("./utils/database");

//Models
const Autor = require("./models/Autor");
const Editorial = require("./models/Editorial");
const Libro = require("./models/Libro");

//Importar Rutas
const homeRouter = require("./routes/home");
const autorRouter = require("./routes/autores");
const editorialRouter = require("./routes/editorial");
const libroRouter = require("./routes/libros");

//Controller para el 404 not found
const errorController = require("./controllers/ErrorController");

//Me ayuda a Traer datos
const compareHelpers = require('./utils/hbs/compare');


// Uso de Express
const app = express();

// Para usar handlerbars 
app.engine("hbs", expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
    helpers: {
        equalValue: compareHelpers.EqualValue,
    },
}));
app.set("view engine", "hbs");
app.set("views", "views");

// para trabajar con POST
app.use(express.urlencoded({ extended: false }));

//Esto hece publica una carpeta para su uso, OJO, que para uso en path no debe tomarse el nombre de la carpeta 
//en este caso "public".
app.use(express.static(path.join(__dirname, "public")));

// Uso de Rutas
app.use(homeRouter);
app.use(autorRouter);
app.use(editorialRouter);
app.use(libroRouter);

//Esto indica la relaciones en la base de datos OJO, que para hacr esto tiene que hacer la relacion en los dos sentidos
// Heroes.belongsTo(Races,{constraint: true,onDelete:"CASCADE"});
// Races.hasMany(Heroes);

app.use("/", errorController.Get404);

// Relalaciones
Libro.belongsTo(Autor, { constraint: true, onDelete: "CASCADE" });
Autor.hasMany(Libro);

Libro.belongsTo(Editorial, { constraint: true, onDelete: "CASCADE" });
Editorial.hasMany(Libro);

// { force: true }  /Para forzar la BD
sequelize.sync().then(result => {
    app.listen(6001);

}).catch(err => {
    console.log(err);
});