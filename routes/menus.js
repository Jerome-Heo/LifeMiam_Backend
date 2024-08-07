var express = require("express");
var router = express.Router();

const Menu = require("../models/menus");
const { checkBody } = require("../modules/checkBody");
const User = require("../models/users");

const URL = "http://localhost:3000";

//LIST OF ALL MENU ROUTES:
// 1 route to create a menu, can optionnally add recipes; called in MenuTab and menu summary overlay
// POST/menus/new
// required: menuName and user token in req.body
// optional: recipeId, serving if not empty: add the recipe to the menu newly created

// 1 route to add a recipe to a menu, called in RecipeScreen or SearchScreen, can optionally create a menu if not existing in db
// PUT/menus/:menuId
//  required: user token in req.body, serving

// 1 route to list the menus of a user
// POST/menus
// required: user token in req.body

//Route pour créer un menu, nécéssite req.body.name et rew.body.token
router.post("/create", (req, res) => {
  if(!checkBody(req.body,['token', 'name'])){
    res.json({ result: false, error: 'Missing or empty fields'});
    return;
  }

  User.findOne({ token: req.body.token }).then(user =>{
    if (user === null) {
      res.json({ result: false, error: 'User not found'});
      return;
    }

    const newMenu = new Menu({
      name: req.body.name,
      owner: user._id
    })

    newMenu.save().then(newDoc => {
      res.json({ result: true, menu: newDoc})
    })
  })
});

router.put("/:menuId/addRecipe/:recipeId", (req, res) => {
  res.json({ result: "route PUT menu" });
});

//Récupérer les menus
 router.get("/:token", function (req, res, next) {
  User.findOne({token: req.params.token})
  .then(user => {
    if(user===null){
      res.json({ result: false, error: 'User not found'});
      return;
    }

    Menu.find({owner: user._id})
    .then(menus =>{
      res.json({ result: true, menus});
    });
  });
}); 

module.exports = router;
