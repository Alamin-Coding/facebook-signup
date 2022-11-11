import React from 'react'
import { Link } from 'react-router-dom'

const Forgotpassword = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <div className='w-2/4 h-2/4 bg-white rounded-md p-5 drop-shadow-md'>
            <div>
                <h2 className='text-4xl pb-4 text-slate-700 font-poppins font-medium '>Update Password</h2>
                <hr />
                <div className='pt-4'>
                    <input className='py-5 px-4 rounded border border-borderColor w-full' type="text" placeholder='First Name' />
                </div>
                <div className='flex gap-3 mt-4'>
                    <button className='w-72 bg-primary py-5 text-white text-center rounded-md text-xl font-poppins font-bold'>Update password</button>
                    <Link to="/login" className='w-72 bg-orange-600 py-5 text-white text-center rounded-md text-xl font-poppins font-bold'>Back</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forgotpassword