import { ChatTileType } from "../../Types/ChatType";

export default function ChatTile({ user }: { user: ChatTileType }) {
  return (
    <div className="flex items-center gap-4 p-2 rounded-md  hover:bg-gray-100 cursor-pointer border border-gray-200">
      <img
        src={user.image}
        alt={user.name}
        className="w-12 h-12 rounded-full border border-gray-200"
      />
      <div>
        <h3>{user.name}</h3>
        <p>{user.lastMessage}</p>
        <p>{user.lastMessageTime}</p>
      </div>
    </div>
  );
}
