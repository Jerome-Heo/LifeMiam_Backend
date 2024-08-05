var express = require("express");
var router = express.Router();

const Recipe = require("../models/recipes");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

const URL = "http://localhost:3000";

//LIST OF ALL MENU ROUTES:
// 1 route to create a recipe for testing purposes, with all fields
// POST/menus/new
// required: menuName and user token in req.body
// optional: recipeId, serving if not empty: add the recipe to the menu newly created
router.post("/new", (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    tags: req.body.tags,
    regime: req.body.regime,
    image: req.body.image,
  });
});

// 1 route to get recipes based on multiple criteria: popularity, limit, search input, tags
// GET/recipes/?search="crepe"&limit=10&tags="lactose-free"&sortBy=popularity
// required: user token in req.body
//or array=["foo","bar"] puis JSON.parse()
// optional: recipeId, serving if not empty: add the recipe to the menu newly created

/* GET recipes listing with parameters. */
router.get("/", function (req, res, next) {
  // if (!checkBody(req.body, ["token"])) {
  //   res.json({ result: false, error: "Missing user token" });
  //   return;
  // }

  // User.findOne({ token: req.body.token }).then((user) => {
  //   // console.log(req.query);
  //   if (user === null) {
  //     res.json({ result: false, error: "User not found" });
  //   }
  //   return;
  // });

  if (req.query.sortBy === "popularity" && req.query.limit) {
    Recipe.find({}, ["_id", "name", "image", "popularity"], {
      skip: 0,
      limit: req.query.limit,
      sort: {
        popularity: -1,
      },
    }).then((data) => {
      // console.log(data);
      res.json({ result: true, data });
    });
    return;
  }

  if (req.query.search && req.query.tags) {
    console.log(req.query.tags);

    Recipe.find({
      name: { $regex: new RegExp(req.query.search, "i") },
      tags: { $all: req.query.tags },
    }).then((data) => {
      // console.log(data);
      res.json({ result: true, data });
    });
  }

  // console.log(req.query);
  // gerer les accents dans la recherche
});

module.exports = router;
