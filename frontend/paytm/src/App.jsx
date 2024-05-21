import react from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Home from "./screens/Home.jsx"
import User from "./screens/User.jsx"



function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/user" element={<User/>}/>
      
    </Routes>
  )
}
export default App