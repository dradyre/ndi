import React from 'react'
import SignUp from './SignUpPage/SignUp';
import SignIn from './SignInPage/SignIn';
import DisplayUser from './DisplayUser/DisplayUser';
import AdminLogin from './AdminLogin/AdminLogin';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function Home({metaAddress}) {
    return (
        <div >
  <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<SignIn metaAddress={metaAddress} />} />
    <Route exact path="/signup" element={<SignUp metaAddress={metaAddress} />} />
    <Route exact path="/AdminLogin" element={<AdminLogin metaAddress={metaAddress}/>} />

  </Routes>
  </BrowserRouter>
        </div>
    )
}

export default Home
