const router = require("express").Router();
const propertiesControler = require("../controllers/propertiesController");

router.route("/").get(propertiesControler.getAllProperties);
router.route("/:propertyId").get(propertiesControler.getProperty);
router.route("/:userId/add").post(propertiesControler.addProperty);
router.route("/:propertyId/update").patch(propertiesControler.updateProperty);
router
  .route("/:propertyId/:userId/delete")
  .delete(propertiesControler.deleteProperty);

module.exports = router;
