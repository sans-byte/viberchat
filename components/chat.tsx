import React from "react";
import ChatPanel from "./chat-panel";
import { cn } from "@/lib/utils";
import { Message } from "ai";

function Chat() {
  const messages: Message[] = [];
  return (
    <div
      className={cn(
        "h-full flex relative min-w-0 flex-1 flex-col",
        messages.length === 0 && "items-center justify-center"
      )}
    >
      <ChatPanel messages={messages} />
    </div>
  );
}

export default Chat;
