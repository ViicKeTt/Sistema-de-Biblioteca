const express = require("express");
const router = express.Router();
const libroController = require("../controllers/LibrosController");


router.get("/Libros", libroController.GetLibros);




module.exports = router;