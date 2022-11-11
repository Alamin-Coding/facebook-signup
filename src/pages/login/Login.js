import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // const isUserHave = JSON.parse(localStorage.getItem("userInfo"))
  // console.log(isUserHave);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr("Do not allow empty value")
    }
    else if (!password) {
      setPasswordErr("Do not allow empty value")
    }
    else{
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(userLoginInfo(user.user));
        localStorage.setItem("userInfo", JSON.stringify(user))
        setEmail("");
        setPassword("");
        alert("Login Successfully");
        setTimeout(() => {
          navigate("/")
        },1000)
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/user-not-found" ) {
          setEmailErr("user-not-found")
        }
        if (errorCode === "auth/invalid-email" ) {
          setEmailErr("invalid-email")
        }
        if (errorCode === "auth/wrong-password" ) {
          setPasswordErr("wrong-password")
        }
        if (errorCode === "auth/too-many-requests" ) {
          setPasswordErr("too-many-requests")
        }
      });
    }
  }

  // useEffect(() => {
  //   if (isUserHave) {
  //     navigate("/")
  //   }
  // },[])

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='grid gap-6 grid-cols-2 items-center max-w-screen-lg h-2/4 '>
        <div>
          <img src="images/logo.png" alt="Facebook logo" />
          <p className='text-base font-poppins text-[#1C1E21] font-medium leading-5 pl-14 pr-28 '>Facebook helps you connect and share with the people in your life.</p>
        </div>
        <div className='px-4 pt-4 pb-6 rounded-lg bg-white drop-shadow-lg '>
          <form action="">
            <div className='mb-3'>
              <input className='py-5 px-4 rounded border border-borderColor w-full' type="email" placeholder='Email Address' value={email} onChange={handleEmail} />
              {emailErr && <span>{emailErr}</span>}
            </div>
            <div className='mb-3'>
              <input className='py-5 px-4 rounded border border-borderColor w-full' type="password" placeholder='Password' value={password} onChange={handlePassword} />
              {passwordErr && <span>{passwordErr}</span>}
            </div>
            <div>
              <button className='w-full bg-primary py-5 text-white text-center rounded-md text-xl font-poppins font-bold' onClick={handleLogin} >Log in</button>
            </div>
          </form>
          <div className='text-center pb-5 pt-4'>
            <Link to="/forgotten-password" className='text-primary' >Forgotten Password?</Link>
          </div>
          <hr />
          <div className='pt-5'>
            <Link to="/registration" className='w-full bg-secondary py-5 text-white text-center rounded-md text-xl font-poppins font-bold'>Create New Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login