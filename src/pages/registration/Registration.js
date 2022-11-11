import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");



  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameErr("")
  }
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setLastNameErr("")
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("")
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  }




  const handleSignUp = (e) => {
    e.preventDefault()

    if (!firstName) {
      setFirstNameErr("First name is required")
    }

    if (!lastName) {
      setLastNameErr("Last name is required")
    }

    if (!email) {
      setEmailErr("Email is Required")
    }else{
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Invalid Email")
      }
    }


    if (!password) {
      setPasswordErr("Password is required")
    }else{
      if (!/^(?=.*[a-z])/.test(password)) {
        setPasswordErr("Password must contain at least 1 lowercase alphabetical character")
      }
      else if (!/^(?=.*[A-Z])/.test(password)) {
        setPasswordErr("Password must contain at least 1 uppercase alphabetical character")
      }
      else if (!/^(?=.*[0-9])/.test(password)) {
        setPasswordErr("Password must contain at least 1 numeric character")
      }
      else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordErr("Password must contain at least one special character")
      }
      else if (!/^(?=.{8,})/.test(password)) {
        setPasswordErr("Password  must be eight characters or longer")
      }
      else if (firstName && lastName && email && password) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Sign Up successfully, verify your email");
          const user = userCredential.user;
          const userName = (user.displayName = lastName);
          const accountCreationDate = userCredential.user.metadata.creationTime;
          console.log(`User Name: ${userName}`);
          console.log(`account creation date: ${accountCreationDate} `);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            navigate("/login")
          },1000)
          sendEmailVerification(auth.currentUser)
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            setEmailErr("This email-already-in-use")
          }
          console.log(errorCode);
        });
      }
    }
    

  }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='grid gap-6 grid-cols-2 max-w-screen-lg'>
        <div className='pt-16'>
          <img src="images/logo.png" alt="Facebook logo" />
          <p className='text-base font-poppins text-[#1C1E21] font-medium leading-5 pl-14 pr-28 '>Facebook helps you connect and share with the people in your life.</p>
        </div>
        <div className='px-4 pt-4 pb-6 rounded-lg bg-white drop-shadow-lg '>
          <form action="">
            <div className='mb-3'>
              <input className='py-5 px-4 rounded border border-borderColor w-full' type="text" placeholder='First Name' value={firstName} onChange={handleFirstName} />
              {firstNameErr && 
                <span>{firstNameErr}</span>
              }
            </div>
            <div className='mb-3'>
              <input className='py-5 px-4 rounded border border-borderColor w-full' type="text" placeholder='Last Name' value={lastName} onChange={handleLastName} />
              {lastNameErr && 
                <span>{lastNameErr}</span>
              }
            </div>
            <div className='mb-3'>
              <input className='py-5 px-4 rounded border border-borderColor w-full' type="email" placeholder='Email Address' value={email} onChange={handleEmail} />
              {emailErr && 
                <span>{emailErr}</span>
              }
            </div>
            <div className='mb-3'>
              <input className='py-5 px-4 rounded border border-borderColor w-full' type="text" placeholder='Password' value={password} onChange={handlePassword} />
              {passwordErr && 
                <span>{passwordErr}</span>
              }
            </div>
            <div>
              <button className='w-full bg-primary py-5 text-white text-center rounded-md text-xl font-poppins font-bold' onClick={handleSignUp} >Sign Up</button>
            </div>
          </form>
          <div className='text-center pb-5 pt-4'>
            <Link to="/forgotten-password" className='text-primary' >Forgotten Password?</Link>
          </div>
          <hr />
          <div className='pt-5'>
            <Link to="/login" className='w-full bg-secondary py-5 text-white text-center rounded-md text-xl font-poppins font-bold'>Already have</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration