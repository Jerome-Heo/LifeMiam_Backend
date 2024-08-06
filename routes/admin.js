var express = require("express");
var router = express.Router();

const Recipe = require("../models/recipes");
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

  module.exports = router;
