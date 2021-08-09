const express = require("express");
const router = express.Router();
const libroController = require("../controllers/LibrosController");


router.get("/Libros", libroController.GetLibros);

router.get("/AddLibro", libroController.GetAddLibro);
router.post("/Add-Libro", libroController.PostAddLibro);

router.get("/EditLibro/:IdLibro", libroController.GetEditLibro);
router.post("/Edit-Libro", libroController.PostEditLibro);

router.post("/DelteLibro", libroController.PostDeleteLibro);





module.exports = router;