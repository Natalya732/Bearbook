import { ChatTileType } from "../../Types/ChatType";
import ChatSearch from "./ChatSearch";
import ChatTile from "./ChatTile";

const users: ChatTileType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  image: `https://via.placeholder.com/150?text=${index + 1}`,
  lastMessage: `Hello, how are you? ${index + 1}`,
  lastMessageTime: `12:00 PM ${index + 1}`,
}));

export default function ChatSidebar() {
  return (
    <div className="w-1/4 h-full bg-white p-4 shadow-md flex flex-col gap-2">
      <ChatSearch />
      {users.length > 0 ? (
        <div className="w-full overflow-y-auto space-y-2 flex-1">
          {users.map((user) => (
            <ChatTile key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-xl text-center h-full font-semibold flex items-center justify-center">
          No Connection At This Moment : ( Follow Your Buddies and start
          chatting ...
        </div>
      )}
    </div>
  );
}
