import { Routes, Route } from 'react-router-dom'
import NavBar from '@components/NavBar/NavBar'
import HomePage from '@pages/HomePage/HomePage'
import ProductsPage from '@pages/ProductsPage/ProductsPage'
import AuthPage from '@pages/AuthPage/AuthPage'
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage'
import { useState } from 'react'
import './App.scss'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  )
}

export default App
