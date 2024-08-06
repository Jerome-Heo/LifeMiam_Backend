const mongoose = require("mongoose");

const ingredientsSchema = mongoose.Schema({
  ingredients: { type: mongoose.Schema.Types.name, ref: "recipes" },
  quantity: Number, //should support null value
});

const recipesCopySchema = mongoose.Schema({
  name: String,
  tags: [String],
  regime: [String],
  image: String,
  default_serving: Number,
  ing: [ingredientsSchema],
  steps: [String],
  difficulty: Number,
  time: Number,
  popularity: Number, //should be the count of menus with this recipe
  ustensiles: [String],
  temps_preparation: Number,
  temps_cuisson: Number,
});

const RecipeCopy = mongoose.model("recipes", recipesCopySchema);

module.exports = RecipeCopy;
