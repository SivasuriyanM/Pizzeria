import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function BuildPizza({pizza, ingredient, userId, back}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [ingName, setIngName] = useState([]);
  const [total, setTotal] = useState(parseInt(pizza.price));
  const status = useSelector((store) => store.user.status);
  let navigate = useNavigate();
  
  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item.id)) {
      // Remove item
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
      setIngName(ingName.filter((name) => name !== item.tname));
      setTotal(total - item.price);
    } else {
      // Add item
      setSelectedItems([...selectedItems, item.id]);
      setIngName([...ingName, item.tname]);
      setTotal(total + item.price);
    }
  };
  
  const handleClick = async (total) => {
    try {
      console.log("clicked custom cart");
      const data = { userId, productId: pizza._id, quantity: 1, total, ingName };
      await axios.put(`http://localhost:8080/users/addmodified`, data).then((res) => {
        console.log(res.data, "Updated!!");
        alert("Product Added", res.data);
        navigate('/cart');
      }).catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold" style={{ color: '#e74c3c' }}>Customize Your Pizza</h1>
          <p className="lead" style={{ color: '#7f8c8d' }}>Modify your <span className="fw-bold" style={{ color: '#2c3e50' }}>{pizza.name}</span> by adding extra ingredients</p>
        </div>
      </div>
      
      <div className="row g-4 mb-4">
        {ingredient.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div 
              className="card h-100 shadow-sm border-0"
              style={{ 
                borderRadius: '15px', 
                overflow: 'hidden', 
                transition: 'transform 0.3s, box-shadow 0.3s',
                border: selectedItems.includes(item.id) ? '2px solid #e74c3c' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={item.image}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
                alt={item.tname}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold" style={{ color: '#2c3e50' }}>{item.tname}</h5>
                <p className="card-text fw-bold" style={{ color: '#e74c3c', fontSize: '1.2rem' }}>₹{item.price}</p>
                <div className="form-check form-switch d-flex justify-content-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item)}
                    className="form-check-input"
                    style={{ 
                      width: '3rem', 
                      height: '1.5rem', 
                      cursor: 'pointer',
                      border: selectedItems.includes(item.id) ? '2px solid #e74c3c' : '1px solid #ddd'
                    }}
                  />
                  <label 
                    className="form-check-label ms-2 fw-bold" 
                    style={{ 
                      color: selectedItems.includes(item.id) ? '#e74c3c' : '#7f8c8d',
                      fontSize: '1.1rem'
                    }}
                  >
                    Add Ingredient
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row mb-4">
        <div className="col-12 text-center">
          <div className="card shadow-sm border-0" style={{ 
            borderRadius: '15px', 
            backgroundColor: '#f8f9fa',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div className="card-body">
              <h3 className="card-title fw-bold" style={{ color: '#2c3e50' }}>Total: <span style={{ color: '#e74c3c' }}>₹{total}</span></h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 text-center">
          <button 
            className="btn btn-outline-danger btn-lg me-3" 
            onClick={() => back(false)}
            style={{ 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              padding: '10px 40px',
              fontSize: '1.2rem'
            }}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary btn-lg" 
            onClick={() => handleClick(total)} 
            disabled={status === 'idle' ? true : false}
            style={{ 
              borderRadius: '30px', 
              fontWeight: 'bold', 
              padding: '10px 40px',
              fontSize: '1.2rem'
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuildPizza;
