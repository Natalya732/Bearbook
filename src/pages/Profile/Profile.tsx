import React, { useState } from "react";
import { Edit2, GitHub, Linkedin, MapPin, Mail, LogOut } from "react-feather";
import { Button } from "primereact/button";
import PostCard from "../PostCard/PostCard";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import Supabase from "@utils/supabase";
import { useNavigate } from "react-router-dom";
interface ProfileData {
  name: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  profileImage: string;
  following: number;
  followers: number;
  isFollowing: boolean;
}

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [createDialog, setCreateDialog] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", imageUrl: "" });
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Nikita Pandey",
    role: "Software Developer",
    location: "India",
    email: "nikita@example.com",
    github: "github.com/nikita",
    linkedin: "linkedin.com/in/nikita",
    bio: "Passionate software developer with expertise in React and TypeScript.",
    profileImage: "https://via.placeholder.com/150",
    followers: 1234,
    following: 567,
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

  const handleFollow = () => {
    setProfileData((prev) => ({
      ...prev,
      followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1,
      isFollowing: !prev.isFollowing,
    }));
  };

  const handleSubmitPost = () => {
    toast.success("asdfa");
    setCreateDialog(false);
    setNewPost({ content: "", imageUrl: "" });
  };
  interface SignOutResponse {
    success: boolean;
    message: string;
    error?: string;
  }

  async function signOut(): Promise<SignOutResponse> {
    try {
      const { error } = await Supabase.auth.signOut();
      if (error) {
        return {
          success: false,
          message: "Failed to sign out",
          error: error.message,
        };
      }
      return {
        success: true,
        message: "Signed out successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: "An error occurred",
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      <div className="h-64 w-full bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {isEditing && (
          <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-lg">
            <Edit2 size={20} className="text-gray-700" />
          </button>
        )}
      </div>
      <div
        onClick={async () => {
          const res = await signOut();
          if (!res) {
            toast.error("Something went wrong");
            return;
          }
          navigate("/auth");
        }}
        className=" flex gap-2 absolute right-8 top-10 text-white cursor-pointer text-sm items-center"
      >
        Logout
        <LogOut />
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
              className="p-2 border rounded-md"
              placeholder="Enter image URL"
            />
          </div>
        </div>
      </Dialog>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start gap-6 mb-6">
            <div className="relative">
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData.name}
                  </h1>
                  <p className="text-lg text-gray-600">{profileData.role}</p>
                  <div className="flex items-center gap-6 text-gray-600 mt-3">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {profileData.followers}
                        </span>
                        <span className="text-gray-500">followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {profileData.following}
                        </span>
                        <span className="text-gray-500">following</span>
                      </div>
                    </div>
                  </div>
                </div>
                asdfa]
                <div className="flex gap-4 text-white">
                  <Button
                    label={profileData.isFollowing ? "Following" : "Follow"}
                    icon={
                      profileData.isFollowing ? "pi pi-check" : "pi pi-plus"
                    }
                    onClick={handleFollow}
                  />
                  <Button
                    label={isEditing ? "Save Profile" : "Edit Profile"}
                    icon="pi pi-user-edit"
                    onClick={() => setIsEditing(!isEditing)}
                  />
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <p className="text-gray-700">{profileData.bio}</p>
              </div>
            </div>
          </div>

          {/* Contact and Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span className="text-gray-700">{profileData.email}</span>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Social Links</h2>
              <div className="space-y-2">
                <a
                  href={`https://${profileData.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <GitHub size={16} />
                  {profileData.github}
                </a>
                <a
                  href={`https://${profileData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Linkedin size={16} />
                  {profileData.linkedin}
                </a>
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
