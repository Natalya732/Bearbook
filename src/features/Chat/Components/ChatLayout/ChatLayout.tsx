import ChatOverlay from "../ChatMessageArea/ChatOverlay";
import ChatSidebar from "../ChatSidebar/ChatSidebar";

export default function ChatLayout() {
  return (
    <div className="h-screen relative w-full">
      <div className="flex w-full h-full">
        <ChatSidebar />
        <ChatOverlay />
      </div>
    </div>
  );
}
