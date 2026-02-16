import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useState } from 'react';
import RequestReset from './components/RequestReset';
import ResetPassword from './components/ResetPassword';
import Profile from './pages/Profile';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken)=>{
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <BrowserRouter>
    <Routes>
      {!token ? (
        <>
          <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
          <Route path='/register' element={<Register onLogin={handleLogin}/>}/>
          <Route path='/request-reset' element={<RequestReset/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='*' element={<Navigate to="/login"/>}/>
        </>
        ) : (
        <>
        <Route path='/dashboard' element={<Dashboard onLogout={handleLogout}/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Navigate to="/dashboard"/>}/>
        </>
        )}
    </Routes>
    </BrowserRouter>
  )
}

export default App
