import Link from "next/link";
import React from "react";
import Image from "next/image";
import LoginButton from "../app/login/loginbutton";
import LogoutButton from "../app/login/logoutbutton";
import AboutPage from "@/app/about/page";


const Header = () => {
  
  return (
    <header className="flex justify-between items-center bg-gray-200 p-2 sticky top-0">
       <Link href={"/"}><Image src="/logo.png" alt="logo" width={100} height={100}></Image> </Link>
        {/* <Image/> */}


        <div className="sticky top-0 z-50">
            <h1 className="text-4xl font-bold text-center p-5 bg-a text-yellow-500">Revo shop</h1>
        </div>
        
       <div className="flex gap-2">

            <Link href={"/about"} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">About</Link>
            <LoginButton />
            <LogoutButton />

       </div>
        
        
      </header> 
  );
}

export default Header;