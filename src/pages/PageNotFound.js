import React from 'react'
import errorimg from "../assests/404 Error-amico.svg"
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className='authPage'>
      <div className="card">
      <div className="cardcontiened">
        <div className="cardflex">
        <div className="container">
        <img className="img-head error" src={errorimg} alt="subscribe to email" />
     
        <p className="description">404 Error Page Not Found</p>
        <div className="form-box">

            <Link to="/" className="submit" type="submit" style={{textDecoration:'none'}}>
             Go Home</Link>
        </div>
    </div>
        </div>
      </div>
      </div>
    </div>
  )
}
