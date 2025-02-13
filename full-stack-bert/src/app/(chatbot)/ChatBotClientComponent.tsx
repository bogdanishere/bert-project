// "use client";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Send } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useEffect, useState, useTransition } from "react";
// import {
//   deleteAllConversationAction,
//   getConversationAction,
//   sendAllConversationAction,
//   sendMessageAction,
// } from "./actions";
// import { useChatBot } from "@/contexts/useChatBot";
// import Spinner from "@/components/Spinner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { chatBotSchema, ChatBotType } from "@/lib/validations";

// type Role = "USER" | "BOT";

// type Message = {
//   id: string;
//   content: string;
//   senderType: Role;
// };

// type ConversationState = {
//   messages: Message[];
// };

// export default function ChatBotClientComponent() {
//   const { isOpen } = useChatBot();
//   return <>{isOpen && <ChatBotVisible />}</>;
// }

// function ChatBotVisible() {
//   const { isOpen } = useChatBot();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingSaveConversation, setIsLoadingSaveConversation] =
//     useState(false);
//   const [isLoadingDeleteConversation, setIsLoadingDeleteConversation] =
//     useState(false);
//   const [conversation, setConversation] = useState<ConversationState>({
//     messages: [],
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setIsLoading(true);
//       getConversation();
//     }
//     async function getConversation() {
//       const conversation = await getConversationAction();
//       setConversation(conversation);
//       setIsLoading(false);
//     }
//   }, [isOpen]);

//   const [isPending, startTransition] = useTransition();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ChatBotType>({
//     resolver: zodResolver(chatBotSchema),
//   });

//   const onSubmit = (data: ChatBotType) => {
//     const userMessage: Message = {
//       id: new Date().toISOString(),
//       content: data.message,
//       senderType: "USER",
//     };

//     setConversation((prev) => ({
//       messages: [...prev.messages, userMessage],
//     }));

//     reset();

//     startTransition(async () => {
//       try {
//         const response = await sendMessageAction({
//           type: "USER",
//           message: data.message,
//         });

//         const botMessage: Message = {
//           id: new Date().toISOString(),
//           content: response.botResponse.message,
//           senderType: "BOT",
//         };

//         setConversation((prev) => ({
//           messages: [...prev.messages, botMessage],
//         }));
//       } catch (error) {
//         console.error("Failed to get response from chatbot:", error);
//       }
//     });
//   };

//   const handleSaveConversation = async () => {
//     setIsLoadingSaveConversation(true);
//     try {
//       await sendAllConversationAction(conversation);
//     } catch (error) {
//       console.log("Failed to save conversation:", error);
//     }

//     setIsLoadingSaveConversation(false);
//   };

//   const handleDeleteConversation = async () => {
//     setIsLoadingDeleteConversation(true);
//     await deleteAllConversationAction();
//     setConversation({ messages: [] });
//     setIsLoadingDeleteConversation(false);
//   };

//   return (
//     <div
//       className={`absolute top-20 right-4 z-50 transform transition-transform duration-500 ${
//         isOpen
//           ? "opacity-100 translate-y-0"
//           : "opacity-0 translate-y-10 pointer-events-none"
//       }`}
//     >
//       <Card className="w-full max-w-lg mx-auto h-[500px] flex flex-col">
//         {isLoading && <Spinner />}
//         <CardHeader>
//           <CardTitle className="text-center">Chat Bot</CardTitle>
//         </CardHeader>
//         <CardContent className="flex-1 overflow-hidden">
//           <ScrollArea className="h-full pr-4">
//             <div className="space-y-4">
//               {conversation.messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={cn(
//                     "flex",
//                     message.senderType === "USER"
//                       ? "justify-end"
//                       : "justify-start"
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       "rounded-lg px-3 py-2 max-w-[80%] text-sm",
//                       message.senderType === "USER"
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-muted"
//                     )}
//                   >
//                     {message.content.slice(0, 1).toUpperCase()}
//                     {message.content.slice(1).toLowerCase()}
//                   </div>
//                 </div>
//               ))}
//               {isPending && (
//                 <div className="flex justify-start">
//                   <div className="rounded-lg px-3 py-2 max-w-[80%] text-sm bg-muted">
//                     <span className="animate-pulse">...</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </ScrollArea>
//         </CardContent>
//         <CardFooter>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="flex flex-col w-full space-y-2"
//           >
//             <div className="flex flex-col w-full">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   placeholder="Type your message..."
//                   {...register("message")}
//                   disabled={isPending}
//                 />
//                 <Button type="submit" size="icon" disabled={isPending}>
//                   <Send className="h-4 w-4" />
//                   <span className="sr-only">Send message</span>
//                 </Button>
//               </div>
//               {errors.message && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.message.message}
//                 </p>
//               )}
//             </div>
//             <div className="flex justify-between space-x-2">
//               <Button
//                 className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
//                 onClick={handleSaveConversation}
//                 disabled={isLoadingSaveConversation}
//               >
//                 Save the conversation
//               </Button>
//               <Button
//                 className="flex-1 bg-destructive text-white hover:bg-destructive/90"
//                 onClick={handleDeleteConversation}
//                 disabled={isLoadingDeleteConversation}
//               >
//                 Delete the conversation
//               </Button>
//             </div>
//           </form>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

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
import { useEffect, useRef, useState, useTransition } from "react";
import {
  deleteAllConversationAction,
  getConversationAction,
  sendAllConversationAction,
  sendMessageAction,
} from "./actions";
import { useChatBot } from "@/contexts/useChatBot";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatBotSchema, ChatBotType } from "@/lib/validations";

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
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [conversation.messages, isPending]);

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatBotType>({
    resolver: zodResolver(chatBotSchema),
  });

  const onSubmit = (data: ChatBotType) => {
    const userMessage: Message = {
      id: new Date().toISOString(),
      content: data.message,
      senderType: "USER",
    };

    setConversation((prev) => ({
      messages: [...prev.messages, userMessage],
    }));

    reset();

    startTransition(async () => {
      try {
        const response = await sendMessageAction({
          type: "USER",
          message: data.message,
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
    try {
      await sendAllConversationAction(conversation);
    } catch (error) {
      console.log("Failed to save conversation:", error);
    }
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
          <div className="h-full pr-4 overflow-y-auto" ref={scrollContainerRef}>
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
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full space-y-2"
          >
            <div className="flex flex-col w-full">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  {...register("message")}
                  disabled={isPending}
                />
                <Button type="submit" size="icon" disabled={isPending}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
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
