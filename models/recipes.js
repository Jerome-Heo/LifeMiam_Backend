const mongoose = require('mongoose');

const recipesSchema = mongoose.Schema({
    name: String,
    tags: Array[String],
    regime: Array[String],
    image: String,
    default_serving: Number,
    ing: Array[Object, Number],
    steps: Array[String],
    difficulty: Enumerator,
    time: Number,
    popularity: Number,
})

const Recipe = mongoose.model('recipes', recipesSchema);

module.exports = Recipe;