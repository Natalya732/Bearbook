import { useEffect, useState } from "react";
import { ProfileData } from "@utils/definitions";
import { followUser, getUnfollowedUsers } from "@/services/FollowsApi";
import { useApp } from "@contexts/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SuggestedUser({
  refetchPosts,
}: {
  refetchPosts: () => Promise<void>;
}) {
  const navigate = useNavigate();
  const { user } = useApp();
  const [suggestedUsers, setSuggestedUsers] = useState<
    (ProfileData & { isFollowing: boolean })[]
  >([]);

  async function getSuggestedUsers() {
    const res = await getUnfollowedUsers(user?.id || "");

    if (res) {
      const updatedUsers = res.map((item) => ({
        ...item,
        isFollowing: false,
      }));
      setSuggestedUsers(updatedUsers);
    }
  }

  const handleFollow = async (userId: string) => {
    const response = await followUser(user?.id || "", userId);
    if (response.error) {
      console.log(response.error);
      toast.error("Something went wrong");
    } else {
      toast.success("Followed!");
      setSuggestedUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isFollowing: true } : user
        )
      );
      refetchPosts();
    }
  };

  useEffect(() => {
    getSuggestedUsers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-[380px]">
      <h2 className="font-bold text-lg mb-4">Suggested Users</h2>
      {suggestedUsers.length ? (
        <div className="space-y-4">
          {suggestedUsers.map((u) => (
            <div
              key={u.id}
              className="flex flex-col bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <div
                className="flex items-center space-x-3"
                onClick={() => navigate(`user/${u.id}`)}
              >
                <img
                  src={u.profileImage}
                  alt={u.name}
                  className="w-12 h-12 cursor-pointer rounded-full object-cover"
                />
                <p className="font-semibold cursor-pointer text-gray-800">
                  {u.name}
                </p>
              </div>
              <p className="text-gray-600 text-sm mt-2">{u.bio}</p>
              <button
                onClick={() => handleFollow(u.id)}
                className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600"
              >
                {u?.isFollowing ? "Following" : "+ Follow"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No suggested users at the moment.</div>
      )}
    </div>
  );
}
