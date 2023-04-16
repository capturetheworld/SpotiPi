import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Dashbaord from './pages/Dashboard';

import AuthContext from './context/AuthContext'

function App() {
    const [code, setCode] = useState('')
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [expiresIn, setExpiresIn] = useState('')
    return (
        <AuthContext.Provider value={{ code, setCode, accessToken, setAccessToken, refreshToken, setRefreshToken, expiresIn, setExpiresIn }}>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<LandingPage />} />
                    <Route exact path='/dashboard' element={<Dashbaord />} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
