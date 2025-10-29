import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const user = useSelector((store) => store.user.user);
  const userId = user?._id?.toString();

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/users/cart/${userId}`);
      setCart(res.data);
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
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold" style={{ color: '#e74c3c' }}>Your Shopping Cart</h1>
          <p className="lead" style={{ color: '#7f8c8d' }}>Review your items before checkout</p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center">
            <div className="card shadow-sm border-0" style={{ borderRadius: '15px', maxWidth: '500px', margin: '0 auto' }}>
              <div className="card-body p-5">
                <h3 className="card-title mb-3" style={{ color: '#2c3e50' }}>Your cart is empty</h3>
                <p className="card-text mb-4" style={{ color: '#7f8c8d' }}>Looks like you haven't added any items to your cart yet</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            {cart.map((item, index) => (
              <div className="col-12" key={index}>
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2 mb-3 mb-md-0 text-center">
                        <img
                          src={item.pizzaId.image}
                          alt={item.pizzaId.name}
                          className="img-fluid rounded"
                          style={{ height: "120px", width: "120px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 mb-3 mb-md-0">
                        <h5 className="card-title fw-bold" style={{ color: '#2c3e50' }}>{item.pizzaId.name}</h5>
                        <div className="mt-2">
                          <h6 className="text-muted mb-2">Ingredients:</h6>
                          <ul className="list-unstyled mb-0">
                            {item.pizzaId.ingredients.map((ing, i) => (
                              <li key={i} className="d-inline-block me-2 mb-2">
                                <span className="badge bg-light text-dark">{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-2 mb-3 mb-md-0">
                        <p className="mb-1">Price</p>
                        <h5 className="fw-bold" style={{ color: '#e74c3c' }}>₹{item.pizzaId.price}</h5>
                      </div>
                      <div className="col-md-2 mb-3 mb-md-0">
                        <p className="mb-1">Quantity</p>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-primary btn-sm rounded-circle me-2"
                            onClick={() => handleCount("dec", item._id)}
                            disabled={item.quantity <= 1}
                            style={{ width: '36px', height: '36px', padding: '0' }}
                          >
                            -
                          </button>
                          <span className="fs-5 fw-bold mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-outline-primary btn-sm rounded-circle ms-2"
                            onClick={() => handleCount("inc", item._id)}
                            style={{ width: '36px', height: '36px', padding: '0' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-md-end">
                        <p className="mb-1">Subtotal</p>
                        <h5 className="fw-bold" style={{ color: '#2c3e50' }}>₹{item.pizzaId.price * item.quantity}</h5>
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={() => handleDelete(item._id)}
                          style={{ borderRadius: '20px' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h3 className="card-title fw-bold mb-0" style={{ color: '#2c3e50' }}>Order Total</h3>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <h3 className="card-title fw-bold mb-3" style={{ color: '#e74c3c' }}>₹{total}</h3>
                      <button className="btn btn-primary btn-lg w-100" style={{ borderRadius: '30px', fontWeight: 'bold' }}>
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
