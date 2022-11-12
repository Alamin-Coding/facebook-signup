import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleUpdatePassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            navigate("/login")
            alert("Password reset email sent!")
        })
        .catch((error) => {
            alert(error.code)

        });
    }
  return (
    <div className='w-screen h-screen grid grid-cols-1 items-center justify-items-center'>
        <div className='w-full sm:w-2/3 sm:h-2/4 bg-white rounded-md p-5 drop-shadow-md'>
            <div>
                <h2 className='text-2xl sm:text-4xl pb-4 text-slate-700 font-poppins font-medium '>Update Password</h2>
                <hr />
                <div className='pt-4'>
                    <input className='py-3 sm:py-5 px-2 sm:px-4 rounded border border-borderColor w-full' type="text" placeholder='Email' onChange={handleEmail} />
                </div>
                <div className='flex gap-1 sm:gap-2 md:gap-3 mt-4 xs:flex-wrap sm:flex-nowrap'>
                    <button className='w-full sm:w-2/4 bg-primary py-3 sm:py-5 px-2 text-white text-center rounded-md text-base sm:text-xl font-poppins font-normal sm:font-bold' onClick={handleUpdatePassword}>Update password</button>
                    <Link to="/login" className='w-full sm:w-2/4 bg-orange-600 py-3 sm:py-5 px-2 text-white text-center rounded-md text-base sm:text-xl font-poppins font-normal sm:font-bold'>Back</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forgotpassword