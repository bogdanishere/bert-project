"use client";

import { useChatBot } from "@/contexts/useChatBot";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { MinusSquare } from "lucide-react";

export default function ChatBotButtonToggle() {
  const { isOpen, setIsOpen } = useChatBot();

  const handleToggleChatBot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={handleToggleChatBot}>
        {isOpen && (
          <PlusSquare
            className={`absolute transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {!isOpen && (
          <MinusSquare
            className={`absolute transition-opacity duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </Button>
      {isOpen ? <div>Chatbot is open</div> : <div>Chatbot is closed</div>}
    </div>
  );
}
