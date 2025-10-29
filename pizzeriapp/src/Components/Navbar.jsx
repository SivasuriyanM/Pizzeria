import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reduxStore/userSlice'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'

function Navbar() {
  let logStatus = useSelector((store) => store.user.status)
  let user = useSelector((store) => store.user.user)
  let dispatcher = useDispatch()
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Pizzeria Logo" style={{ width: "50px", height: "50px", marginRight: "15px" }} />
          <h3 className="fs-2 fw-bold mb-0" style={{ color: '#e74c3c' }}>Pizzeria</h3>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link fs-5 mx-2" style={{ color: '#f8f9fa' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/orderpizza" className="nav-link fs-5 mx-2" style={{ color: '#f8f9fa' }}>Order Pizza</Link>
            </li>
            <li className="nav-item">
              <Link to="/buildurs" className="nav-link fs-5 mx-2" style={{ color: '#f8f9fa' }}>Build Your Pizza</Link>
            </li>
          </ul>
          
          <div className="d-flex">
            {user !== null ? (
              <Link to="/cart" className="btn btn-warning btn-lg me-2" style={{ borderRadius: '20px' }}>
                Shopping Cart
              </Link>
            ) : ""}
            
            {user === null ? (
              <Link to="/login" className="btn btn-primary btn-lg" style={{ borderRadius: '20px' }}>
                Login
              </Link>
            ) : (
              <button 
                onClick={() => { dispatcher(logout()); navigate('/'); }}  
                className="btn btn-danger btn-lg"
                style={{ borderRadius: '20px' }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
