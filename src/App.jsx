import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './jewellery/pages/LandingPage'
import RingsPage from './jewellery/pages/RingsPage'
import BanglesPage from './jewellery/pages/BanglesPage'
import BraceletPage from './jewellery/pages/BraceletPage'
import ChainPage from './jewellery/pages/ChainPage'
import IdolPage from './jewellery/pages/IdolPage'
import NecklacePage from './jewellery/pages/NecklacePage'
import MangalasutraPage from './jewellery/pages/MangalasutraPage'
import EarringsPage from './jewellery/pages/EarringsPage'
import IdolSingle from './singles/IdolSingle'
import BangleSingle from './singles/BangleSingle'
import BraceletSingle from './singles/BraceletSingle'
import ChainSingle from './singles/ChainSingle'
import EarringsSingle from './singles/EarringsSingle'
import MangalasutraSingle from './singles/MangalasutraSingle'
import NecklaceSingle from './singles/NecklaceSingle'
import RingSingle from './singles/RingSingle'
import UserCart from './jewellery/UserCart'
import SignupPage from './jewellery/pages/SignupPage'
import LoginPage from './jewellery/pages/LoginPage'
import { AuthProvider } from './jewellery/context/AuthContext'
import UserProfile from './jewellery/pages/UserProfile'
import UserWishlist from './jewellery/pages/UserWishlist'
import DeliveryAddress from './jewellery/pages/DeliveryAddress'
import { WishlistProvider } from './jewellery/context/WishlistContext'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <WishlistProvider>
        <Routes>
        <Route path="/" element = { <LandingPage /> } />
        <Route path="/r" element = { <RingsPage /> } />
        <Route path="/b" element = { <BanglesPage /> } />
        <Route path="/br" element = { <BraceletPage /> } />
        <Route path="/c" element = { <ChainPage /> } />
        <Route path="/e" element = { <EarringsPage /> }  />
        <Route path="/i" element = { <IdolPage /> }  />
        <Route path="/m" element = { <MangalasutraPage /> }  />
        <Route path="/n" element = { <NecklacePage /> }  />
          <Route path="/idol/:id" element = {<IdolSingle />} />
          <Route path="/bangles/:id" element = {<BangleSingle />} />
          <Route path="/bracelet/:id" element = { <BraceletSingle /> } />
          <Route path="/chains/:id" element = { <ChainSingle /> } />
          <Route path="/earrings/:id" element = { <EarringsSingle /> } />
          <Route path="/mangalasutra/:id" element = { <MangalasutraSingle /> } />
          <Route path="/necklace/:id" element = { <NecklaceSingle /> } />
          <Route path="/ring/:id" element = { <RingSingle /> } />
        <Route path="/cart" element = { <UserCart /> } />
        <Route path="/login" element = { <LoginPage /> } />
        <Route path="/signup" element = { <SignupPage /> } />
        <Route path='/profile' element = { <UserProfile />} />
        <Route path='/wishlist' element = { <UserWishlist />} />
        <Route path='/delivery' element = { <DeliveryAddress />} />
      </Routes>
        </WishlistProvider>
      </AuthProvider>
    </div>
  )
}

export default App