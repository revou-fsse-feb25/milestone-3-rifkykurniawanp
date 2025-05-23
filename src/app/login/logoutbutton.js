// // import LoginPage from "";
// "use client";
// // import React from "react";
// // import { useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";

// const LogoutButton = () => {
//     const { data: session } = useSession();
//     const handleClick = () => signOut();

//     return () => {
//         <button onClick={handleClick}
//               className="text-gray-700 cursor-pointer dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//               aria-label="Sign out"
//             ><span className="sr-only">Sign out</span></button>
//     }
//     // useEffect(() => {
//     // if ( localStorage.getItem("isLoggedIn") === "true")
//     //     localStorage.setItem("isLoggedIn", "false");
//     // }, []);

//     // const handleLogout = () => {
//     //     localStorage.removeItem("isLoggedIn");
//     //     window.location.href = "/";
//     // }

//     // return (
//     //     <a onClick={handleLogout} href={"/"} type="button" className=" bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">Logout</a>
//     // );
// };

// export default LogoutButton;