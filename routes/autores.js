const express = require("express");
const router = express.Router();
const autorController = require("../controllers/AutoresController");


router.get("/Autores", autorController.GetAutores);
router.get("/AddAutor", autorController.GetAddAutor);
router.post("/Add-Autor", autorController.PostAddAutor);

router.get("/EditarAutor/:IdAutor", autorController.GetEditAutor);
router.post("/Editar-Autor", autorController.PostEditAutor);

router.post("/AutorDelete", autorController.PostDeleteAutor);





module.exports = router;