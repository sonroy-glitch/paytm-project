import React,{useState,useEffect} from "react";
import Render from "../components/Render.jsx"
import "./home.css"
import {useNavigate} from "react-router-dom"

const Home = () => {
    const [state,setState]=useState('')
    const navigate= useNavigate()
 
  return (
    <div className="home">
      <div className="topbar">
        <div className="head">
        <div className="text1">Paytm Logo</div>
        <div className="text">Paytm for Customer</div>
        <div className="text">Paytm fro Business</div>
        <div className="text">Investor Relations</div>
        <div className="text">Company</div>
        <div className="text">Carrer</div>
        <div className="box">
        <div><button onClick={()=>setState("signup")} className="button1">Signup</button></div>
        <div><button onClick={()=>setState("signin")} className="button2">Signin</button></div>
         </div>

        </div>
      </div>
      <div className="body">
        <div>Paytm Body </div>
      
      </div>
      <div className="hero">
      <Render state={state} />
      </div>
    </div>
  );
};

export default Home;
