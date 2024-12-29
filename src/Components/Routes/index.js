import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Home';
import CategoryPage from '../Pages/Category';
const AppRoutes = () => {
    return(
        <>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:categoryId' element={<CategoryPage />} />
        </Routes>
        </>
    )
}

export default AppRoutes;