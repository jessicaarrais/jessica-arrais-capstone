const router = require("express").Router();
const usersControler = require("../controllers/usersController");

router.route("/").get(usersControler.getUsers);
router.route("/:userId").get(usersControler.getUser);
router.route("/add").post(usersControler.addUser);
router.route("/:userId/update").patch(usersControler.updateUser);
router.route("/:userId/delete").delete(usersControler.deleteUser);

module.exports = router;
