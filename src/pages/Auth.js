import React, { useState } from 'react'
import autimg from "../assests/imgges.jpg"
import { auth, provider } from "../firebase/config"

import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export const Auth = () => {
  const navigate = useNavigate();
  const [isAuth, setIsauth] = useState(JSON.parse(localStorage.getItem("isAuth")) || false);

  async function handelLogin() {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        // console.log(result);
        setIsauth(true);
        localStorage.setItem("isAuth", true);
        navigate("/chatroom")
      })

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className='authPage'>
      <div className="">
        <div className="cardcontiened">
          <div className="cardflex">
            <div className="container">
              <img className="img-head" src={autimg} alt="subscribe to email" />
              <h1 className="title">ChatRoom</h1>
              <div className="text-center">
                <p className="description">An open chat room for your friends</p>
              </div>

              <div className="form-box">
                <button onClick={handelLogin} className="submit" type="submit">
                  <svg width="14px" fill="white" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 781.31 797.25"><defs></defs><path className="cls-1" d="M790.47,407.48c0-32.77-2.66-56.69-8.42-81.49H407.79V473.92H627.47C623,510.68,599.13,566.05,546,603.25l-.75,5,118.34,91.68,8.19.82c75.3-69.54,118.71-171.86,118.71-293.22" transform="translate(-9.16 0)" /><path className="cls-2" d="M407.79,797.25c107.62,0,198-35.43,264-96.55L546,603.25c-33.67,23.48-78.84,39.86-138.19,39.86-105.42,0-194.89-69.53-226.78-165.64l-4.67.39-123,95.23-1.61,4.47c65.55,130.22,200.2,219.69,356.11,219.69" transform="translate(-9.16 0)" /><path className="cls-3" d="M181,477.47a245.58,245.58,0,0,1-13.28-78.84,257.9,257.9,0,0,1,12.84-78.84l-.22-5.29L55.76,217.75l-4.08,1.94a397.76,397.76,0,0,0,0,357.87L181,477.47" transform="translate(-9.16 0)" /><path className="cls-4" d="M407.79,154.13c74.85,0,125.34,32.34,154.13,59.36l112.5-109.85C605.33,39.42,515.41,0,407.79,0,251.88,0,117.23,89.47,51.68,219.69l128.89,100.1c32.33-96.12,121.8-165.66,227.22-165.66" transform="translate(-9.16 0)" /></svg> Sign In With Goggle</button>

              </div>
            </div>
          </div>
        </div>
      </div></div>
  )
}
