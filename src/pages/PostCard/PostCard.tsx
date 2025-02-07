import React from 'react';
import { MoreHorizontal } from 'react-feather';

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

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            {/* Post Header */}
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
                <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal size={20} />
                </button>
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