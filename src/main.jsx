import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Cartprovider } from './jewellery/context/CartContext.jsx'
import { WishlistProvider } from './jewellery/context/WishlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <WishlistProvider>
  <React.StrictMode>
    <Cartprovider>
    <App />
    </Cartprovider>
  </React.StrictMode>,
  </WishlistProvider>
  </BrowserRouter>
)

