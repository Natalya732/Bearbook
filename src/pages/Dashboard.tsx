import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard/PostCard";
import { Loader } from "react-feather";
import { useApp } from "@contexts/AppContext";
import { getAllFollowingPosts } from "@/services/FollowsApi";
import SuggestedUser from "./SuggestedUser";
interface Post {
  id: string;
  userImage: string;
  username: string;
  content: string;
  imageUrl?: string;
  userId?: string;
}

export default function Dashboard() {
  const { user } = useApp();
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMorePosts = async () => {
    const newPosts = await getAllFollowingPosts(user?.id || "", page);
    if (!newPosts) return;
    setPosts((prev) => [...prev, ...newPosts]);
    setPage((prev) => prev + 1);
    if (newPosts.length === 0) setHasMore(false);
  };

  useEffect(() => {
    fetchMorePosts();
  }, []);

  return (
    <div className="min-h-screen w-full flex gap-5\ py-8 px-4 scroll-smooth scrollbar-hide">
      <div className="w-full space-y-8 p-3">
        <div className="text-2xl font-bold">Your Feed</div>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          key={user?.id || ""}
          loader={
            <div className="flex justify-center items-center p-4">
              <Loader className="animate-spin text-text-gradient" />
            </div>
          }
          endMessage={
            <div className="text-center text-gray-500 p-4">
              You've caught up with all posts!
            </div>
          }
        >
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userImage={post.userImage}
                userId={post.userId || ""}
                username={post.username}
                content={post.content}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className="w-1/3 hidden lg:block">
        <SuggestedUser refetchPosts={fetchMorePosts} />
      </div>
    </div>
  );
}
