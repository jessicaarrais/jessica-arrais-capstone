const router = require("express").Router();
const usersControler = require("../controllers/usersController");

router.route("/").get(usersControler.getUsers);
router.route("/:userId").get(usersControler.getUser);
router.route("/addUser").post(usersControler.addUser);
router.route("/:userId/updateUser").patch(usersControler.updateUser);
router.route("/:userId/deleteUser").delete(usersControler.deleteUser);

module.exports = router;
