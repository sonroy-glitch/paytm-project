import React,{useEffect,useState}from 'react'
import {useNavigate} from "react-router-dom"
import {useJwt} from "react-jwt"
import axios from "axios"
import LoadingBar from "react-top-loading-bar"
// import jwt from "jsonwebtoken"
// import jwtDecode from "jwt-decode"
import data from"../code.js"
import "./render.css"
let timeoutCounter;
const Render = ({state}) => {
const [username,setUsername]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [pin,setPin]=useState("")
const [signin,setSignin]=useState("")
const [message,setMessage]=useState("")
const [message1,setMessage1]=useState("")


const navigate=useNavigate();
    useEffect(()=>{
        
        var token = localStorage.getItem("auth")
  
    if (!(token==null)){
        // var verify= jwt.verify(token,data.jwtPasscode)
        //  if(verify.email!==null){
            navigate("/user")
        //  }
    }
    },[])
    function run (){
        window.location.reload()
    }
    function debouncedUsername(e){
      clearTimeout(timeoutCounter);
      timeoutCounter=setTimeout(() => {
        setUsername(e)
      }, 1000);
    }
    function debouncedEmail(e){
        clearTimeout(timeoutCounter);
        timeoutCounter=setTimeout(() => {
          setEmail(e)
        }, 1000);
      }
      

      function debouncedPassword(e){
        clearTimeout(timeoutCounter);
        timeoutCounter=setTimeout(() => {
          setPassword(e)
        }, 1000);
      }
      function debouncedPin(e){
        clearTimeout(timeoutCounter);
        timeoutCounter=setTimeout(() => {
          setPin(e)
        }, 1000);
      }
      function debouncedSignin(e){
        clearTimeout(timeoutCounter);
        timeoutCounter=setTimeout(() => {
          setSignin(e)
        }, 1000);
      }
      async function signup(){
       var data = await axios.post("http://localhost:3000/signup",{
        username,
        email,
        password,
        pin
       })
       setMessage(data.data)
       
      }
      async function login() {
        var data = await axios.post("http://localhost:3000/signin",{
        data:signin,
        password,
       })
    //    console.log(data)
       if (data.status==200){
        localStorage.setItem("auth",data.data)
        setMessage1("Login success")
        navigate("/user")

       }
       else {
        setMessage1(data.data)
        // console.log("hi")
       }
      }
  if(state==="signup"){
    return(
        <div className="main">
            <div className="heading-holder">
            <h4 className="heading">Sign Up</h4>
            <div className="close-holder1">
                <button onClick={run}className="close">Close</button>
            </div>
            </div>
            <div className="holder">
            <input  placeholder="Username"className="holder1" onChange={(e)=>debouncedUsername(e.target.value)}/><br/>

            <input type="email" placeholder="Email"className="holder1"onChange={(e)=>debouncedEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" className="holder2"onChange={(e)=>debouncedPassword(e.target.value)}/><br/>
            <input type="password" placeholder="Payment Pin" className="holder2"onChange={(e)=>debouncedPin(e.target.value)}/><br/>
            </div>
            <button className="button" onClick={signup}>Signup</button>
            <p className="message">{message}</p>
        </div>
    )
  }
  if(state==="signin"){
    return(
        <div className="main">
            <div className="heading-holder">
            <h4 className="heading">Sign In</h4>
            </div>
            <div className="close-holder2">
                <button onClick={run} className="close">Close</button>
            </div>
            <div className="holder">
            <input type="email" placeholder="Email or Username"className="holder1"onChange={(e)=>debouncedSignin(e.target.value)}/><br/>
            <input type="password" placeholder="Password" className="holder2"onChange={(e)=>debouncedPassword(e.target.value)}/><br/>
            </div>
            <button className="button" onClick={login}>Signin</button>
            <p className="message">{message1}</p>
        </div>
    )
  }
}

export default Render