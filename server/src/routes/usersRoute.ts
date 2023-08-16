import * as router from "express";
import * as usersControler from "../controllers/usersController";
import { authorize } from "../middleware/authorize";

const userRoute = router.Router();

userRoute.route("/currentUser").get(authorize, usersControler.getCurrentUser);
userRoute.route("/login").post(usersControler.loginUser);
userRoute.route("/signup").post(usersControler.signupUser);
userRoute.route("/").get(usersControler.getUsers);
userRoute.route("/:userId").get(usersControler.getUser);
userRoute.route("/:userId/update").patch(usersControler.updateUser);
userRoute.route("/:userId/delete").delete(usersControler.deleteUser);

export default userRoute;
