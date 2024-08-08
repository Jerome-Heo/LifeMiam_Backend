var express = require('express');
var router = express.Router();
const Shop = require("../models/shop")
const { checkBody } = require('../modules/checkBody');
const Menu = require("../models/menus");
const User = require("../models/users");

//je dois écrire des routes dans un ficher "shop.js" pour que les ingrédients des recettes de ma BDD apparaissent sur l'écran "ListScreen"

// Route pour récupérer les ingrédients des recettes contenus dans un menu pour alimenter la liste de courses (ListScreen)
//pré requis: besoin d'un token pour obtenir le user_id et le menu_id, 


//rechercher le user_id grâce au token
User.findOne({ token: req.body.token }).then(user => {
    if (user === null) {
        res.json({ result: false, error: 'User not found' });
        return;
    }
})

//rechercher le menu avec le menu_id
Menu.findById(req.params.menuId)
    .then(menu => {
        if (!menu) {
            res.json({ result: false, error: 'pas de menu trouvé' })
        }
    })

// Nouvelle variable const ou let = []
const recipes = Menu.recipes;
let ingredientsList = [];

//Boucler sur le tableau des recettes (FOR) 
for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i].recipe;
    recipe.ingredients.forEach(ingredient => {
        //Récupérer les ingrédients de la recette []
        //Pour chacun d'entre eux, récupérer le nom, l'unité, sa quantité et sa catégorie
        //A la sortie, la réponse ressemblera à [{name: "pomme", unit: "unité", quantity: 3, category: "fruits"}]
        ingredientsList.push({
            name: ingredient.name,
            unit: ingredient.unit,
            quantity: ingredient.quantity,
            category: ingredient.category,
        });
    });
    console.log(ingredientsList)
}


router.get('/ingredients', async (req, res) => {
    if (!checkBody(req.body, ['token', 'name'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
});

//comparer le user_id à l'owner du menu
Menu.find({ owner: User._id, menu_id: Menu.id })
    .populate('menu_recipes.recipe')
    //SI l'user_id = owner je récupère les recettes du menu
    .then(menus => {
        res.json({ menus });
    });



module.exports = router;
