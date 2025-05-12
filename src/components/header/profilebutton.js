// import ProfilePage from "";

import Link from "next/link";

const ProfileButton = () => {
    return (
        <Link href={"/Profile"} type="button" className=" bg-green-500 hover:bg-green-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded">Profile</Link>
    );
};

export default ProfileButton;