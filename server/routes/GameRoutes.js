const { getGameData } = require("../controllers/GameController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = require("express").Router();

router.get("/gamedata/:roomId", isAuthenticated, getGameData);

module.exports = router;
