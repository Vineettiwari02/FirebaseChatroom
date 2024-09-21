import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Auth, Home, PageNotFound} from '../pages';
import { ProtectedRoutes } from './ProtectedRoutes';


export const Allroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="chatroom" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
        {/* <Route path="chatroom" element={<Home/>}/> */}
        <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  )
}
