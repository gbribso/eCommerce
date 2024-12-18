"use client";

import { useState, FormEvent } from "react";
import Card from "@/components/card/card";
import { useRouter } from "next/navigation";
import HomeButton from "@/components/homebutton/homebutton";

export default function SignUp() {

  /* State Variables and 'set' Functions to Update a Variable to the New Value. */
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  
  /* Using Next Router to Navigate Between the Pages */
  const router = useRouter();
  const openSignIn = () => router.push("/client/signin");

  /* Function to Submit a 'Sign In' */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    /* Validation to Confirm a Password */
    if (password !== confirmPassword) {
      alert("Passwords do Not Match.");
      return;
    }

    /* Validation to Fill in All Fields. */
    if (!firstName || !lastName || !birthDate || !email || !password) {
      alert("Please Fill in all Fields.");
      return;
    }

    /* Request to the 'Sign Up' API */
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          firstName,
          lastName,
          birthDate,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User Created");
        
        /* Return to 'Sign In' After Signing Up */
        setTimeout(() => { 
          router.push("/client/signin");
        }, 500);
      } 
      else {
        alert(data.message || "An error occurred.");
      }
    } catch (error) {
      alert(error || "An error occurred while creating the user.");
    }
  }

  return (
    <div>

      <HomeButton/>

      {/* Page Title */}
      <title>eCommerce - Sign Up</title>
      
      {/* Page Body */}
      <main>
        <Card title={"Sign Up"}>  
            <form 
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row gap-1 items-center">
                
                {/* First Name 'Sign Up' Input */}
                <input 
                  aria-label="First Name"
                  type="text" 
                  placeholder="First Name" 
                  className="default-input pl-2 pr-2"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} /* Update Status of 'First Name' as You Type */
                  required
                />

                {/* Last Name 'Sign Up' Input */}
                <input 
                  aria-label="Last Name"
                  type="text" 
                  placeholder="Last Name" 
                  className="default-input pl-2 pr-2"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} /* Update Status of 'Last Name' as You Type */
                  required
                />
              </div>

              {/* Birth Date 'Sign Up' Input */}
              <input
                aria-label="Birth Date"
                type="date"
                className="default-input pl-2 pr-2"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />

              {/* Email 'Sign Up' Input */}
              <input 
                aria-label="Email"
                type="email" 
                placeholder="Email" 
                className="default-input pl-2 pr-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)} /* Update Status of 'Email' as You Type */
                required
              />

              {/* Password 'Sign Up' Input */}
              <input 
                aria-label="Password"
                type="password" 
                placeholder="Password" 
                className="default-input pl-2 pr-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)} /* Update Status of 'Password' as You Type */
                required
              />

              {/* Confirm Password 'Sign Up' Input */}
              <input 
                aria-label="Confirm Password"
                type="password" 
                placeholder="Confirm Password" 
                className="default-input pl-2 pr-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} /* Update Status of 'Password' as You Type */
                required
              />

              {/* Section of 'Sign In' */}
              <div className="flex flex-row gap-1 justify-center items-center">
                Already Have an Account?
                
                {/* Button that Redirects to the 'Sign In' Page */}
                <button 
                  className="default-underline"
                  onClick={openSignIn}
                >
                  Sign In
                </button>
              </div>

              {/* Button of 'Sign In' */}
              <button 
                className="default-button"
                type="submit"
              >
                Sign Up
              </button>
            </form>
        </Card>
      </main>
    </div>
  );
}