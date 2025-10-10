

// import React from 'react'

// function CustomizePizza() {
//   return (
//     <>
//        {/* <div className="container my-4">
//       <div className="row">
//         {pizzas.map((pizza) => (
//           <div className="col-md-6 mb-4" key={pizza.id}>
//             <div className="card h-100">
//               <div className="row g-0">
//                 {/* Image */}
//                 {/* <div className="col-md-4 d-flex align-items-center justify-content-center p-2">
//                   <img
//                     src={pizza.img}
//                     alt={pizza.name}
//                     className="img-fluid rounded"
//                   />
//                 </div>
//                 {/* Content */}
//                 {/* <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title">{pizza.name}</h5>
//                     <p className="text-muted">₹{pizza.price}</p>
//                     <p className="card-text">{pizza.description}</p>
//                     <p className="mb-1">
//                       <strong>{pizza.ingredients}</strong>
//                     </p>
//                     <p className="mb-2">{pizza.toppings}</p>
//                     <button className="btn btn-warning">Add to Cart</button>
//                   </div>
//                 </div>
//               </div>
//             </div> */}
//           {/* </div> */} 
//     {/* //     ))} */}
//     {/* //   </div> */}
//     {/* // </div> */}
//     <div className="container my-5">
//       <h2 className="text-center mb-4">Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-center">Your cart is empty</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table align-middle table-bordered">
//             <thead className="table-light">
//               <tr>
//                 <th>Item</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Subtotal</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item, index)=> (
//                 <tr key={item.id}>
//                   <td>
//                     <img
//                       src={item.pizzaId.image}
//                       alt={item.pizzaId.name}
//                       style={{ width: "70px", height: "70px" }}
//                       className="rounded"
//                     />
//                   </td>
//                   <td>{item.pizzaId.name}</td>
//                   <td>₹{item.pizzaId.price}</td>
//                   <td>
//                     <div className="d-flex align-items-center">
//                       <button
//                         className="btn btn-sm btn-outline-secondary me-2"
//                         onClick={() => handleCount('dec',cart._id)}
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         className="btn btn-sm btn-outline-secondary ms-2"
//                         onClick={() => handleCount('inc',cart._id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td>₹{item.pizzaId.price * item.quantity}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(cart._id)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
         
//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <h4>Total: ₹{total}</h4>
//             <button className="btn btn-warning btn-lg">Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   )
// }

// export default CustomizePizza





// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useSelector } from 'react-redux'

// function Cart() {
//     const [cart, setcart] = useState([])
//     let user = useSelector((store)=>store.user.user)
//     console.log(user._id.toString())
    
//     let userId = user._id.toString()
//     useEffect(()=>{
//         axios.get(`http://localhost:8080/users/cart/${userId}`).then((res)=>setcart(res.data)).catch((err)=>console.log(err))
//     })//[userId, cart]
//     const handleDelete = (productId) =>{
      
//       axios.delete("http://localhost:8080/users/removefromcart/",{data:{userId,productId}})
//       .then((res)=>console.log(res.data,"Updated!!")).catch((e)=>console.log(e))
//     }
//     let handleCount = (action,productId) =>{
      
//       axios.put("http://localhost:8080/users/updatequat/",{userId,productId, action})
//       .then((res)=>console.log(res.data,"Updated!!")).catch((e)=>console.log(e))
//     }
//     const [total,setTotal] =useState(0)
//     useEffect(()=>{
//       let total =0
//       for(let i = 0; i<cart.length;i++){
//         total += cart[i].pizzaId.price*cart[i].quantity
//       }
//       setTotal(total)
//     },[cart])
    
        

         
      
    
//   return (
    
//     // <div>{cart.map((cart, index)=><ul key={index}>
        
//     //     <li>{cart.pizzaId.name}</li>
//     //     <button onClick={()=>handleCount('inc',cart._id)}>+</button>
//     //     <li>{cart.pizzaId.price}</li>
//     //     <li>{cart.quantity}</li>
//     //     <button onClick={()=>handleCount('dec',cart._id)}>-</button>
//     //     <button onClick={()=>handleDelete(cart._id)}>remove</button>
//     // </ul>)}
//     // <h3>{total}</h3>
//     // </div>
//     <div className="container my-5">
//       <h2 className="text-center mb-4">Shopping Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-center">Your cart is empty</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table align-middle table-bordered">
//             <thead className="table-light">
//               <tr>
//                 <th>Item</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Subtotal</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item,index)=> (
//                 <tr key={index}>
//                   <td>
//                     <img
//                       src={item.pizzaId.image}
//                       alt={item.pizzaId.name}
//                       style={{ width: "70px", height: "70px" }}
//                       className="rounded"
//                     />
//                   </td>
//                   <td>{item.pizzaId.name}</td>
//                   <td>₹{item.pizzaId.price}</td>
//                   <td>
//                     <div className="d-flex align-items-center">
//                       <button
//                         className="btn btn-sm btn-outline-secondary me-2"
//                         onClick={() => handleCount('dec',item._id)}
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         className="btn btn-sm btn-outline-secondary ms-2"
//                         onClick={() => handleCount('inc',item._id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td>₹{item.pizzaId.price * item.quantity}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
         
//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <h4>Total: ₹{total}</h4>
//             <button className="btn btn-warning btn-lg">Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
   
//   )
// }

// export default Cart