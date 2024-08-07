var express = require('express');
var router = express.Router();
const shop = require("../models/shop")
const { checkBody } = require('../modules/checkBody');
const uid2 = require("uid2");
const URL = "http://localhost:3000";

//je dois écrire des routes dans un ficher "shop.js" pour que les ingrédients des recettes de ma BDD apparaissent sur l'écran "ListScreen"

// Route pour récupérer les ingrédients des recettes contenus dans un menu pour alimenter la liste de courses (ListScreen)
//pré requis: besoin d'un token pour obtenir le user_id et le menu_id, 

//Utiliser findOne pour:
//rechercher le user_id grâce au token
//rechercher le menu avec le menu_id
//comparer le user_id à l'owner (au propriétaire) du menu
//async await parce que 2 requêtes en même temps
// const userLoggin = async (req, res) => {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(401).json({ error: 'Token manquant' });
//   }
// }
//SI l'user_id = owner je récupère les recettes du menu
//Je récupère le tableau des recettes du menu
// Nouvelle variable const ou let = []
//Boucler sur le tableau des recettes (FOR) 
//Récupérer les ingrédients de la recette []
//Pour chacun d'entre eux, récupérer le nom, l'unité, sa quantité et sa catégorie
//A la sortie, la réponse ressemblera à [{name: "pomme", unit: "unité", quantity: 3, category: "fruits"}]

// Menu.findOne({owner: user._id, menu_Id: menu.id})
// .populate('menu_recipes.recipe')
// .then(menus =>{
//   res.json({ menus });
// });
router.get('/ingredients', async (req, res) => {

});


// S'il est différent, ERREUR

module.exports = router;
