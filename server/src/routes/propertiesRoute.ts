import * as router from "express";
import * as propertiesControler from "../controllers/propertiesController";

const propertiesRoute = router.Router()

propertiesRoute.route("/").get(propertiesControler.getAllProperties);
propertiesRoute.route("/:propertyId").get(propertiesControler.getProperty);
propertiesRoute.route("/:userId/add").post(propertiesControler.addProperty);
propertiesRoute.route("/:propertyId/update").patch(propertiesControler.updateProperty);
propertiesRoute
  .route("/:propertyId/:userId/delete")
  .delete(propertiesControler.deleteProperty);

export default propertiesRoute;
