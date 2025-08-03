"use client";

import React, { useRef, useState } from "react";
import { Message } from "ai";
import Textarea from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import { IconLogo } from "./ui/icons";
import { Button } from "./ui/button";
import { ArrowUp, ChevronDown, MessageCirclePlus, Square } from "lucide-react";
import EmptyScreen from "./empty-screen";
import { useRouter } from "next/router";

interface ChatPanelProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  query?: string;
  stop: () => void;
  showScrollToBottomButton: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  query,
  stop,
  showScrollToBottomButton,
  scrollContainerRef,
}: ChatPanelProps) {
  const [showEmptyScreen, SetShowEmptyScreen] = useState(false);
  // const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div
      className={cn(
        "w-full bg-background group/form-container shrink-0 transition-all duration-150",
        messages.length > 0 ? "absolute bottom-0 px-2 pb-4" : "px-6"
      )}
    >
      {messages.length === 0 && (
        <div className="mb-10 flex flex-col items-center gap-4">
          <IconLogo className="size-12 text-muted-foreground" />
          <p className="text-center text-3xl font-semibold">
            How can I help you today ?
          </p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        action=""
        className={cn("max-w-2xl w-full mx-auto relative")}
      >
        {showScrollToBottomButton && messages.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute -top-10 right-4 z-20 size-8 rounded-full shadow-md cursor-pointer"
            title="Scroll to bottom"
          >
            <ChevronDown size={16} />
          </Button>
        )}

        <div className="relative flex flex-col w-full gap-2 bg-muted rounded-3xl border border-input">
          <Textarea
            ref={inputRef}
            name="input"
            rows={2}
            maxRows={5}
            tabIndex={0}
            onCompositionUpdate={() => {}}
            onCompositionEnd={() => {}}
            placeholder="Ask a question..."
            spellCheck={false}
            value={input}
            disabled={isLoading}
            className="resize-none w-full min-h-12 bg-transparent border-0 p-6 px-6 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-visible"
            onChange={(e) => {
              handleInputChange(e);
              SetShowEmptyScreen(e.target.value.length === 0);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
                // &&
                // !isComposing &&
                // !enterDisabled
              ) {
                if (input.trim().length === 0) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                textarea.form?.requestSubmit();
              }
            }}
            onFocus={(e) => SetShowEmptyScreen(true)}
            onBlur={(e) => SetShowEmptyScreen(false)}
          />

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <div>Model Selector</div>
              <div>Search Model Toggle</div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {}}
                  className="shrink-0 rounded-full group"
                  type="button"
                  disabled={false}
                >
                  <MessageCirclePlus className="size-4 transition-all group-hover:rotate-12" />
                </Button>
              )}
              <Button
                type={isLoading ? "button" : "submit"}
                size={"icon"}
                variant={"outline"}
                className={cn(isLoading && "animate-pulse", "rounded-full")}
                disabled={
                  input.length === 0
                  // && !isLoading) ||
                  // isToolInvocationInProgress()
                }
                onClick={isLoading ? stop : undefined}
              >
                {isLoading ? <Square size={20} /> : <ArrowUp size={20} />}
              </Button>
            </div>
          </div>
        </div>
        {messages.length === 0 && (
          <EmptyScreen
            submitMessage={(message) => {
              handleInputChange({
                target: { value: message },
              } as React.ChangeEvent<HTMLTextAreaElement>);
            }}
            className={cn(
              "transition-opacity duration-200 ease-in-out cursor-pointer",
              showEmptyScreen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          ></EmptyScreen>
        )}
      </form>
    </div>
  );
}

export default ChatPanel;
