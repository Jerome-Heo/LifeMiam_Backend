const mongoose = require("mongoose");

const ingredientsSchema = mongoose.Schema({
  ingredients: { type: mongoose.Schema.Types.ObjectId, ref: "recipes" },
  quantity: Number, //should support null value
});

const recipesSchema = mongoose.Schema({
  name: String,
  tags: [String],
  regime: [String],
  image: String,
  default_serving: Number,
  ing: [ingredientsSchema],
  steps: [String],
  difficulty: { type: String, enum: ["très facile", "facile", "moyen", "dur"] },
  time: Number,
  popularity: Number, //should be the count of menus with this recipe
});

const Recipe = mongoose.model("recipes", recipesSchema);

module.exports = Recipe;
