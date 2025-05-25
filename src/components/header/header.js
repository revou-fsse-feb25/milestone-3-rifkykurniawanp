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

      <div className="sticky top-0 z-50">
            <h1 className="text-4xl font-bold text-center p-5 bg-a text-black">Revo shop</h1>
      </div>
        
      <div className="flex gap-2">
            {/* <button><LogoutButton/></button> */}
            <button ><a href="/">Home</a></button>
     </div>
        
       </header>  
       {children}
    </>
     );
};

export default  Header;