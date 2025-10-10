import { useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../reduxStore/userSlice";
function Auth() {

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        cart:[]
    })
    const { status, error} = useSelector((store)=>store.user)

    const navigate = useNavigate();
    const [logUser,setLogUser] = useState({
        email:'',
        password:''
    })

    const[isLogin, setIsLogin] = useState(true)

    let dispatcher = useDispatch()
    useEffect(() => {
    if (status === "succeeded") {
      alert(`✅ Welcome ${user.name || "User"}!`);
      navigate('/orderpizza')
    } else if (status === "failed") {
      alert(`❌ ${error}`);
    }
  }, [status, error]);
    
    const handleSignUp =(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8080/users/',user).then((res)=>setUser(res.data)).catch((err)=>console.log(err))
        
        if(user!==undefined){
            dispatcher(loginUser(user))
            alert("Registered Successfully!!")
            navigate('/')
        }else{
            alert("Invalid User")
        }
    }

    let handleLogin =async(e)=>{
        console.log("clicked")
        e.preventDefault()
        
        dispatcher(loginUser(logUser))
        // if(status === "succeeded"){
        //     alert("Loged In SuccessFull")
        //     navigate('/')
        // }else if( status === "failed"){
        //     alert("Invaild!!")
        // }
        // alert(`Wellcome ${res.data.name} !!`)
        
       
        
    }
    const handleChange =(e)=>{
        let {value, name} = e.target;
        setUser({...user,[name]:value})
    }
    const handleLogChange =(e)=>{
        let {value, name} = e.target;
        setLogUser({...logUser,[name]:value})
    }

  return (
            <div>
                {isLogin?
                 <div className="container my-5" style={{ maxWidth: "400px" }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin} className="border p-4 rounded shadow-sm bg-light">
                   
                        <div className="mb-3">
                        <label className="form-label" >Email address :</label>
                        <input type="email" className="form-control"   name='email'  value={logUser.email} onChange={handleLogChange}/>
                        </div>
                        <div className="mb-3">
                        <label className="form-label">Password :</label>
                        <input type="password" className="form-control"    name='password'  value={logUser.password} onChange={handleLogChange} />
                        </div>
                        <button type="submit" className="btn btn-warning w-100">Submit</button>
                    </form>
                </div>
                :
                <div className="container my-5" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSignUp} className="border p-4 rounded shadow-sm bg-light">
                    <div className="mb-3">
                        <label className="form-label">Name :</label>
                        <input type="text" className="form-control"   name='name'  value={user.name} onChange={handleChange} />
                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label" >Email address :</label>
                        <input type="email" className="form-control"   name='email'  value={user.email} onChange={handleChange}/>
        
                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password :</label>
                        <input type="password" className="form-control"    name='password'  value={user.password} onChange={handleChange} />
                    </div>


                    <button type="submit"  className="btn btn-warning w-100">Submit</button>
                </form>
                </div>
            }
                
                <p className='btn btn-primary w-50' onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Sign Up":"Login"}</p>
                
            
            
        </div>
  )
}

export default Auth
