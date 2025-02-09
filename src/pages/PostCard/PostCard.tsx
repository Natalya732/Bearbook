import React, { useRef } from "react";
import { Edit2, MoreHorizontal, Trash2 } from "react-feather";

interface PostCardProps {
  id: string;
  userImage: string;
  username: string;
  content: string;
  imageUrl?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  userImage,
  username,
  content,
  imageUrl,
}) => {
  // const menuRef = useRef<Menu>(null);
  const items = [
    { label: "Edit", icon: <Edit2 /> },
    { label: "Delete", icon: <Trash2 /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={userImage}
            alt={username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{username}</h3>
          </div>
        </div>
        <div
          // onClick={(event) => menuRef.current && menuRef.current.toggle(event)}
          className="text-gray-500 hover:text-gray-700"
        >
          <MoreHorizontal size={20} className="float-end cursor-pointer" />
          {/* <Menu popup model={items} ref={menuRef}/> */}
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 mb-4">{content}</p>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Post content"
            className="rounded-lg w-full object-cover max-h-96"
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
