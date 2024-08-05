var express = require("express");
var router = express.Router();

const Menu = require("../models/menus");
const { checkBody } = require("../modules/checkBody");

const URL = "http://localhost:3000";

//LIST OF ALL MENU ROUTES:
// 1 route to create a menu, can optionnally add recipes; called in MenuTab and menu summary overlay
// POST/menu/new
// required: menuName and user token in req.body
// optional: recipeId, serving if not empty: add the recipe to the menu newly created

// 1 route to add a recipe to a menu, called in RecipeScreen or SearchScreen, can optionally create a menu if not existing in db
// PUT/menu/:menuId
//  required: user token in req.body, serving

router.post("/new", (req, res) => {
  res.json({ result: "route POST menu" });
});

router.put("/:menuId", (req, res) => {
  res.json({ result: "route PUT menu" });
});

/* GET recipes listing with parameters. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
