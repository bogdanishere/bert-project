"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import {
  deleteAllConversationAction,
  getConversationAction,
  sendAllConversationAction,
  sendMessageAction,
} from "./actions";
import { useChatBot } from "@/contexts/useChatBot";
import Spinner from "@/components/Spinner";

type Role = "USER" | "BOT";

type Message = {
  id: string;
  content: string;
  senderType: Role;
};

type ConversationState = {
  messages: Message[];
};

export default function ChatBotClientComponent() {
  const { isOpen } = useChatBot();
  return <>{isOpen && <ChatBotVisible />}</>;
}

function ChatBotVisible() {
  const { isOpen } = useChatBot();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSaveConversation, setIsLoadingSaveConversation] =
    useState(false);
  const [isLoadingDeleteConversation, setIsLoadingDeleteConversation] =
    useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getConversation();
    }
    async function getConversation() {
      const conversation = await getConversationAction();
      setConversation(conversation);
      setIsLoading(false);
    }
  }, [isOpen]);

  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = {
      id: new Date().toISOString(),
      content: input,
      senderType: "USER",
    };

    setConversation((prev) => ({
      messages: [...prev.messages, userMessage],
    }));

    setInput("");

    startTransition(async () => {
      try {
        const response = await sendMessageAction({
          type: "USER",
          message: input,
        });

        const botMessage: Message = {
          id: new Date().toISOString(),
          content: response.botResponse.message,
          senderType: "BOT",
        };

        setConversation((prev) => ({
          messages: [...prev.messages, botMessage],
        }));
      } catch (error) {
        console.error("Failed to get response from chatbot:", error);
      }
    });
  };

  const handleSaveConversation = async () => {
    setIsLoadingSaveConversation(true);
    await sendAllConversationAction(conversation);
    setIsLoadingSaveConversation(false);
  };

  const handleDeleteConversation = async () => {
    setIsLoadingDeleteConversation(true);
    await deleteAllConversationAction();
    setConversation({ messages: [] });
    setIsLoadingDeleteConversation(false);
  };

  return (
    <div
      className={`absolute top-20 right-4 z-50 transform transition-transform duration-500 ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Card className="w-full max-w-lg mx-auto h-[500px] flex flex-col">
        {isLoading && <Spinner />}
        <CardHeader>
          <CardTitle className="text-center">Chat Bot</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.senderType === "USER"
                      ? "justify-end"
                      : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[80%] text-sm",
                      message.senderType === "USER"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content.slice(0, 1).toUpperCase()}
                    {message.content.slice(1).toLowerCase()}
                  </div>
                </div>
              ))}
              {isPending && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-3 py-2 max-w-[80%] text-sm bg-muted">
                    <span className="animate-pulse">...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full space-y-2"
          >
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
                disabled={isPending}
              />
              <Button type="submit" size="icon" disabled={isPending}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
            <div className="flex justify-between space-x-2">
              <Button
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                onClick={handleSaveConversation}
                disabled={isLoadingSaveConversation}
              >
                Save the conversation
              </Button>
              <Button
                className="flex-1 bg-destructive text-white hover:bg-destructive/90"
                onClick={handleDeleteConversation}
                disabled={isLoadingDeleteConversation}
              >
                Delete the conversation
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
