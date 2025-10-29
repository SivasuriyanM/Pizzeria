import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../reduxStore/userSlice";

function Auth() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cart: []
    })
    
    const { status, error } = useSelector((store) => store.user)
    const navigate = useNavigate();
    
    const [logUser, setLogUser] = useState({
        email: '',
        password: ''
    })

    const [isLogin, setIsLogin] = useState(true)
    let dispatcher = useDispatch()
    
    useEffect(() => {
        if (status === "succeeded") {
            alert(`✅ Welcome ${user.name || "User"}!`);
            navigate('/orderpizza')
        } else if (status === "failed") {
            alert(`❌ ${error}`);
        }
    }, [status, error, user.name, navigate, error]);
    
    const handleSignUp = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/users/', user)
            .then((res) => {
                setUser(res.data)
                if (res.data !== undefined) {
                    dispatcher(loginUser(res.data))
                    alert("Registered Successfully!!")
                    navigate('/')
                } else {
                    alert("Invalid User")
                }
            })
            .catch((err) => console.log(err))
    }

    let handleLogin = async (e) => {
        console.log("clicked")
        e.preventDefault()
        dispatcher(loginUser(logUser))
    }
    
    const handleChange = (e) => {
        let { value, name } = e.target;
        setUser({ ...user, [name]: value })
    }
    
    const handleLogChange = (e) => {
        let { value, name } = e.target;
        setLogUser({ ...logUser, [name]: value })
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 text-center mb-4">
                    <h1 className="display-4 fw-bold" style={{ color: '#e74c3c' }}>Welcome to Pizzeria</h1>
                    <p className="lead" style={{ color: '#7f8c8d' }}>
                        {isLogin 
                            ? "Sign in to your account to continue" 
                            : "Create an account to get started"}
                    </p>
                </div>
                
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4 fw-bold" style={{ color: '#2c3e50' }}>
                                {isLogin ? "Login" : "Sign Up"}
                            </h2>
                            
                            {isLogin ? (
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold" style={{ color: '#2c3e50' }}>Email address</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-lg"   
                                            name='email'  
                                            value={logUser.email} 
                                            onChange={handleLogChange}
                                            style={{ borderRadius: '10px', padding: '12px' }}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold" style={{ color: '#2c3e50' }}>Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg"    
                                            name='password'  
                                            value={logUser.password} 
                                            onChange={handleLogChange}
                                            style={{ borderRadius: '10px', padding: '12px' }}
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 btn-lg fw-bold"
                                        style={{ 
                                            borderRadius: '30px', 
                                            padding: '12px', 
                                            fontSize: '1.1rem',
                                            backgroundColor: '#e74c3c',
                                            border: 'none'
                                        }}
                                    >
                                        Login
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleSignUp}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold" style={{ color: '#2c3e50' }}>Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg"   
                                            name='name'  
                                            value={user.name} 
                                            onChange={handleChange}
                                            style={{ borderRadius: '10px', padding: '12px' }}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold" style={{ color: '#2c3e50' }}>Email address</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-lg"   
                                            name='email'  
                                            value={user.email} 
                                            onChange={handleChange}
                                            style={{ borderRadius: '10px', padding: '12px' }}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold" style={{ color: '#2c3e50' }}>Password</label>
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg"    
                                            name='password'  
                                            value={user.password} 
                                            onChange={handleChange}
                                            style={{ borderRadius: '10px', padding: '12px' }}
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit"  
                                        className="btn btn-primary w-100 btn-lg fw-bold"
                                        style={{ 
                                            borderRadius: '30px', 
                                            padding: '12px', 
                                            fontSize: '1.1rem',
                                            backgroundColor: '#e74c3c',
                                            border: 'none'
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="col-12 text-center mt-4">
                    <p className="mb-0" style={{ color: '#7f8c8d' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <button 
                        className="btn btn-outline-primary btn-lg fw-bold"
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ 
                            borderRadius: '30px', 
                            padding: '10px 30px', 
                            fontSize: '1.1rem'
                        }}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth
