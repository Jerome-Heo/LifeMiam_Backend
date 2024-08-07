const mongoose = require('mongoose');

const ingredientsSchema = mongoose.Schema({
    name: String,
    quantity: Number,
    category: String,
})


const shopSchema = new Schema({

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: "recipes" },
    Ingredients: { ingredientsSchema }
})

const Shop = mongoose.model("shop", shopSchema);

module.exports = Shop;