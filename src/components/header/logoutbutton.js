// import LoginPage from "";

import Link from "next/link";

const LogoutButton = () => {
    return (
        <a onClick={() => localStorage.removeItem("isLoggedIn")} href={"/"} type="button" className=" bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">Logout</a>
    );
};

export default LogoutButton;