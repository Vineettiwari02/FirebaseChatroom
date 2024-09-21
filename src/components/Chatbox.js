import React, { useState } from 'react'
import { Message } from './Message'
import { auth} from  "../Firebase/config"
import { useNavigate } from 'react-router-dom';
import {signOut } from 'firebase/auth'

export const Chatbox = () => {
  const [show,setShow] = useState(false);
  const navigate = useNavigate();
  const [isAuth, setIsauth] = useState(JSON.parse(localStorage.getItem("isAuth"))||false);

  function handelLogout(){
    signOut(auth);
    setIsauth(false);
    localStorage.setItem("isAuth", false);
    navigate("/")
  }
  return (

    <div className="chatbox">
      <header>
        <h1>Chatroom</h1>
        <div className="profilebag">
          <div className="profileimg" onClick={()=>{setShow(!show)}}>
            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profileimg" />
          </div>
          {show ? (<div className="dropdown" onClick={handelLogout}>SignOut</div>) :("")}
          
        </div>
       
      </header>

      <section>
        <Message/>
        <form>

          <input placeholder="say something nice" />

          <button type="submit" >Send</button>

        </form>
      </section>

    </div>

  )
}
