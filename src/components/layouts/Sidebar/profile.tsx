import { ProfileData } from "@utils/definitions";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDiv = ({
  profile,
  sidebarState,
}: {
  profile: ProfileData & { userFile: null | File };
  sidebarState: "expanded" | "collapsed";
}) => {
  const navigate = useNavigate();

  if (sidebarState === "collapsed") {
    return (
      <div className="flex flex-col gap-3 items-center justify-center">
        <img
          src={profile.profileImage}
          alt="profile"
          className="w-12 h-12 rounded-full cursor-pointer object-cover border-2 border-gray-200"
          onClick={() => navigate("/user/")}
        />
        <LogOut
          onClick={() => {}}
          className="cursor-pointer hover:text-blue-500 w-5 h-5"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-3 items-center w-full">
      <div
        className="flex gap-3 flex-1 items-center cursor-pointer"
        onClick={() => navigate("/user/")}
      >
        <img
          src={profile.profileImage}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-bold truncate">{profile.name}</h1>
          <p className="text-sm text-gray-500 truncate">{profile.role}</p>
        </div>
      </div>
      <LogOut
        onClick={() => {}}
        className="cursor-pointer hover:text-blue-500 w-5 h-5 flex-shrink-0 transition-colors duration-200"
      />
    </div>
  );
};

export default ProfileDiv;
