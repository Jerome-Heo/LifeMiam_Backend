const mongoose = require('mongoose');

const ingredientsSchema = mongoose.Schema({
    name: String,
    unit: {type : String, enum: ['cl', 'grammes', 'unités','litres','feuilles','cuillères à café','gousses']},
    category: String,
    regime: {type : String, enum: ['vegan', 'lactose-free', 'arachid-free']}
})

const Ingredient = mongoose.model('ingredients', ingredientsSchema);

module.exports = Ingredient;