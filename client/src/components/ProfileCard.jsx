import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function ProfileCard() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return ( 
      <div className="md:w-1/3 w-full h-auto md:h-[410px] p-6 bg-white rounded-lg shadow-lg mt-4 md:mt-2 dark:bg-slate-800 flex flex-col items-center">
        <h2 className="text-xl font-semibold mt-4">Please Sign Up to Continue</h2>
        <Link to="/sign-up">
        <Button gradientDuoTone="purpleToBlue" className="mt-4">Sign Up</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="md:w-1/3 w-full h-auto md:h-[410px] p-6 bg-white rounded-lg shadow-lg mt-5 md:mt-4 dark:bg-slate-800">
      <div className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mt-1 mb-4">Profile</h1>
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.profilePic?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }}
            alt="user"
            className="rounded-full w-full h-full object-cover border-4 border-[lightgray]"
          />
        </div>
        <h2 className="text-xl font-semibold mt-4">{currentUser?.username}</h2>
        <p className="text-gray-600 mt-4 dark:text-gray-400">@{currentUser?.email}</p>
        <Link to="/dashboard?tab=profile">
        <Button gradientDuoTone="purpleToBlue" className="mt-4">Edit Profile</Button>
        </Link>
        
      </div>
    </div>
  );
}
