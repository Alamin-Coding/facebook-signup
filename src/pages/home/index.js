import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(data.user);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo")
      navigate("/login")
    }).catch((error) => {
      alert(error)
    });
  }


  useEffect(() => {
    if (!data) {
      navigate("/login")
    }
  }, [])
  return (
    <div className='p-3'>
      <h1 className='text-3xl py-3'>Home Page</h1>
      <button className='bg-red-500 rounded-md py-3 px-5 text-white text-xl font-poppins font-medium ' onClick={handleLogout}>
        Log Out
      </button>
    </div>
  )
}

export default Home