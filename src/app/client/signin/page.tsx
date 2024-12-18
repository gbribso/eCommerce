"use client";

import { useState, FormEvent } from "react";
import Card from "@/components/card/card";
import { useRouter } from "next/navigation";
import HomeButton from "@/components/homebutton/homebutton";
import { useAuth } from "@/app/context/authcontext";

export default function SignIn() {
  
  /* State Variables and 'set' Functions to Update a Variable to the New Value. */
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const { setAuthenticated } = useAuth();
  
  /* Using Next Router to Navigate Between the Pages */
  const router = useRouter();
  const openSignUp = () => router.push("/client/signup");

  /* Function to Submit a 'Sign In' */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please Fill in all Fields.");
      return;
    }

    /* Send the Data to the 'Sign In' API */
    try {  
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      /* In Case the Login is Successful, it Redirects to the 'Main' Page */
      if (response.ok) {
        document.cookie = `auth_token=${data.token}; path=/; max-age=3600`;

        /* Stores the Token in Cookies */
        setAuthenticated(true); 
        
        /* Redirects the User After Login */
        router.push("/");
      } 
      else {
        alert(data.message || "Sign In Failed.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An Error Occurred While Logging In.");
    }
  }

  return (
    <div>

      <HomeButton/>

      {/* Page Title */}
      <title>eCommerce - Sign In</title>
      
      {/* Page Body */}
      <main>
        <Card title={"Sign In"}>  
            <form 
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >

              {/* Email 'Sign In' Input */}
              <input 
                aria-label="Email"
                type="email" 
                placeholder="Email" 
                className="default-input pl-2 pr-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)} /* Update Status of 'Email' as You Type */
                required
              />

              {/* Password 'Sign In' Input */}
              <input 
                aria-label="Password"
                type="password" 
                placeholder="Password" 
                className="default-input pl-2 pr-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)} /* Update Status of 'Password' as You Type */
                required
              />

              {/* Section of 'Sign Up' */}
              <div className="flex flex-row gap-1 justify-center items-center">
                Do Not Have an Account?
                
                {/* Button that Redirects to the 'Sign Up' Page */}
                <button
                  className="default-underline"
                  type="button"
                  onClick={openSignUp}
                >
                  Sign Up
                </button>
              </div>

              {/* Button of 'Sign In' */}
              <button 
                className="default-button"
                type="submit"
              >
                Sign In
              </button>
            </form>
        </Card>
      </main>
    </div>
  );
}