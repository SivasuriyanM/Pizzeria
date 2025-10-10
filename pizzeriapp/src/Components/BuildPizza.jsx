import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
function BuildPizza({pizza,ingredient, userId, back}) {
   
  // console.log(pizza.price)
  // console.log(ingredient)  
  const [selectedItems, setSelectedItems] = useState([]);
   const[ingName, setIngName] = useState([])
  const [total, setTotal] = useState(parseInt(pizza.price));
  const status = useSelector((store) => store.user.status)
  let navigate = useNavigate()
  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item.id)) {
      console.log('incl')
      // Remove item
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
       setIngName(ingName.filter((name) => name !== item.tname));
      setTotal(total - item.price);
    } else {
      console.log('not incl',item.price)
      // Add item
      
      setSelectedItems([...selectedItems, item.id]);
      setIngName([...ingName, item.tname]);
      setTotal(total + item.price);
     
    }
    // console.log(total)

  }  
    const handleClick = async (total) => {
    try {
      console.log("clicked custom cart")
      const data = { userId, productId:pizza._id, quantity: 1, total, ingName } 
      await axios.put(`http://localhost:8080/users/addmodified`, data).then((res)=>{
        console.log(res.data, "Updated!!")
        alert("Product Added",res.data)
        navigate('/cart')
      }).catch((e)=>console.log(e))
      
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div>
      <div className="container mt-3">
      <p>Pizzeria now gives you options to Customize your pizza by choosing ingredients from the given list below</p>
      <table className="table align-middle ">
        {ingredient.map((item) => (
         
          
            <tbody >
              <tr key={item.id}>
                
                <td>
                  <img
                    src={item.image}
                    style={{ width: "75px", height: "75px" }}
                    alt={item.tname}
                  />
                </td>

                
                <td className="fw-bold ">
                  <span >{item.tname}</span>&nbsp;
                  <span>₹{item.price}</span>
                </td>

                <td>
                  <div style={{color:"#FFBF00"}}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item)}
                      className="form-check-input me-2 fs-5"
                    />
                    Add
                  </div>
                </td>
              </tr>
            </tbody>
          
        ))}
      </table>
      <div className="mt-3" style={{color:"darkblue"}}>
        <h5>Total: ₹{total}</h5>
      </div>
    </div>
    <button className="btn btn-danger  btn-lg" onClick={()=>back(false)}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;
    <button className="btn btn-dark btn-lg" onClick={()=>handleClick(total) }  disabled={status==='idle'?true:false}>Proceed</button>
      {/* {ingredient.map((ingredient, index)=><ul key={index}>
        
        <li>{ingredient.tname}</li>
    </ul>)} */}
    </div>
    
  )
}

export default BuildPizza