import React, { useState, useEffect, useRef } from "react";
import {
  Clipboard,
  Edit2,
  EyeOff,
  MoreHorizontal,
  Trash2,
} from "react-feather";

interface PostCardProps {
  id: string;
  userImage: string;
  username: string;
  content: string;
  imageUrl?: string;
  onDeleteToggle?: () => void;
  onEditToggle?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  userImage,
  id,
  username,
  content,
  imageUrl,
  onDeleteToggle,
  onEditToggle,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const items = [
    {
      label: "Edit",
      icon: <Edit2 size={18} />,
      enable: !!onEditToggle,
      action: onEditToggle,
    },
    {
      label: "Delete",
      icon: <Trash2 size={18} />,
      enable: !!onDeleteToggle,
      action: onDeleteToggle,
    },
    {
      label: "Report",
      icon: <EyeOff size={18} />,
      enable: true,
      action: () => {},
    },
    {
      label: "Save",
      icon: <Clipboard size={18} />,
      enable: true,
      action: () => {},
    },
  ];

  return (
    <div key={id} className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
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

        <div className="relative" ref={menuRef}>
          <MoreHorizontal
            size={22}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => setShowMenu((prev) => !prev)}
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md border p-2 z-10">
              {items
                .filter((item) => item.enable)
                .map((menuItem) => (
                  <button
                    key={menuItem.label}
                    className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => {
                      menuItem.action && menuItem.action();
                      setShowMenu(false);
                    }}
                  >
                    {menuItem.icon}
                    <span className="ml-2">{menuItem.label}</span>
                  </button>
                ))}
            </div>
          )}
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
