var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name:String,
  email:{type:String,unique:true},
  password:String,
  cart:[
    {
      pizzaId:{type:mongoose.Schema.Types.ObjectId, ref:"pizzas"},
      quantity:{type:Number, default:1}
    }
  ]
})
let cartSchema = new mongoose.Schema({
    id:Number,
    type:String,
    price:Number,
    name:String,
    image:String,
    description:String,
    ingredients:[String],
    topping:[String]
})
let Pizzas = mongoose.model('pizzas', cartSchema)

let User = mongoose.model('users', userSchema)

// let admin = new User({
//   name:"admin",
//   email:"admin123@gmail.com",
//   password:"Adminpassword@1",
//   cart:[
//     {
//       pizzaId:"68bfd3ca03d4ec28266fcb8d",
//       quantity:1
//     }
//   ]
// })
// let user1 = new User({
//   name:"user1",
//   email:"user1@gmail.com",
//   password:"User1password@1",
//   cart:[
//     {
//       pizzaId:"68bfd3ca03d4ec28266fcb8e",
//       quantity:1
//     }
//   ]
// })

mongoose.connect('mongodb://127.0.0.1:27017/PIZZERIADB',async (err, conn)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected to DB!")
        // await user1.save()
        // let users = await User.findOneAndUpdate({name:"admin"}, {$push:{cart:[{
        //   pizzaId:"68bfd3ca03d4ec28266fcb8e",
        //   quantity:1
        // }]}})
        // let users = await User.find()
        // console.log(users[0].cart[0].pizzaId)

        // let cartprodID = users[0].cart[0].pizzaId

        // let product = await Pizzas.findOne({_id:cartprodID})
        // console.log(product)

    }

})

/* GET users listing. */


router.get('/', async function(req, res, next) {
  let users = await User.find()
  res.json(users)
  // console.log(users)
});
router.post('/', async function(req, res, next) {
  let newUser = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    cart:[]
  }

  let user = new User(newUser)
  await user.save()
  res.json(user)
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
      // console.log(user.password," === ",password)
      // console.log(user.password === password)
    if(user.password === password){
      res.json(user);
    }else{
      res.status(500).json({ message: "Invalid" });
    }
    
    
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});
router.get('/:userid', async function(req, res, next) {
  let users = await User.findById(req.params.userid)
  res.json(users)
});
router.get('/cart/:userid',async(req, res)=>{
  // console.log(req.params.userid)
  let userCart = await User.findById(req.params.userid).populate("cart.pizzaId")
  // console.log(userCart.cart)
  res.json(userCart.cart)
})

router.put('/addtocart',async(req, res)=>{
  // console.log("call for add to cart")
  let {userId, productId, quantity} = req.body
  // console.log(req.body.userId, " ",req.body.productId )
  let user = await User.findById(userId).populate("cart.pizzaId");

  let item = user.cart.find((pizza)=>{
    if(pizza.pizzaId._id.toString() === productId.toString()){
      return true
    }else{
      return false
    }
    // console.log(pizza.pizzaId._id.toString()," ", productId.toString())
  })
  // console.log(item)
  if(item){
    item.quantity += quantity
  }else{
    user.cart.push({
        pizzaId: productId,
        quantity: quantity
      });
  }
  await user.save();
  res.json(user.cart)
})
router.put('/addmodified',async(req, res)=>{
  console.log("call for addmodified")
  let {userId, productId,ingName, quantity, total} = req.body
  console.log(userId, " ",productId , " ", quantity," ",total )
  res.send("works")
  let user = await User.findById(userId).populate("cart.pizzaId");
  let pizza = await Pizzas.findById(productId)
  let allPizzas = await Pizzas.find()
  // console.log(user)
  // console.log(pizza)
  let newId = allPizzas.length+1
  let ing = [...pizza.ingredients, ...ingName]
  let modifeidPizza = {
    id:newId,
    type:pizza.type,
    price:total,
    name:pizza.name+" Customized",
    image:pizza.image,
    description:pizza.description,
    ingredients:ing,
    topping:pizza.topping
  }
  // console.log(modifeidPizza)
  await Pizzas.create(modifeidPizza)
  let customPizza = await Pizzas.findOne({id:newId})
  // console.log(customPizza)
  let item = user.cart.find((pizza)=>{
    if(pizza.pizzaId._id.toString() === customPizza._id.toString()){
      return true
    }else{
      return false
    }
    // console.log(pizza.pizzaId._id.toString()," ", productId.toString())
  })
  console.log(item)
  if(item){
    item.quantity += quantity
  }else{
    user.cart.push({
        pizzaId: customPizza._id,
        quantity: quantity
      });
  }
  await user.save();
  // let upuser = await User.findById(userId).populate("cart.pizzaId");
  // console.log(upuser)
  // res.json(user.cart)
})

router.put('/addurownpizza',async(req, res)=>{
  console.log("call for addurownpizza")
  let { userId, ingName, total} = req.body
  console.log(userId, " ", ingName," ",total )
  res.send("works")
  let user = await User.findById(userId).populate("cart.pizzaId");
 
  let allPizzas = await Pizzas.find()
  // console.log(user)
  // console.log(pizza)
  let newId = allPizzas.length+1
  let ownPizza = {
    id:newId,
    type:"veg",
    price:200+total,
    name:"Your Custom Pizza",
    image:"https://thumb7.shutterstock.com/display_pic_with_logo/2793292/246331354/stock-photo-pizza-margherita-italian-246331354.jpg",
    description:"This is popular italian pizza flavoured with BBA sauce, flavored butter. it has spongy base which gives unique taste with multiple toppings",
    ingredients:ingName,
    topping:[
                "Pepperoni",
                "Fried Onion",
                "Chicken Meat ball",
                "Chicken Sausage",
                "Chicken keema"
        ]
  }
  // console.log(modifeidPizza)
  await Pizzas.create(ownPizza)
  let customPizza = await Pizzas.findOne({id:newId})
  // console.log(customPizza)
  let item = user.cart.find((pizza)=>{
    if(pizza.pizzaId._id.toString() === customPizza._id.toString()){
      return true
    }else{
      return false
    }
    // console.log(pizza.pizzaId._id.toString()," ", productId.toString())
  })
  console.log(item)
  if(item){
    item.quantity += 1
  }else{
    user.cart.push({
        pizzaId: customPizza._id,
        quantity: 1
      });
  }
  await user.save();
  let upuser = await User.findById(userId).populate("cart.pizzaId");
  console.log(upuser)
  // res.json(user.cart)
})
router.put('/updatequat', async(req, res)=>{
  let {userId, productId, action} = req.body

  if(action==='inc'){

    let user = await User.updateOne({_id:userId, 'cart._id':productId},
  { $inc: { "cart.$.quantity": 1 } })
}
  else if(action==='dec'){
    let user = await User.updateOne({_id:userId, 'cart._id':productId},
  { $inc: { "cart.$.quantity": -1 } })
  }
  res.send("Worked")
   
})
router.delete('/removefromcart',async(req, res)=>{
  let {userId, productId} = req.body
  // console.log(userId, " ", productId )
  let user = await User.findById(userId)
  
   user.cart = user.cart.filter(
      (item) => item._id.toString() !== productId
    );
    
    await user.save();

  res.send("removed")

})

module.exports = router;
