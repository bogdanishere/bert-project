"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface SendMessagesProps {
  type: "USER" | "BOT";
  message: string;
}

interface ResponseBotProps {
  answers: {
    answer: string;
    confidence: number;
    question: string;
  }[];
}

export const sendMessageAction = async (userMessage: SendMessagesProps) => {
  if (!userMessage) {
    throw new Error("No user message found.");
  }

  console.log("userMessage", userMessage);

  const sendMessage = {
    questions: [userMessage.message],
  };

  console.log(JSON.stringify(sendMessage));

  try {
    const response = await fetch("http://localhost:5000/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendMessage),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from chatbot server.");
    }

    const data = (await response.json()) as ResponseBotProps;

    const bestAnswer = data.answers.sort(
      (a, b) => b.confidence - a.confidence
    )[0];

    console.log("bestAnswer", bestAnswer);

    return { success: true, botResponse: { message: bestAnswer.answer } };
  } catch (error) {
    console.error("Error in sendMessageAction:", error);
    throw new Error("Chatbot server error.");
  }
};

interface SendAllConversationProps {
  messages: {
    id: string;
    senderType: "USER" | "BOT";
    content: string;
  }[];
}

export const sendAllConversationAction = async (
  conversation: SendAllConversationProps
) => {
  try {
    if (!conversation.messages || conversation.messages.length === 0) {
      throw new Error("No messages provided.");
    }

    const { userId } = await auth();

    if (!userId) {
      return redirect("/sign-in");
    }

    await prisma.conversation.deleteMany({
      where: { userId },
    });

    const savedConversation = await prisma.conversation.create({
      data: { userId },
    });

    const messagesToSave = conversation.messages.map((message) => ({
      conversationId: savedConversation.id,
      senderId: userId,
      senderType: message.senderType,
      content: message.content,
    }));

    await prisma.message.createMany({
      data: messagesToSave,
    });

    console.log("New conversation and messages saved successfully.");
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
};

export const deleteAllConversationAction = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("No user found.");
  }

  try {
    await prisma.conversation.deleteMany({
      where: { userId },
    });
  } catch (error) {
    console.error("Error deleting conversation:", error);
  }
};

type Role = "USER" | "BOT";

type Message = {
  id: string;
  content: string;
  senderType: Role;
};

type ConversationState = {
  messages: Message[];
};

export const getConversationAction = async (): Promise<ConversationState> => {
  const { userId } = await auth();

  if (!userId) {
    return { messages: [] };
  }

  const conversation = await prisma.conversation.findFirst({
    where: { userId },
    include: { messages: true },
  });

  if (!conversation) {
    return { messages: [] };
  }

  return { messages: conversation.messages };
};
