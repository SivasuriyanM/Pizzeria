var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

let pizzaSchema = new mongoose.Schema({
    id:Number,
    type:String,
    price:Number,
    name:String,
    image:String,
    description:String,
    ingredients:[String],
    topping:[String]
})

let Pizzas = mongoose.model('pizzas', pizzaSchema)


mongoose.connect('mongodb://127.0.0.1:27017/PIZZERIADB',async (err, conn)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected to DB!")
        let pizzas = await Pizzas.find()
        console.log(pizzas[0])
    }

})

/* GET users listing. */
router.get('/',async function(req, res, next) {
    let pizzas = await Pizzas.find().limit(6)
    res.json(pizzas)

});

module.exports = router;
