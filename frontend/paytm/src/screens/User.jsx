import React,{useState,useEffect,useMemo} from 'react'
import {useNavigate } from "react-router-dom"
import axios from "axios"
import Render from "../components/Render.jsx"
import Friend from "../components/Friend.jsx"
var arr=[];

import "./user.css"
const User = () => {
const navigate = useNavigate();
const [balance,setBalance]=useState("Check Balance")
const [friend,setFriend]=useState([])
const [pass,setPass]=useState("")
const [all,setAll]=useState([])
const [passon,setPasson]=useState("")
const [username,setUsername]=useState("")
var token = localStorage.getItem("auth")
function run(){
  localStorage.removeItem("auth");
  navigate("/")
}
useEffect(() => {
  // console.log(token)
  async function call() {
    if (token !== null) {
      // console.log(token);
      try {
        const response = await axios.get("http://localhost:3000/user/fetch", {
          headers: { auth: token }
        });
        setFriend(response.data.friend);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  call();
}, []);
useEffect(()=>{
  async function call(){
    var data = await axios.get("http://localhost:3000/user/friend/fetch",{
      headers:{auth:token}
    });
    
  setAll(data.data)
  }
  call();
},[])
useEffect(()=>{
  async function call(){
    const response = await axios.get("http://localhost:3000/user/balance", {
          headers: { auth: token }
        });
        setUsername(response.data.username)

  }
  call();
},[])

async function viewBalance(){
  const response = await axios.get("http://localhost:3000/user/balance", {
          headers: { auth: token }
        });
        setBalance("Rs."+String(parseInt(response.data.balance)))
        setTimeout(() => {
        setBalance("Check Balance")
          
        },10000 );
} 
async function addFriend(){

}
 function send(e){
  setPass("payment")
  
  setPasson(friend[e])
}
function change(){
  setPass("friend")
}



// console.

  return (
   
    <div className="main1">
      <div className="topbar1">
        <div className="header">
        <p>Payment Portal</p>

        </div>
        <div>
        <button onClick={viewBalance} className="button3">{balance}</button>
        </div>
        <div>
        <button onClick={change} className="button4">Add Friend</button>
        </div>
        <div>
        <button onClick={run} className="button5">Logout</button>
        </div>
         <div>
          <p>Hi,{username}</p>
         </div>
      </div>
      <div className="friends-header">
        Send Money to Friends
      </div>
      {friend.map((item,index)=>{
      
      return( 
        <div className="friends-holder"key={index}>
      <div className="div">
        <p className="data">{item}</p>
        </div>
      <div className="div">
        <button onClick={(e)=>send(e.target.dataset.id)} data-id={index} className="button6">Send Money</button>
        </div>
      </div>
    )
    })}

      <div className="container">
        <Friend pass={pass} all={all} passon={passon}/>
      </div>
      

    </div>
  )
}

export default User