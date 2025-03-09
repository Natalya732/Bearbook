import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard/PostCard";
import { Loader } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui/button";
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
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="flex gap-5">
        <div className="flex-1"></div>
        <div className="w-2/3 max-w-2xl flex-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Your Feed</h1>
            <Button
              onClick={() => navigate("/user")}
              className="bg-blue-500 p-3 rounded text-white cursor-pointer hover:bg-blue-600"
            >
              Your Profile
            </Button>
          </div>

          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center items-center p-4">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
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
        <div className="flex-1">
          <SuggestedUser refetchPosts={fetchMorePosts} />
        </div>
      </div>
    </div>
  );
}
