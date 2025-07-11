import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import DummyPage from './dummy.tsx'
import Navbar from './component/navbar.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
    <Routes>
    <Route element={<App/>} path='/'/>
    <Route element={<DummyPage/>} path='/page/:dummy'/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
