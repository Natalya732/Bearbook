import { useEffect, useRef, useState } from "react";
import { useApp } from "@contexts/AppContext";
import { Post, ProfileData } from "@utils/definitions";
import supabase, { generateImageUrl } from "@utils/supabase";
import {
  GitHub,
  Linkedin,
  Loader,
  LogOut,
  Mail,
  MapPin,
  X,
} from "react-feather";
import toast from "react-hot-toast";
import EditComponent from "./EditUser";
import PostCard from "@pages/PostCard/PostCard";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
import { generateUUID, uploadImage } from "@utils/helper";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";

const LoaderProfile = () => {
  return (
    <div className="flex justify-center items-center p-4 h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
};

export default function User() {
  const { user } = useApp();
  const imgRef = useRef<HTMLInputElement>(null);
  const postImgRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createDialog, setCreateDialog] = useState<boolean>(true);

  type PostError = {
    content: string;
    imageUrl: string;
  };

  const profileObject = {
    id: "",
    name: "",
    role: "",
    location: "",
    email: "",
    github: "",
    linkedIn: "",
    userFile: null,
    bio: "",
    profileImage: "",
    followers: 0,
    following: 0,
    isFollowing: false,
  };

  const postObject = {
    id: "",
    content: "",
    imageUrl: "",
    imageFile: null,
    created_at: "",
    authorName: "",
    authorImage: "",
  };

  const [editedProfileData, setEditedProfileData] = useState<
    ProfileData & { userFile: null | File }
  >(profileObject);

  const [profileData, setProfileData] = useState<ProfileData>(profileObject);

  const [postErr, setPostErr] = useState<PostError>({
    content: "",
    imageUrl: "",
  });
  const [newPost, setNewPost] = useState<Post & { imageFile: null | File }>(
    postObject
  );

  const [posts, setPosts] = useState<Post[]>([]);

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

  async function handleFileUpload(file: File | null, bucket: string) {
    if (!file || !(file instanceof File)) return false;

    try {
      setIsLoading(true);
      const res = await uploadImage(file, bucket);
      setIsLoading(false);
      if (res.error) throw new Error(res.error);
      const postImageUrl = generateImageUrl(bucket, res.data.path);
      return postImageUrl;
    } catch (err) {
      toast.error("Error uploading post image");
    }
  }

  const handleEditProfile = async () => {
    if (!editedProfileData) return;
    try {
      const userImageUrl = editedProfileData.userFile
        ? await handleFileUpload(editedProfileData.userFile, "PostImages")
        : profileData.profileImage;

      if (!userImageUrl) return;

      const { userFile, ...updatedEditedProfile } = editedProfileData;
      updatedEditedProfile.profileImage = userImageUrl;

      toast.success("Successfully Image Uploaded!");

      setIsLoading(true);
      const { error } = await supabase
        .from("User")
        .update({
          ...updatedEditedProfile,
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

  async function getAllPosts(userId: string) {
    try {
      setIsLoading(true);
      const { data: posts, error } = await supabase
        .from("User")
        .select(`name, profileImage, Posts (content, imageUrl, created_at,id)`)
        .order("created_at", { ascending: false })
        .eq("id", userId);

      setIsLoading(false);
      if (error) throw new Error(error.message);

      const postsArray: Post[] = posts
        .map((item) => {
          return item.Posts.map((post) => ({
            authorName: item.name,
            authorImage: item.profileImage,
            ...post,
          }));
        })
        .flat();
      setPosts(postsArray);
      return null;
    } catch (err) {
      console.log("Error in getting all posts", err);
      toast.error("Error fetching all the posts");
    }
  }

  function validatePost() {
    let newError: PostError = {
      content: "",
      imageUrl: "",
    };

    if (newPost.content.trim() === "") {
      newError.content = "Please write some content for the post";
    }

    if (newPost.imageFile && !newPost.imageFile?.name.endsWith(".jpg")) {
      newError.imageUrl = "Only jpg images are allowed";
    }
    setPostErr(newError);
    const error = Object.values(newError).some((item) => item !== "");
    if (!error) return true;
    return false;
  }

  async function createNewPost() {
    try {
      setIsLoading(true);
      const validation = validatePost();

      if (!validation) {
        setIsLoading(false);
        return;
      }

      const postImageUrl = await handleFileUpload(
        newPost.imageFile,
        "PostImages"
      );

      if (!postImageUrl) return;

      toast.success("Successfully Image Uploaded!");

      const updatedPost = {
        content: newPost.content,
        imageUrl: postImageUrl,
        id: generateUUID(),
        author: profileData.id,
      };

      const { data, error, status } = await supabase
        .from("Posts")
        .insert([updatedPost]);

      setIsLoading(false);
      if (error) throw new Error(error.message);
      if (status === 201) toast.success("Successfully Post created");
      user && getAllPosts(user.id);
      setCreateDialog(false);
    } catch (err) {
      console.log("error", err);
    }
  }

  function onValueChange(f: string, val: string) {
    setEditedProfileData((prev) => ({ ...prev, [f]: val }));
  }

  useEffect(() => {
    getUserProfile(user ? user.id : "");
    getAllPosts(user ? user.id : "");
  }, []);

  const createPostDialog = (
    <Dialog open={createDialog} onOpenChange={setCreateDialog}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Create Post
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              What’s on your mind today?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-3">
            <textarea
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={newPost.content}
              onChange={(e) => {
                setNewPost((prev) => ({ ...prev, content: e.target.value }));
              }}
              placeholder="Write something..."
            />
            <span style={{ color: "red" }}>{postErr.content}</span>
          </div>

          <div className="space-y-4 mt-3 flex flex-col gap-2">
            <div
              className={`p-2 flex cursor-pointer justify-between bg-zinc-50 rounded-md flex-1 ${
                postErr.imageUrl ? "border-red-600" : ""
              }`}
              onClick={() => postImgRef.current && postImgRef.current.click()}
            >
              {newPost.imageFile?.name || "Choose a jpg image"}
              <X
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setNewPost((prev) => ({ ...prev, imageFile: null }));
                }}
              />
            </div>
            <input
              type="file"
              id="imageUrl"
              ref={postImgRef}
              style={{ display: "none", width: "0px" }}
              placeholder="Enter Image Url"
              onChange={(e) => {
                const file = e.target.files;
                if (file && file.length) {
                  setNewPost((prev) => ({ ...prev, imageFile: file[0] }));
                }
              }}
            />
            <span style={{ color: "red" }}>{postErr.imageUrl}</span>
          </div>
          <DialogFooter className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setCreateDialog(false);
                setNewPost(postObject);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => createNewPost()}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );

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
                handleEditProfile();
              }
            }}
          >
            {isEditing ? "Save" : "Edit"} Profile
          </span>
          <LogOut onClick={handleSignOut} />
        </div>
        <div className="px-80 w-full">
          <div className="profile px-12 p-4 h-fit mt-32 rounded shadow-lg">
            <div className="flex gap-6">
              <div
                className="image-picker"
                onClick={() => imgRef.current && imgRef.current?.click()}
              >
                <img
                  src={
                    isEditing
                      ? editedProfileData.profileImage
                      : profileData.profileImage
                  }
                  className="h-32 w-32 border-white border-4 rounded-full"
                ></img>
                {isEditing && (
                  <input
                    type="file"
                    ref={imgRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files || null;
                      if (file && file.length) {
                        setEditedProfileData((prev) => ({
                          ...prev,
                          userFile: file[0],
                        }));
                      }
                    }}
                  />
                )}
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

          {createDialog && createPostDialog}

          {/* Posts Section */}
          <div className="mt-8 pb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-zinc-600 font-bold mb-6">Posts</h2>
              <Button
                className=" text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => setCreateDialog(true)}
              >
                Create Post
              </Button>
            </div>
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  userImage={post.authorImage || ""}
                  username={post.authorName}
                  content={post.content}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
