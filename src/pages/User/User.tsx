import { useEffect, useState } from "react";
import { useApp } from "@contexts/AppContext";
import { Post, ProfileData } from "@utils/definitions";
import supabase, { generateImageUrl } from "@utils/supabase";
import { Loader, LogOut } from "react-feather";
import toast from "react-hot-toast";
import PostCard from "@pages/PostCard/PostCard";
import { generateUUID, uploadImage } from "@utils/helper";
import { Button } from "@components/ui/button";
import ProfileCard from "./ProfileCard";
import CreatePostDialog from "../PostCard/CreatePostDialog";
import "@styles/User.scss";
import DeleteDialog from "@pages/PostCard/DeleteDialog";
import Footer from "@components/layouts/Footer";

export const LoaderProfile = () => {
  return (
    <div className="flex justify-center items-center p-4 h-screen">
      <Loader className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );
};

export type PostError = {
  content: string;
  imageUrl: string;
};

export default function User() {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createDialog, setCreateDialog] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);

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

  const [postErr, setPostErr] = useState<PostError>({
    content: "",
    imageUrl: "",
  });

  const [newPost, setNewPost] = useState<Post & { imageFile: null | File }>(
    postObject
  );

  const [posts, setPosts] = useState<Post[]>([]); //   ******************************* Integration *****************************
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
      const userImageUrl =
        editedProfileData.userFile &&
        (await handleFileUpload(editedProfileData.userFile, "PostImages"));

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

  function onValueChange(f: string, val: string | File): void {
    setEditedProfileData((prev) => ({ ...prev, [f]: val }));
  }

  function handleDialogChange(f: string, val: string | File | null): void {
    setNewPost((prev) => ({ ...prev, [f]: val }));
  }

  function handleCancelDialog() {
    setCreateDialog("");
    setNewPost(postObject);
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

  async function handleEditPost() {
    if (!newPost) return;
    try {
      setIsLoading(true);
      const validation = validatePost();

      if (!validation) {
        return;
      }

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
      const { error } = await supabase
        .from("Posts")
        .update({
          ...updatedPost,
        })
        .eq("id", newPost.id);

      if (error) {
        throw new Error(error.message);
      }

      if (!error) {
        toast.success("Successfully Post Updated");
      }
      setCreateDialog("");
      setNewPost(postObject);
      getAllPosts(user ? user.id : "");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewPost() {
    try {
      setIsLoading(true);
      const validation = validatePost();

      if (!validation) {
        setIsLoading(false);
        return;
      }

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

      const { error, status } = await supabase
        .from("Posts")
        .insert([updatedPost]);

      setIsLoading(false);
      if (error) throw new Error(error.message);
      if (status === 201) toast.success("Successfully Post created");
      user && getAllPosts(user.id);
      handleCancelDialog();
    } catch (err) {
      console.log("error", err);
    }
  }

  async function handleDeletePost(postId: string) {
    if (!postId) return;
    try {
      setIsLoading(true);
      const { error } = await supabase.from("Posts").delete().eq("id", postId);
      setIsLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Successfully deleted");
      getAllPosts(user ? user.id : "");
    } catch (err) {
      toast.error("Failed to delete Post");
    } finally {
      setDeleteDialog(false);
    }
  }

  useEffect(() => {
    getUserProfile(user ? user.id : "");
    getAllPosts(user ? user.id : "");
  }, []);

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
        <div className="cursor-pointer flex ml-auto flex-row gap-5">
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
        <div className="flex justify-center items-center">
          <ProfileCard
            editedProfileData={editedProfileData}
            onValueChange={onValueChange}
            isEditing={isEditing}
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
          <Button
            className=" text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setCreateDialog("create")}
          >
            Create Post
          </Button>
        </div>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userImage={post.authorImage || ""}
                username={post.authorName}
                content={post.content}
                imageUrl={post.imageUrl}
                onEditToggle={() => {
                  setCreateDialog("edit");
                  setSelectedPost(post);
                }}
                onDeleteToggle={() => {
                  setDeleteDialog(true);
                  setSelectedPost(post);
                }}
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
