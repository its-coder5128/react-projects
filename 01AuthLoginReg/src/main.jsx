import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import { MsgProvider } from './utils/MsgContext'
import './index.css'
import Protected from './utils/Protected'
import Login from './pages/Login'
import Register from './pages/register'
import Layout from './layouts/layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Hello from './pages/Hello'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Protected />}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about/' >
          <Route index element={<About />} />
          <Route path='hello' element={<Hello />} />
        </Route>
        <Route path='/contact' element={<Contact />} />
      </Route>
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MsgProvider>
        <RouterProvider router={router} />
      </MsgProvider>
    </AuthProvider>
  </React.StrictMode>,
)
