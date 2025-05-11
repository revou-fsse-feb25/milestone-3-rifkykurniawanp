import Title from "./title";
import Button from "./button";
// import Login from "./login/page";


const Header = () => {
    return (
       <header className="flex justify-between items-center bg-amber-500 p-2">
        <Title/>
        <Button/>
        {/* <Login/> */}
       </header>  
     );
};

export default  Header;