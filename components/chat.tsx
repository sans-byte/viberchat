"use client";
import React, { useRef, useState } from "react";
import ChatPanel from "./chat-panel";
import { cn } from "@/lib/utils";
import { Message } from "ai";
import { useChat } from "@ai-sdk/react";

interface ChatSection {
  id: string;
  userMessage: Message;
  assistantMessage: Message[];
}

export function Chat({ savedMessages = [] }: { savedMessages: Message[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const {
    input,
    handleInputChange,
    handleSubmit,
    status,
    messages,
    setMessages,
    stop,
    append,
    data,
    setData,
    addToolResult,
    reload,
  } = useChat({
    initialMessages: savedMessages,
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData(undefined);
    handleSubmit(e);
  };

  return (
    <div
      className={cn(
        "h-full flex relative min-w-0 flex-1 flex-col",
        messages.length === 0 && "items-center justify-center"
      )}
    >
      <ChatPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        stop={stop}
        // query={query}
        // append = {append}
        // models = {models}
        showScrollToBottomButton={!isAtBottom}
        scrollContainerRef={scrollContainerRef}
      />
    </div>
  );
}

export default Chat;
