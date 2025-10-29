import { useEffect, useState } from 'react'
import axios from 'axios'

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
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold" style={{color: '#e74c3c'}}>Order Your Pizza</h1>
          <p className="lead" style={{color: '#7f8c8d'}}>Choose from our delicious selection or create your own masterpiece</p>
        </div>
      </div>
      
      <div className="row g-4">
        {isCustom ? (
          <BuildPizza pizza={customPizza} ingredient={ingredients} userId={userId} back={setIsCustom}/>
        ) : (
          pizzas.map((pizza) => (
            <div key={pizza._id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="card h-100 shadow-lg border-0"
                style={{borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.3s, box-shadow 0.3s'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }}
              >
                <img src={pizza.image} className="card-img-top" alt={pizza.name} style={{height: "200px", objectFit: "cover"}}/>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold" style={{color: '#2c3e50'}}>{pizza.name}</h5>
                  <p className="card-text flex-grow-1" style={{color: '#7f8c8d'}}>
                      {pizza.description}
                  </p>
                </div>
                <ul className="list-group list-group-flush"> 
                  {pizza.ingredients.map((ing, i) => (
                    <li className="list-group-item" key={i} style={{backgroundColor: '#f8f9fa'}}>{ing}</li>
                  ))}
                </ul>
                <div className="card-body d-flex justify-content-between">
                  <button 
                    onClick={() => handleClick(pizza._id)} 
                    disabled={status==='idle' ? true : false}
                    className="btn btn-primary me-2"
                    style={{borderRadius: '20px', fontWeight: 'bold', padding: '8px 20px'}}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={()=>handleCustom(pizza)}
                    className="btn btn-outline-primary"
                    style={{borderRadius: '20px', fontWeight: 'bold', padding: '8px 20px'}}
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderPizza
