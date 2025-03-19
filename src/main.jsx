import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WishlistProvider } from './jewellery/context/WishlistContext.jsx'
import { AuthProvider } from './jewellery/context/AuthContext.jsx'
import { CartProvider } from './jewellery/context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <WishlistProvider>
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
  </WishlistProvider>
  </BrowserRouter>
)

