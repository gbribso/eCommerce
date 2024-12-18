"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card/card";
import HomeButton from "@/components/homebutton/homebutton";

export default function Profile() {
  
  /* Defining the State 'user' to Store the User's Data (first name, last name, birthdate, and email) */
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
  });

  /* 'useEffect' Hook to Fetch User Data When the Component Mounts */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        /* Sending a GET Request to the '/api/profile' Endpoint to Fetch User Data */
        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });

        /* Parsing the Response Data as JSON */
        const data = await response.json();

        /* If the Response is Successful, Update the 'user' State with the Received Data */
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error("Error fetching user data:", data);
        }
      } catch (error) {
        /* Catch any Errors that Occur During the Fetching Process */
        console.error("Error occurred while fetching user data:", error);
      }
    };

    /* Call the Function to Fetch User Data */
    fetchUserData();
  }, []);

  /* Create a New Date Object from the User's BirthDate */
  const birthDateUTC = new Date(user?.birthDate); 

  /* Convert the Birth Date to a Formatted String in 'pt-BR' Format */
  const formattedDate = birthDateUTC.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  }); 

  return (
    <div>
      {/* Button to Navigate Back to the Home Page */}
      <HomeButton />

      {/* Card Component to display User Profile Information */}
      <Card title={"Profile"}>
        <div className="grid grid-cols-2 gap-10">
          {/* Displaying the User's First Name */}
          <div>
            <legend>
              First Name:
            </legend>
            {user.firstName}    
          </div>

          {/* Displaying the User's Last Name */}
          <div>
            <legend>
              Last Name:
            </legend>
            {user.lastName}
          </div>

          {/* Displaying the User's Email */}
          <div>
            <legend>
              Email:
            </legend>
            {user.email}
          </div>

          {/* Displaying the User's Birth Date */}
          <div>
            <legend>
              Birth Date:
            </legend>
            {formattedDate}
          </div>
        </div>
      </Card>
    </div>
  );
}
