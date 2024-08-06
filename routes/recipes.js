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
  // if (
  //   req.query.sortBy === null ||
  //   req.query.sortBy === "" ||
  //   req.query.search === null ||
  //   req.query.search === "" ||
  //   req.query.tags === null ||
  //   req.query.tags === ""
  // ) {
  //   res.json({ result: false, error: "Missing mandatory fields" });
  //   return;
  // }

  if (
    ||
    (!checkBody(req.query, ["search"]) && !checkBody(req.query, ["tags"]))
  ) {
    res.json({ result: false, error: "Missing mandatory fields" });
    return;
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // to display recipes sort by popularity
  if (!checkBody(req.query, ["sortBy"]) && req.query.sortBy === "popularity") {
    // if (!checkBody(req.query, ["limit", "page"])) {
    //   res.json({ result: false, error: "Missing or empty fields" });
    //   return;
    // }

    Recipe.find({}, ["_id", "name", "image", "popularity"], {
      skip: offset,
      limit: limit,
      sort: {
        popularity: -1,
      },
    }).then((data) => {
      data.length > 0
        ? res.json({ result: true, count: data.length, data })
        : res.json({ result: false, error: "Cannot find popular recipes" });
    });
    return;
  }

  // to search input and tags filter results
  if (req.query.search && req.query.tags) {
    const tagFilters = JSON.parse(req.query.tags);

    Recipe.find({
      name: { $regex: new RegExp(`\\b${req.query.search}\\b`, "i") },
      tags: { $all: tagFilters },
      skip: offset,
      limit: limit,
    }).then((data) => {
      data.length > 0
        ? res.json({ result: true, count: data.length, data })
        : res.json({ result: false, error: "No result found" });
    });
    return;
  }

  // if search input without tags filter
  if ((req.query.tags === "" || req.query.tags === null) && req.query.search) {
    const tagFilters = JSON.parse(req.query.tags);

    Recipe.find({
      name: { $regex: new RegExp(`\\b${req.query.search}\\b`, "i") },
      skip: offset,
      limit: limit,
    }).then((data) => {
      data.length > 0
        ? res.json({ result: true, count: data.length, data })
        : res.json({ result: false, error: "No result found" });
    });
    return;
  }

  // TO-DO
  // gerer les accents dans la recherche
  // gerer les whitespaces : hyphens? +?
});

// GET one recipe to display
router.get("/:recipeId/:token", (req, res) => {
  User.findOne({ token: req.params.token }).then((user) => {
    // console.log(req.query);
    if (user === null) {
      res.json({ result: false, error: "User not found" });
    }
    return;
  });

  Recipe.find({ _id: req.params.recipeId })
    .populate()
    .then((data) => {
      console.log(data);
    });
});

module.exports = router;
