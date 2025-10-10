var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

let ingredientsSchema = new mongoose.Schema({
    id:Number,
    price:Number,
    tname:String,
    image:String,
    
})

let Ingredients = mongoose.model('ingredients', ingredientsSchema)


mongoose.connect('mongodb://127.0.0.1:27017/PIZZERIADB',async (err, conn)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected to DB!")
        
        
    }

})

/* GET users listing. */
router.get('/',async function(req, res, next) {
    // res.send("List of ingredients!!")
    let ingredients = await Ingredients.find()
    res.json(ingredients)
});

module.exports = router;
