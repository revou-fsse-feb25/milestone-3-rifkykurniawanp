// import LoginPage from "";

import Link from "next/link";

const LoginButton = () => {
    return (
        <Link href={"/login"} type="button" className=" bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">Login</Link>
    );
};

export default LoginButton;