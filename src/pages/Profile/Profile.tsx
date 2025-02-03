import React, { useEffect, useState } from "react";
import {
  Edit2,
  GitHub,
  MapPin,
  Mail,
  LogOut,
  Loader,
  Linkedin,
} from "react-feather";
import { Button } from "primereact/button";
import PostCard from "../PostCard/PostCard";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import supabase from "@utils/supabase";
import { useApp } from "@contexts/AppContext";
import { getCountries } from "@utils/api";
import { Dropdown } from "primereact/dropdown";
import { Post, ProfileData } from "@utils/definitions";

const Profile: React.FC = () => {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [countries, setCountries] = useState<String[]>([]);
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null);
  const [createDialog, setCreateDialog] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", imageUrl: "" });
  const [profileData, setProfileData] = useState<ProfileData>({
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
  });

  const [posts] = useState<Post[]>([
    {
      id: "1",
      content: "Just launched my new React project! Check it out ",
      imageUrl: "https://via.placeholder.com/600x400",
    },
    {
      id: "2",
      content:
        "Learning TypeScript has been an amazing journey. Here's what I've learned so far...",
    },
  ]);

  // ************************** integration ***************************

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
        setEditedProfile(data);
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

  const handleFollow = () => {
    setProfileData((prev) => ({
      ...prev,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1,
      isFollowing: !prev.isFollowing,
    }));
  };

  const handleSubmitPost = () => {
    setCreateDialog(false);
    setNewPost({ content: "", imageUrl: "" });
  };

  const handleEditProfile = async () => {
    if (!editedProfile) return;
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("User")
        .update({
          name: editedProfile.name,
          role: editedProfile.role,
          location: editedProfile.location,
          bio: editedProfile.bio,
          github: editedProfile.github,
          linkedIn: editedProfile.linkedIn,
          email: editedProfile.email,
          profileImage: editedProfile.profileImage,
        })
        .eq("id", user?.id);
      setIsLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }

      setProfileData(editedProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  async function signOut() {
    setIsLoading(true);
    const res = await supabase.auth.signOut();
    setIsLoading(false);
    return res;
  }

  useEffect(() => {
    async function fetchCountries() {
      const data = await getCountries();
      setCountries(data);
    }
    fetchCountries();
    getUserProfile(user ? user?.id : "");
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center p-4 h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <div className="h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {isEditing && (
          <button className="absolute right-52 top-52 bg-white p-2 rounded-full shadow-lg">
            <Edit2 size={20} className="text-gray-700" />
          </button>
        )}
        <div
          onClick={async () => {
            const res = await signOut();
            if (!res) {
              toast.error("Something went wrong");
              return;
            }
          }}
          className=" flex gap-2 absolute right-8 top-10 text-white cursor-pointer text-sm items-center"
        >
          Logout
          <LogOut />
        </div>
      </div>
      <Dialog
        header="Create Post"
        visible={createDialog}
        className="p-4 rounded bg-white"
        style={{ width: "500px" }}
        onHide={() => setCreateDialog(false)}
        footer={
          <div className="flex justify-end gap-4 mt-5">
            <Button
              className="p-button-text "
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setCreateDialog(false)}
            />
            <Button
              label="Create Post"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              icon="pi pi-check"
              onClick={handleSubmitPost}
              autoFocus
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-medium">
              Content
            </label>
            <textarea
              id="content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, content: e.target.value }))
              }
              className="p-2 border rounded-md"
              rows={4}
              placeholder="What's on your mind?"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl" className="font-medium">
              Image URL (optional)
            </label>
            <input
              type="text"
              id="imageUrl"
              value={newPost.imageUrl}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              className="p-2 border border-white rounded-md"
              placeholder="Enter image URL"
            />
          </div>
        </div>
      </Dialog>

      <div className="px-44 absolute top-32 w-full ">
        <div className="bg-transparent rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <img
                src={profileData.profileImage || editedProfile?.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg flex justify-center items-center object-cover"
              />
              {isEditing && (
                <input
                  type="file"
                  placeholder="Select Image"
                  className="w-28 mt-3 border rounded p-2"
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files && files.length) {
                      setEditedProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              profileImage: URL.createObjectURL(files[0]),
                            }
                          : null
                      );
                    }
                  }}
                />
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.name || ""}
                      onChange={(e) => {
                        const newValue = e.target.value;

                        if (newValue.length > 100) {
                          toast.error("More than 100 characters not allowed.");
                          return;
                        }

                        setEditedProfile((prev) =>
                          prev ? { ...prev, name: newValue } : null
                        );
                      }}
                      className="text-3xl font-bold border-white mr-2 border rounded pxf-2"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profileData.name}
                    </h1>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.role || ""}
                      onChange={(e) =>
                        setEditedProfile((prev) =>
                          prev ? { ...prev, role: e.target.value } : null
                        )
                      }
                      className="text-lg text-gray-600 border-white border rounded px-2 mt-2"
                    />
                  ) : (
                    <p className="text-lg text-gray-600">{profileData.role}</p>
                  )}
                  <div className="flex items-center gap-6 text-gray-600 mt-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {isEditing ? (
                        <Dropdown
                          className="p-2 w-full"
                          editable
                          options={countries}
                          value={editedProfile?.location}
                          placeholder="Select your location"
                          onChange={(e) =>
                            setEditedProfile((prev) =>
                              prev ? { ...prev, location: e.value } : null
                            )
                          }
                        />
                      ) : (
                        <span>{profileData.location}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {profileData.followers || 0}
                        </span>
                        <span className="text-gray-600">followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {profileData.following || 0}
                        </span>
                        <span className="text-gray-600">following</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 w-60 text-white">
                  <Button
                    className="w-full border-0"
                    label={profileData.isFollowing ? "Following" : "Follow"}
                    icon={
                      profileData.isFollowing ? "pi pi-check" : "pi pi-plus"
                    }
                    onClick={handleFollow}
                  />
                  <Button
                    className="flex w-full"
                    label={isEditing ? "Save Profile" : "Edit Profile"}
                    icon="pi pi-user-edit"
                    onClick={() => {
                      if (isEditing) {
                        handleEditProfile();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="my-10">
                {isEditing ? (
                  <textarea
                    value={editedProfile?.bio || ""}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue.length > 250)
                        toast.error("Word length should not exceed 250 words.");
                      setEditedProfile((prev) =>
                        prev ? { ...prev, bio: e.target.value } : null
                      );
                    }}
                    className="w-full text-gray-700 border rounded p-2"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-700">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-600" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile?.email || ""}
                    onChange={(e) =>
                      setEditedProfile((prev) =>
                        prev ? { ...prev, email: e.target.value } : null
                      )
                    }
                    className="border rounded p-2"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.email}</span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Social Links</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GitHub size={16} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.github || ""}
                      onChange={(e) =>
                        setEditedProfile((prev) =>
                          prev ? { ...prev, github: e.target.value } : null
                        )
                      }
                      className="border rounded p-2"
                    />
                  ) : (
                    <a
                      href={`https://${profileData.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profileData.github}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin size={16} />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.linkedIn || ""}
                      onChange={(e) =>
                        setEditedProfile((prev) =>
                          prev ? { ...prev, linkedIn: e.target.value } : null
                        )
                      }
                      className="border rounded p-2"
                    />
                  ) : (
                    <a
                      href={`https://${profileData.linkedIn}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {profileData.linkedIn}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-6">Posts</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setCreateDialog(true)}
            >
              Create Post
            </button>
          </div>
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userImage={profileData.profileImage}
                username={profileData.name}
                content={post.content}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
