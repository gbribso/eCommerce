"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/app/context/authcontext";

const Navbar = () => {

  /* Using Next Router to Navigate Between the Pages */
  const router = useRouter();

  const { isAuthenticated, setAuthenticated } = useAuth();

  const openSignIn = () => router.push("/client/signin");
  const openProfile = () => router.push("/client/profile");

  /* Logout Function */
   const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    setAuthenticated(false);
    router.push("/");
  }; 
  
  /* Navbar Body */
  return (
    <nav className="default-colors py-4 shadow-lg sticky top-0 z-50">
      <div className="container flex justify-between items-center mx-auto px-4">
        
        {/* Navbar Logo */}
        <Link 
          href="/"
          className="text-2xl font-bold text-sky-800 dark:text-white"
        >
          eCommerce
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/3">
          
          {/* Search Icon */}
          <IoSearch className="absolute w-5 h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-300 dark:text-neutral-500 hidden md:block"/>

          {/* Search Input */}
          <input 
            id="search"
            type="text" 
            placeholder="Search"
            className="default-input pl-10 pr-3 hidden md:block"
          />
        </div>
        
        {/* 'Sign In' Button */}
        {isAuthenticated ? (
          <div className="flex flex-row gap-1">
            <button 
              className="default-button"
              onClick={openProfile}
            >
              <FaUserCircle/>
            </button>

            <button
              className="default-button"
              onClick={handleLogout}
            >
              <FiLogOut/>
            </button>
          </div>
        ) : (
          <button 
            className="default-button"
            onClick={openSignIn}
          >
            Sign In
          </button>
        )}
        
      </div>
    </nav>
  )
}

export default Navbar;