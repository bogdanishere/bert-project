"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ChatBotContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ChatBotContext = createContext<ChatBotContextType | undefined>(
  undefined
);

export default function ChatBotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ChatBotContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatBotContext.Provider>
  );
}
