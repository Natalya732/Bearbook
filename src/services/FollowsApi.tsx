import supabase from "@utils/supabase";
import toast from "react-hot-toast";

interface Post {
  id: string;
  userImage: string;
  username: string;
  content: string;
  imageUrl?: string;
}

export async function getAllFollowingPosts(userId: string, page: number) {
  let { data: Follows, error: FollowError } = await supabase
    .from("Follows")
    .select("following_id")
    .eq("follower_id", userId);

  if (FollowError) {
    console.error("Error Fetching follows : ", FollowError);
    return;
  }

  const followingIds = Follows?.map((f) => f.following_id) || [];

  if (followingIds?.length === 0) {
    console.log("No following users, empty feed");
    return;
  }

  let { data: Posts, error: PostError } = await supabase
    .from("Posts")
    .select("*, User(*)")
    .in("author", followingIds);

  if (PostError) {
    console.error("Error fetching  posts", PostError);
    return;
  }

  if (!Posts?.length) {
    toast.success("You have no posts yet");
    console.log("no posts empty feed");
    return;
  }

  const newPostArray: Post[] = Posts?.map((item) => ({
    id: item.id,
    content: item.content,
    imageUrl: item.imageUrl,
    username: item.User.name,
    userImage: item.User.profileImage,
    userId: item.User.id,
  }));

  const pageStart = (page - 1) * 2;
  const pageEnd = pageStart + 2;
  console.log({ pageStart, pageEnd, page });
  const pageContent = newPostArray.slice(pageStart, pageEnd);

  return pageContent;
}
