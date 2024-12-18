"use client";

import { ReactNode } from "react";

/* Properties of the Card */
interface CardProps {
  title: string; /* Card Title Variable */
  children: ReactNode /* Card Content Variable */
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 rounded-lg shadow-lg default-colors">
        
        {/* Title of the Card*/}
        <h1 className="flex justify-center text-2xl font-bold mb-5">
          {title}
        </h1>
        
        {/* Content of the Card */}
        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
    
  )
}

export default Card;