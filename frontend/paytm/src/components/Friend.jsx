import React,{useState} from 'react'
import axios from "axios"
import "./friend.css"
const Friend = ({pass,all,passon}) => {
  const [message,setMessage]=useState("")
  const[amount,setAmount]=useState(0);
  const [pin,setPin]=useState("")
  var timeoutCounter;
  var token = localStorage.getItem('auth')
  function debouncedAmount(e){
    clearTimeout(timeoutCounter);
    timeoutCounter=setTimeout(() => {
        setAmount(e)
    }, 1000);
  }
  function debouncedPin(e){
    clearTimeout(timeoutCounter);
    timeoutCounter=setTimeout(() => {
        setPin(e)
    }, 1000);
  }
  async function send(){
    var data =await axios.post("http://localhost:3000/user/payment",{
        username:passon,
        amount,
        pin
    },{
        headers:{auth:token}
    })
    setMessage(data.data)
  }
  function close(){
    window.location.reload()
  }
  async function friend(e) {
    var data = await axios.post("http://localhost:3000/user/friend",{
        friend:all[e]
    },{
        headers:{auth:token}
    })
    setMessage(data.data)
  }
  console.log( typeof amount)
          if(pass==="friend"){
    return(
        <div className="main">
            <div className="heading-holder">
            <h4 className="heading">Friend List</h4>
            <div className="close-holder1">
                <button onClick={close}className="close">Close</button>
            </div>
            </div>
            {all.map((item,index)=>{
                return(
                    <div  className="holder-friend" key={index}>
                        <div className="username-holder">
                            <p>{item}</p>
                        </div>
                        <div className="button-div">
                            <button className="button7" onClick={(e)=>friend(e.target.dataset.id)} data-id={index}>Add Friend</button>
                        </div>
                    </div>
                )
            })}
            <p className="message">{message}</p>
        </div>
    )
  }
  if(pass==="payment"){
    
    return(
        <div className="main">
        <div className="heading-holder">
        <h4 className="heading">Payment</h4>
        <div onClick={close}className="close-holder1">
            <button className="close">Close</button>
        </div>
        </div>
        <div className="holder">
        <input  placeholder="Amount"className="holder1" onChange={(e)=>debouncedAmount(e.target.value)} /><br/>
        <input type="password" placeholder="Payment Pin" className="holder2" onChange={(e)=>debouncedPin(e.target.value)}/><br/>
        </div>
        <button className="button" onClick={send} >Send</button>
        <p className="message">{message}</p>
    </div>
    )
  }
    
  
}

export default Friend