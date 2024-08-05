const mongoose = require('mongoose');

const recipesSchema = mongoose.Schema({
    name: String,
    tags: [String],
    regime: [String],
    image: String,
    default_serving: Number,
    ing: String,
    steps: [String],
    difficulty: {type : String, enum: ['très facile', 'facile', 'moyen', 'dur']},
    time: Number,
    popularity: Number,
})

//const ingredients

const Recipe = mongoose.model('recipes', recipesSchema);

module.exports = Recipe;