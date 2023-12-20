import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Create from './pages/Create'
import Home from './pages/Home'
import Update from './pages/Update'
import './index.css'
import EmailSignUp from './Components/EmailSignUp'
import EmailSignIn from './Components/EmailSignIn'
import { useEffect, useState } from 'react'



function App() {

  //Token Storage : 
   const[token, setToken] = useState(false);

    if(token){
      sessionStorage.setItem('token', JSON.stringify(token))
    }
    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        let data = JSON.parse(sessionStorage.getItem('token'))
        setToken(data)
      }
    },[])

  return (
    <>
      <BrowserRouter>
      <Routes>  
        <Route path="/" element={<EmailSignIn setToken={setToken} />} />
        <Route path="/signUp" element={<EmailSignUp />} />
        {token?<Route path='/home' element={<Home token={token}/>}/>: ""}
        <Route path='/create' element={<Create/>}/>
        <Route path='/:id' element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
