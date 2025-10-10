import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import BuildPizza from './BuildPizza'

function OrderPizza() {
  const [pizzas, setPizzas] = useState([])
  const user = useSelector((store) => store.user.user)
  const status = useSelector((store) => store.user.status)
   const userId = user?._id?.toString();
  
  // console.log("userfromop",user)
 
  
  const [isCustom, setIsCustom] = useState(false)
  const [customPizza, setCustomPizza] = useState()
 const [ingredients, setIngredient] = useState([])
  useEffect(()=>{
        axios.get('http://localhost:8080/getingredients').then((res)=>setIngredient(res.data)).catch((err)=>console.log(err))
    },[])
  useEffect(() => {
    axios.get('http://localhost:8080/getpizzas')
      .then((res) => setPizzas(res.data))
      .catch((err) => console.log(err))
  }, [])

  const handleClick = async (productId) => {
    try {
      const data = { userId, productId, quantity: 1 } 
      await axios.put(`http://localhost:8080/users/addtocart`, data).then((res)=>{
        console.log(res.data, "Updated!!")
        alert("Product Added",res.data)
      })
      
    } catch (e) {
      console.log(e)
    }
  }
  let handleCustom = (pizza) =>{
      setCustomPizza(pizza)
      setIsCustom(true)
  }

  return (
    <div className="container ">
    <div className="row">
      {isCustom?<BuildPizza pizza = {customPizza} ingredient={ingredients} userId={userId} back={setIsCustom}/>:
      pizzas.map((pizza) => (
        <div className="col-md-6 " key={pizza._id}>
          <div className="card">
            <div className="row g-0  ">
              <div className="col-md-4  " >
                 <h5 className="card-title fs-5">{pizza.name}</h5>
                 
                  <p style={{width:"2vw", height:"4vh", marginLeft:"35%", backgroundColor:pizza.type==="veg"?"green":"red"}}>
                  
                 </p>
                 
                 <p className="text-muted fw-bold ">₹{pizza.price}</p>
                  <button className="btn btn-primary btn-sm"onClick={()=>handleCustom(pizza)}>Customize </button>
                 
              </div>
              
              <div className="col-md-6 d-flex align-items-center justify-content-center ">
                <div className="card-body ">
                   
                    <p  style={{fontSize:"60%"}}className="card-text text-start">{pizza.description}</p>
                    <p  style={{fontSize:"60%"}}className="text-start fw-lighter">
                      <span ><strong>Ingredients :</strong>{pizza.ingredients.map((ing, i)=><span key={i}>{ing+", "}</span>)}</span>
                    </p>
                    
                    <p  style={{fontSize:"60%"}}className=" text-start"> <strong>Toppings :</strong>{pizza.topping.map((tp,index)=><span  key={index}>{tp+", "}</span>)}</p>

                   
                </div>
                <div className="col-md-4 ">
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    style={{width:"150%", height:"150%"}}
                  />
                   <button style={{width:"150%"}} className=" btn btn-warning btn-sm" onClick={() => handleClick(pizza._id) } disabled={status==='idle'?true:false}>Add to Cart</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default OrderPizza
