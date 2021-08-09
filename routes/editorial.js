const express = require("express");
const router = express.Router();
const editotialontroller = require("../controllers/EditorialController");


router.get("/Editoriales", editotialontroller.GetEditorial);

router.get("/AddEditorial", editotialontroller.GetAddEditorial);
router.post("/Add-Editorial", editotialontroller.PostAddEditorial);

router.get("/EditarEditorial/:IdEditorial", editotialontroller.GetEditEditorial);
router.post("/Editar-Editorial", editotialontroller.PostEditEditorial);

router.post("/EditorialDelete", editotialontroller.PostDeleteEditorial);




module.exports = router;