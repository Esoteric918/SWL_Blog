import React, { useState } from 'react';
import { AiOutlineApartment } from 'react-icons/ai';
import { faDonate, faContactBook, faHome, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { UserAuth } from '../context/authContext'


import { Link } from 'react-router-dom';

export default function NavBar() {
  const [nav, setNav] = useState(false);
  // const { logout } = UserAuth()

  const handleNav = () => {
    setNav(!nav);
  };


  // const handleLogout = async () => {
  //   try {
  //     await logout()
  //     // navigate('/Login')
  //     console.log('User logged out')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className="flex flex-col justify-center items-center dark:bg-gradient-to-r from-red-400 to-blue-500">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <img
            src="/assets/swl-logo.jpg"
            width={50}
            height={50}
            alt=""
            className="rounded-full m-2 dark:shadow-md dark:shadow-black"
          />
          <img src="/assets/SWL-navlogo4.png" width={400} height={300} alt="logo" />
        </div>
        <div className="invisible md:visible mr-4 my-2 flex justify-evenly gap-6">
          <Link 
            href="https://www.sandwicheswithlove.com/"
            id="donate"
            className="text-lg text-white w-10 h-10"
          >
            <FontAwesomeIcon icon={faHome} />
          </Link> 
          <Link 
            href="https://www.gofundme.com/f/yrybv-sandwiches-4-the-homeless"
            id="donate"
            alt="donate"
            className="text-lg text-white w-10 h-10"
          >
            <FontAwesomeIcon icon={faDonate} />
          </Link> 
          <Link 
            href="https://www.facebook.com/sandwicheswithlove"
            id="contact"
            alt="contact"
            className="text-lg text-white w-10 h-10"
          >
            <FontAwesomeIcon icon={faContactBook} />
          </Link> 
          <Link to="/login" id="login" alt="login" className="text-lg text-white w-10 h-10" >
            <FontAwesomeIcon icon={faSignIn} />
          </Link>
          <Link to="/login" id="Logout" alt="login" className="text-lg text-white w-10 h-10" >
            <FontAwesomeIcon icon={faSignOut} />
          </Link>
        </div>
        <div style={{ color: '#fff' }} onClick={handleNav} className="md:hidden pr-9">
          <AiOutlineApartment size={25} />
        </div>
        <div className={nav ? 'md:hidden fixed left-0 top-0 w-3/4 h-screen bg-red-300 z-10' : 'hidden'}>
          <div className="flex justify-center">
            <img
              className="mt-5 rounded-full dark:shadow-md dark:shadow-black"
              src="/assets/swl-logo.jpg"
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <div className="grid grid-cols-1 ml-4 mt-3 gap-8 text-lg text-white">
            <Link
              href="https://www.sandwicheswithlove.com/"
              id="donate"
              className="text-lg text-white w-16 h-16"
            >
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link> 
            <Link
              href="https://www.gofundme.com/f/yrybv-sandwiches-4-the-homeless"
              className="text-lg text-white w-16 h-16"
            >
              <FontAwesomeIcon icon={faDonate} />
              Donations
            </Link> 
            <Link
              href="https://www.facebook.com/sandwicheswithlove"
              className="text-lg text-white w-16 h-16"
            >
              <FontAwesomeIcon icon={faContactBook} />
              Contact
            </Link> 
            <Link to="/login" id="login" alt="login" className="text-lg text-white w-16 h-16" >
              <FontAwesomeIcon icon={faSignIn} />
              Sign In
            </Link>
            <Link to="/login" id="Logout" alt="login" className="text-lg text-white w-16 h-16" >
              <FontAwesomeIcon icon={faSignOut} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
