"use client";

import { useRouter } from "next/navigation";
import { TiArrowLeft } from "react-icons/ti";

const HomeButton = () => {
  
  /* Using Next Router to Navigate to the 'Home' Page */
  const router = useRouter();
  const backToHomePage = () => router.push("/");

  return (
    <div className="absolute top-20 left-20 ">
      
      {/* 'Home Button' to Return to The Home Page */}
      <button
        className="default-underline flex items-center gap-1"
        onClick={backToHomePage} /* Back to Home Page When You Click on The Button */
      >
        <TiArrowLeft/> {/* Arrow Icon */} 
        Back To Home Page
      </button>
    </div>
  )
}

export default HomeButton;