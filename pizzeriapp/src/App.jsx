
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import OrderPizza from './Components/OrderPizza'
import BuildPizza from './Components/BuildPizza'
import BuildUrPizza from './Components/BuildUrPizza'
import Cart from './Components/Cart'
import Navbar from './Components/Navbar'
import Auth from './Components/Auth'
import { useSelector } from 'react-redux'

function App() {
 let logStatus = useSelector((store)=>store.user.status)

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/orderpizza' element={<OrderPizza/>}/>
      <Route path='/buildurs' element={<BuildUrPizza/>}/>
      {logStatus!=='idle'?<Route path='/cart' element={<Cart/>}/>:""}
    </Routes>

    </>
  )
}

export default App
