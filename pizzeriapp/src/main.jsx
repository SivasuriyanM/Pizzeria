import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { mystore } from './reduxStore/myStore.js'

createRoot(document.getElementById('root')).render(
  <Provider store={mystore}>

 
  <BrowserRouter>
    <App />
  </BrowserRouter>
   </Provider>
)
