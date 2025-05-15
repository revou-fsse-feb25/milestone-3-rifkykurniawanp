import Title from "./title";
import Button from "./loginbutton";
import LoginButton from "./loginbutton";
import Image from "next/image";
// import Login from "./login/page";
import Revou from "../../../public/asset/logo.png";
import LogoutButton from "./logoutbutton";



const Header = ({isLogin,children}) => {
    return ( <>
       <header className="flex justify-between items-center bg-gray-200 p-2 sticky top-0">
       <Image src={Revou} alt="logo" width={100} height={100}></Image>
        {/* <Image/> */}

        <Title/>
        
        {isLogin ? <LogoutButton/> : <LoginButton/>}
        
        
       </header>  
       {children}
    </>
     );
};

export default  Header;