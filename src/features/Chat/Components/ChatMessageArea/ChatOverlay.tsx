import ChatMessageArea from "./ChatMessageArea/ChatMessageArea";
import ChatInput from "./ChatInput/ChatInput";

export default function ChatOverlay() {
  return (
    <div className="flex w-3/4 h-full relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"></div>
      <ChatMessageArea />
      <ChatInput />
    </div>
  );
}
