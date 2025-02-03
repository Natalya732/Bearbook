import { useEffect, useRef, useState } from "react";
import { useApp } from "@contexts/AppContext";
import { ProfileData } from "@utils/definitions";
import supabase from "@utils/supabase";
import { GitHub, Linkedin, Loader, LogOut, Mail, MapPin } from "react-feather";
import toast from "react-hot-toast";
import EditComponent from "./EditUser";

const LoaderProfile = () => {
  return (
    <div className="flex justify-center items-center p-4 h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
};

export default function User() {
  const { user } = useApp();
  const imgRef = useRef(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const profileObject = {
    id: "",
    name: "",
    role: "",
    location: "",
    email: "",
    github: "",
    linkedIn: "",
    bio: "",
    profileImage: "",
    followers: 0,
    following: 0,
    isFollowing: false,
  };

  const [editedProfileData, setEditedProfileData] =
    useState<ProfileData>(profileObject);
  const [profileData, setProfileData] = useState<ProfileData>(profileObject);

  //   ******************************* Integration *****************************
  async function getUserProfile(userId: string) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", userId)
        .single();
      setIsLoading(false);
      if (error) {
        toast.error(error.message);
        return null;
      }
      if (data) {
        setProfileData((prev) => ({
          ...prev,
          ...data,
        }));
        setEditedProfileData({ ...data });
      }
      return data;
    } catch (err) {
      let errorMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong fetching User Profile";
      toast.error(errorMsg);
    }
  }

  const handleEditProfile = async () => {
    if (!editedProfileData) return;
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("User")
        .update({
          ...editedProfileData,
        })
        .eq("id", user?.id);

      setIsLoading(false);

      if (error) {
        toast.error(error.message);
        return;
      }

      setProfileData(editedProfileData);
      setIsEditing(false);
      toast.success("Profile updated successfully !");
    } catch (err) {
      toast.error("Failed to update profile!");
    }
  };

  async function handleSignOut() {
    setIsLoading(true);
    const res = await supabase.auth.signOut();
    setIsLoading(false);
    return res;
  }

  function onValueChange(f: string, val: string) {
    setEditedProfileData((prev) => ({ ...prev, [f]: val }));
  }

  useEffect(() => {
    getUserProfile(user ? user.id : "");
  }, []);

  return isLoading ? (
    <LoaderProfile />
  ) : (
    <div className="w-full min-h-screen">
      <div className="h-64 relative p-4 text-white w-full bg-gradient-to-r from-blue-500 to-purple-600 ">
        <div className="cursor-pointer flex absolute top-3 right-3 flex-row gap-5">
          <span>Follow</span>
          <span
            onClick={() => {
              setIsEditing((prev) => !prev);
              if (isEditing) {
                console.log("vlue", isEditing);
                handleEditProfile();
              }
            }}
          >
            {isEditing ? "Save" : "Edit"} Profile
          </span>
          <LogOut onClick={handleSignOut} />
        </div>
        <div className="px-36 w-full">
          <div className="profile px-12 p-4 h-fit mt-32 rounded shadow-lg">
            <div className="flex gap-6">
              <div className="image-picker">
                <img
                  src={profileData.profileImage}
                  className="h-36 w-36 border-white border-8 rounded-full"
                ></img>
                <input type="file" ref={imgRef} style={{ display: "none" }} />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex justify-between text-white">
                  <div className="title mt-4">
                    <EditComponent
                      isEdit={isEditing}
                      value={editedProfileData.name}
                      field="name"
                      styles="main-title tracking-wider text-3xl font-bold"
                      inputStyle="text-3xl font-bold border-white mr-2 border rounded pxf-2"
                      onUpdate={onValueChange}
                    />

                    <EditComponent
                      isEdit={isEditing}
                      value={editedProfileData.role}
                      field="role"
                      styles="text-lg text-gray-100"
                      inputStyle="text-lg text-gray-600 border-white border rounded px-2 mt-2"
                      onUpdate={onValueChange}
                    />
                  </div>
                  <div className="float-right flex gap-6">
                    <span className="flex gap-2">
                      <MapPin />
                      <EditComponent
                        isEdit={isEditing}
                        value={editedProfileData.location}
                        field="location"
                        styles=""
                        inputStyle="p-2 w-full"
                        onUpdate={onValueChange}
                      />
                    </span>
                    <span>{profileData.followers || 0} Followers</span>
                    <span>{profileData.following || 0} Following</span>
                  </div>
                </div>
                <EditComponent
                  isEdit={isEditing}
                  value={editedProfileData.bio}
                  field="bio"
                  styles="description text-zinc-400 mt-10"
                  inputStyle="w-full text-gray-700 border rounded p-2"
                  onUpdate={onValueChange}
                />
              </div>
            </div>
            <div className="text-zinc-700 w-full p-8">
              <hr />
              <div className="flex justify-between  px-12 pt-6">
                <div className="flex flex-1 flex-col gap-3">
                  <h2 className="text-lg font-bold">Contact Information</h2>
                  <div className="flex gap-3">
                    <Mail />{" "}
                    <span>
                      <EditComponent
                        isEdit={isEditing}
                        value={editedProfileData.email}
                        field="email"
                        inputStyle=" text-gray-700 border rounded p-2"
                        styles=""
                        onUpdate={onValueChange}
                      />
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-1 flex-col gap-5 flex-start
                "
                >
                  <h2 className="text-lg font-bold">Social Links</h2>
                  <div className="flex gap-4 pl-4">
                    <GitHub />{" "}
                    <span>
                      <EditComponent
                        isEdit={isEditing}
                        value={editedProfileData.github}
                        field="github"
                        styles=""
                        inputStyle="text-gray-700 border rounded p-2"
                        onUpdate={onValueChange}
                      />
                    </span>
                  </div>
                  <div className="flex gap-4 pl-3">
                    <Linkedin />{" "}
                    <span>
                      <EditComponent
                        isEdit={isEditing}
                        value={editedProfileData.linkedIn}
                        field="linkedIn"
                        styles=""
                        inputStyle="text-gray-700 border rounded p-2"
                        onUpdate={onValueChange}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
