const express = require("express");
const router = express.Router();
const editotialontroller = require("../controllers/EditorialController");


router.get("/Editorial", editotialontroller.GetEditorial);
// router.get("/AddEditorial", editotialontroller.GetAddAutor);
// router.post("/Add-Editorial", editotialontroller.PostAddAutor);





module.exports = router;