var express = require("express");
var router = express.Router();

const Recipe = require("../models/recipes");


const Recipe2 = require("../models/recipescopy");
const Ingredient = require("../models/ingredients");
const Ingredient2 = require("../models/ingredientscopy");

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

const uid2 = require('uid2');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


router.get("/all", function (req, res, next) {
    Recipe.find()
    .then((data)=>{
      res.json({result:true,data})
    })
  })


/*
* route d'edition pour pouvoir editer les images
*/
router.post("/addpicture", async (req, res) => {
    const uniqid = uid2(16);
    const photoPath = `./tmp/${uniqid}.jpg`;
  
  
     const resultMove = await req.files.file.mv(photoPath);
  
    // récupérer les datas
    // ajouter l'image a cloudinary
    if (!resultMove) 
    {
        const resultCloudinary = await cloudinary.uploader.upload(photoPath);
        fs.unlinkSync(photoPath);
        res.json({ result: true, url: resultCloudinary.secure_url });  
    } 
    else 
    {
        res.json({ result: false, error: resultMove });
    }
    // si la recette a déja une url cloudinary en base , je la remove et je la remplace
    // sinon je 
  
    // save la recipe
    
  
  })
  router.put("/edit", async (req, res) => {
  
    Recipe.updateOne({_id: req.body.id}, {$set: {
      id:req.body.id,
      name:req.body.name,
      tags:req.body.tags,
      regime:req.body.regime,
      default_serving:req.body.default_serving,
      difficulty:req.body.difficulty,
      time:req.body.time,
      popularity:req.body.popularity,
      image:req.body.image}}).
      then((data)=>
      {
        res.json(data)
      })
  })


  /*
  * route qui permet de transformer les ingrédients en string d'une recette en objectIds
  */
  router.get("/transformrecipe/:id", (req, res) =>
  {
    if (!checkBody(req.params, ['id'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    Recipe2.find({_id : req.params.id})
    .then((data) => {
          // je récupère la recette 
        // pour chaque ingrédient 
        for(let ingredient of data[0].ing)
        {
            // console.log({ingredient : ingredient._id}) // a remplacer par le nouveau
            // console.log({ingredient : ingredient.ingredient}) 
            Ingredient2.findOne({name : { $regex: new RegExp(`\\b${ingredient.ingredient}\\b`, "i") }})
            .then((data) => {
                //console.log(data.id)

                    // viser l'ingredient dans la recette et remplacer son id par celui ci
                    // Recipe2.find({_id : req.params.id})
                  Recipe2.findOneAndReplace(
                        { _id: req.params.id, ing:{ingredient :  ingredient.ingredient}}  ,
                        {
                        $set
                        }).then((data)=>
                        {
                            console.log(data)
                           
                        })
                   
               
            })
        }

        {
            res.json({result:true,data :data})
           }
    


    })

  })
  // j'apppelle la route a qui j'ai donné l'id d'une recette

    // je vérifie que le nom de l'ingrédient existe dans la table ingredients
    // s'il existe je récupère son id , je l'écris dans la recette à la place du string ingredient



  module.exports = router;
