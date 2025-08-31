import { useEffect, useState } from "react";
import { useApp } from "@contexts/AppContext";
import { Post, ProfileData } from "@utils/definitions";
import { generateImageUrl } from "@utils/supabase";
import { Loader, LogOut } from "react-feather";
import toast from "react-hot-toast";
import PostCard from "@pages/PostCard/PostCard";
import { generateUUID, uploadImage } from "@utils/helper";
import { Button } from "@components/ui/button";
import ProfileCard from "./ProfileCard";
import CreatePostDialog from "../PostCard/CreatePostDialog";
import "@/styles/User.scss";
import DeleteDialog from "@pages/PostCard/DeleteDialog";
import Footer from "@components/layouts/Footer";
import { fetchUserProfile, signOut, updateUserTable } from "@/services/UserApi";
import {
  deletePost,
  fetchAllPosts,
  insertPost,
  updatePost,
} from "@/services/PostApi";
import { useParams } from "react-router-dom";
import { useGetProfile } from "@hooks/getProfile";

export const LoaderProfile = () => {
  return (
    <div className="flex justify-center w-full items-center p-4 h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
};

export type PostError = {
  content: string;
  imageUrl: string;
};

export default function User() {
  // * Profile id means you are viewing someone else's profile, but you or who is logged in has his id in user
  const { user } = useApp();
  const { id: profileId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createDialog, setCreateDialog] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  console.log("profile", profileId);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof editedProfileData, string>>
  >({});

  const [editedProfileData, setEditedProfileData] = useState<
    ProfileData & { userFile: null | File }
  >({} as ProfileData & { userFile: null | File });

  const [postErr, setPostErr] = useState<PostError>({
    content: "",
    imageUrl: "",
  });

  const [newPost, setNewPost] = useState<Post & { imageFile: null | File }>(
    {} as Post & { imageFile: null | File }
  );

  const [posts, setPosts] = useState<Post[]>([]);

  // ✅ Move the hook call to the top level - this is the correct way
  const id = (profileId ? profileId : user?.id) || "";
  const { profile, isLoading: profileLoading } = useGetProfile(id);

  //   ******************************* Integration *****************************

  async function handleFileUpload(file: File | null, bucket: string) {
    if (!file || !(file instanceof File)) return "";
    try {
      setIsLoading(true);
      const res = await uploadImage(file, bucket);
      if (res.error) throw new Error(res.error);
      const postImageUrl = generateImageUrl(bucket, res.data.path);
      return postImageUrl;
    } catch (err) {
      toast.error("Error uploading post image");
    } finally {
      setIsLoading(false);
    }
  }

  const validateProfileData = (
    data: ProfileData & { userFile: null | File }
  ) => {
    let errors: { [key in keyof typeof editedProfileData]?: string } = {};
    if (!data.name?.trim()) errors.name = "Name is required";
    if (data.name?.length > 50) errors.name = "Only 50 characters are allowed";
    if (!data.role?.trim()) errors.role = "Role is required";
    if (data.role?.length > 50) errors.role = "Only 50 characters are allowed";
    if (!data.location?.trim()) errors.location = "Location is required";
    if (!data.bio?.trim()) errors.bio = "Description is required";
    if (data.bio?.length > 500) errors.bio = "Only 500 characters are allowed";

    if (!data.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Invalid email format";
    } else if (data.email?.length > 50) {
      errors.email = "Only 50 characters are allowed";
    }

    if (
      data.github &&
      !/^https:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/.test(data.github)
    ) {
      errors.github = "Invalid GitHub URL";
    }

    console.log("between validation field");

    if (
      data.linkedIn &&
      !/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/.test(
        data.linkedIn
      )
    ) {
      errors.linkedIn = "Invalid LinkedIn URL";
    }

    if (data.userFile && !data.userFile.name.endsWith(".jpg")) {
      errors.userFile = "Profile image must be a JPG file";
    }

    setErrors(errors);
    return errors;
  };

  const handleEditProfile = async () => {
    if (!editedProfileData) return;
    const errors = validateProfileData(editedProfileData);
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
      return;
    } else {
      console.log("Profile data is valid!");
    }

    setIsLoading(true);
    const userImageUrl =
      editedProfileData.userFile &&
      (await handleFileUpload(editedProfileData.userFile, "UserImage"));

    const { userFile, ...updatedEditedProfile } = editedProfileData;
    updatedEditedProfile.profileImage = userImageUrl || "";

    toast.success("Successfully Image Uploaded!");

    await updateUserTable({
      userId: user?.id || "",
      data: updatedEditedProfile,
    });

    setIsEditing(false);
    setIsLoading(false);
  };

  async function handleSignOut() {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  }

  function onValueChange(f: string, val: string | File): void {
    setEditedProfileData((prev) => ({ ...prev, [f]: val }));
  }

  function handleDialogChange(f: string, val: string | File | null): void {
    setNewPost((prev) => ({ ...prev, [f]: val }));
  }

  function handleCancelDialog() {
    setCreateDialog("");
    setNewPost(newPost);
  }

  async function getAllPosts(userId: string) {
    setIsLoading(true);
    const data = await fetchAllPosts(userId);
    if (data) {
      setPosts(data);
    }
    setIsLoading(false);
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

  async function handleEditPost() {
    if (!newPost) return;
    setIsLoading(true);
    const validation = validatePost();

    if (!validation) return;

    let postImageUrl;
    if (newPost.imageFile) {
      postImageUrl = await handleFileUpload(newPost.imageFile, "PostImages");
      postImageUrl && toast.success("Successfully Image Uploaded!");
    }

    const updatedPost = {
      content: newPost.content,
      imageUrl: newPost.imageUrl
        ? newPost.imageUrl
        : postImageUrl
        ? postImageUrl
        : "",
      id: newPost.id,
      author: editedProfileData.id,
    };

    await updatePost(updatedPost);
    await getAllPosts(user ? user.id : "");
    setNewPost(newPost);
    setCreateDialog("");
    setIsLoading(false);
  }

  async function createNewPost() {
    const validation = validatePost();

    if (!validation) return;
    setIsLoading(true);

    let postImageUrl;
    if (newPost.imageFile) {
      postImageUrl = await handleFileUpload(newPost.imageFile, "PostImages");
      postImageUrl && toast.success("Successfully Image Uploaded!");
    }

    const updatedPost = {
      content: newPost.content,
      imageUrl: postImageUrl || "",
      id: generateUUID(),
      author: editedProfileData.id,
    };

    await insertPost(updatedPost, user?.id || "");
    handleCancelDialog();
    await getAllPosts(user ? user.id : "");
    setIsLoading(false);
  }

  async function handleDeletePost(postId: string) {
    if (!postId) return;
    setIsLoading(true);
    await deletePost(postId);
    setDeleteDialog(false);
    await getAllPosts(user ? user.id : "");
    setIsLoading(false);
  }

  useEffect(() => {
    if (!user && !profileId) return;
    console.log("id", id);
    // ✅ Use the profile data from the hook instead of calling the hook inside useEffect
    setEditedProfileData(profile);
    setIsLoading(profileLoading);
    getAllPosts(id);
  }, [profile, profileLoading, id, user, profileId]);

  useEffect(() => {
    if (createDialog === "edit" && selectedPost) {
      setNewPost({ ...selectedPost, imageFile: null });
    }
  }, [createDialog, selectedPost]);

  return isLoading ? (
    <LoaderProfile />
  ) : (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="h-64 p-4 relative text-white w-full bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col">
        {!profileId && (
          <div className="cursor-pointer flex ml-auto flex-row gap-5">
            <span>Follow</span>
            <span
              onClick={() => {
                if (isEditing) {
                  handleEditProfile();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save" : "Edit"} Profile
            </span>
            <LogOut onClick={handleSignOut} />
          </div>
        )}
        <div
          className={`flex justify-center items-center ${
            profileId ? "mt-5" : ""
          }`}
        >
          <ProfileCard
            editedProfileData={editedProfileData}
            onValueChange={onValueChange}
            isEditing={isEditing}
            errors={errors}
            handleEditProfile={handleEditProfile}
            handleCancel={() => setIsEditing(false)}
          />
        </div>
      </div>

      {createDialog && (
        <CreatePostDialog
          open={createDialog.trim() !== ""}
          isEdit={createDialog === "edit"}
          onOpenChange={() => setCreateDialog("")}
          newPost={newPost}
          createNewPost={createNewPost}
          handleDialogChange={handleDialogChange}
          postErr={postErr}
          handleEditPost={handleEditPost}
          handleCancelDialog={handleCancelDialog}
        />
      )}

      {deleteDialog && selectedPost && (
        <DeleteDialog
          open={deleteDialog}
          id={selectedPost.id}
          handleCancel={() => setDeleteDialog(false)}
          handleDelete={handleDeletePost}
        />
      )}

      <div className={`postContainer mb-12 ${isEditing ? "mt-100" : "mt-80"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-zinc-600 font-bold mb-6">Posts</h2>
          {!profileId && (
            <Button
              className=" text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setCreateDialog("create")}
            >
              Create Post
            </Button>
          )}
        </div>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userImage={post.authorImage || ""}
                userId={user?.id || ""}
                username={post.authorName}
                content={post.content}
                imageUrl={post.imageUrl}
                onEditToggle={
                  !profileId
                    ? () => {
                        setCreateDialog("edit");
                        setSelectedPost(post);
                      }
                    : undefined
                }
                onDeleteToggle={
                  !profileId
                    ? () => {
                        setDeleteDialog(true);
                        setSelectedPost(post);
                      }
                    : undefined
                }
              />
            ))
          ) : (
            <div className="text-gray-700  font-semibold mt-4">
              You haven't posted anything yet.{" "}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
