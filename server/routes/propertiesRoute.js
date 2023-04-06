const router = require("express").Router();
const propertiesControler = require("../controllers/propertiesController");

router.route("/").get(propertiesControler.getAllProperties);
router.route("/filter").get(propertiesControler.getFilteredProperties);
router.route("/:propertyId").get(propertiesControler.getProperty);
router.route("/add").post(propertiesControler.addProperty);
router.route("/:propertyId/update").patch(propertiesControler.updateProperty);
router.route("/:propertyId/delete").delete(propertiesControler.deleteProperty);

module.exports = router;
