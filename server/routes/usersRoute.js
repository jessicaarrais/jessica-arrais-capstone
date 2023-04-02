const router = require("express").Router();
const usersControler = require("../controllers/usersController");
const authorize = require("../middleware/authorize");

router.route("/currentUser").get(authorize, usersControler.getCurrentUser);
router.route("/login").get(usersControler.loginUser);
router.route("/signup").post(usersControler.signupUser);
router.route("/").get(usersControler.getUsers);
router.route("/:userId").get(usersControler.getUser);
router.route("/:userId/update").patch(usersControler.updateUser);
router.route("/:userId/delete").delete(usersControler.deleteUser);

module.exports = router;
