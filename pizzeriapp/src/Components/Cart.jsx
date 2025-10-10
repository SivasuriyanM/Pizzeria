import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const user = useSelector((store) => store.user.user);
  console.log(user)
  const userId = user?._id?.toString();

 
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/cart/${userId}`);
      setCart(res.data);
      console.log(res.data)
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };


  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  
  const handleDelete = async (productId) => {
    try {
      await axios.delete("http://localhost:8080/users/removefromcart/", {
        data: { userId, productId },
      });
      fetchCart(); 
    } catch (e) {
      console.log("Error deleting item:", e);
    }
  };

 
  const handleCount = async (action, productId) => {
    try {
      await axios.put("http://localhost:8080/users/updatequat/", {
        userId,
        productId,
        action,
      });
      fetchCart(); 
    } catch (e) {
      console.log("Error updating quantity:", e);
    }
  };

  
  useEffect(() => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += item.pizzaId.price * item.quantity;
    });
    setTotal(totalAmount);
  }, [cart]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-bordered">
            <thead className="table-light">
              <tr>
                <th>Item</th>
                <th>Name & Ingredients</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.pizzaId.image}
                      alt={item.pizzaId.name}
                      style={{ width: "70px", height: "70px" }}
                      className="rounded"
                    />
                  </td>
                  <td><strong className='fs-4'>{item.pizzaId.name}</strong>
                   <ul  className="text-start fs-6 text-capitalize fst-italic fw-lighter  ">{item.pizzaId.ingredients.map((ing,i)=><li key={i}>{ing}</li>)}</ul></td>
                  <td>₹{item.pizzaId.price}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleCount("dec", item._id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => handleCount("inc", item._id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹{item.pizzaId.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ₹{total}</h4>
            <button className="btn btn-warning btn-lg">Checkout</button>
          </div>
        </div>
      )}
    </div>
    // <>
    // {cart.map((item, index)=><span key={index}>{item.pizzaId.name}</span>)}
    // </>
  );
}

export default Cart;
