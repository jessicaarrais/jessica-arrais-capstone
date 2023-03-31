const router = require("express").Router();
const propertiesControler = require("../controllers/propertiesController");

router.route("/").get(propertiesControler.getProperties);
router.route("/:properties").get(propertiesControler.getProperty);
router.route("/addProperty").post(propertiesControler.addProperty);
router.route("/updateProperty").patch(propertiesControler.updateProperty);
router.route("/deleteProperty").delete(propertiesControler.deleteProperty);
