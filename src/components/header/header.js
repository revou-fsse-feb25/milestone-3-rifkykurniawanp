import Title from "./title";
import Button from "./loginbutton";
import LoginButton from "./loginbutton";
// import Login from "./login/page";
import Image from "../../../public/asset/logo.png";


const Header = () => {
    return (
       <header className="flex justify-between items-center bg-gray-200 p-2 sticky top-0">
        <img src={Image} alt="logo revou" ></img>
        
        <Title/>
        
        
        <LoginButton/>
       </header>  
     );
};

export default  Header;