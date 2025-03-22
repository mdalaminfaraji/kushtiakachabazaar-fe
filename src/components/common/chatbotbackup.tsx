/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase.config";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedQuestions = [
  "What are your business hours?",
  "How can I track my order?",
  "Do you offer refunds?",
  "What payment methods do you accept?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatRoom, setChatRoom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);
  const { strapiToken } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket and create/get chat room
  useEffect(() => {
    if (!strapiToken || !user || !mounted || !isOpen) return;

    setIsLoading(true);
    const newSocket = io(process.env.NEXT_PUBLIC_STRAPI_URL as string, {
      auth: { token: strapiToken },
    });

    // Create or get existing chat room
    const initializeChatRoom = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/chat-rooms/initialize`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${strapiToken}`,
            },
            body: JSON.stringify({
              customerId: user.uid,
              customerEmail: user.email,
            }),
          }
        );
        const data = await response.json();
        setChatRoom(data);
        if (data.messages) {
          setMessages(data.messages);
          setShowSuggestions(data.messages.length === 0);
        }
      } catch (error) {
        console.error("Error initializing chat room:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChatRoom();
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [strapiToken, user, mounted, isOpen]);

  // Handle socket events
  useEffect(() => {
    if (!socket || !mounted) return;

    socket.on("message", (message: any) => {
      if (message.sender?.id !== user?.uid) {
        setMessages((prev) => [...prev, message]);
        setShowSuggestions(false);
      }
    });

    socket.on("chatRoom", (room: any) => {
      setChatRoom(room);
      if (room.messages) {
        setMessages(room.messages);
        setShowSuggestions(room.messages.length === 0);
      }
    });

    return () => {
      socket.off("message");
      socket.off("chatRoom");
    };
  }, [socket, mounted, user?.uid]);

  const handleSend = () => {
    if (!inputText.trim() || !socket || !chatRoom) return;

    const newMessage = {
      content: inputText,
      sender: { id: user?.uid },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    socket.emit("message", {
      content: inputText,
      chatRoomId: chatRoom.id,
    });

    setInputText("");
    setShowSuggestions(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    handleSend();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div
          className={cn(
            "rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col border",
            "bg-background dark:bg-gray-800",
            "border-border dark:border-gray-700"
          )}
        >
          {/* Chat Header */}
          <div
            className={cn(
              "p-4 border-b flex items-center justify-between rounded-t-lg",
              "bg-primary text-primary-foreground",
              "dark:bg-gray-900 dark:text-gray-100"
            )}
          >
            <h3 className="font-semibold">Customer Support</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Container */}
          <div
            className={cn(
              "flex-1 overflow-y-auto p-4 space-y-4",
              "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
            )}
          >
            {showSuggestions && messages.length === 0 && (
              <div className="space-y-4">
                <p
                  className={cn(
                    "text-sm",
                    "text-muted-foreground dark:text-gray-400"
                  )}
                >
                  Hello! How can we help you today? Here are some common
                  questions:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left h-auto whitespace-normal"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", {
                  "justify-end": message.sender?.id === user?.uid,
                  "justify-start": message.sender?.id !== user?.uid,
                })}
              >
                <div
                  className={cn("max-w-[70%] p-3 rounded-lg", {
                    "bg-primary text-primary-foreground rounded-br-none":
                      message.sender?.id === user?.uid,
                    "bg-muted rounded-bl-none":
                      message.sender?.id !== user?.uid,
                  })}
                >
                  <p className="text-sm break-words">{message.content}</p>
                  <span
                    className="text-xs opacity-70 mt-1 block"
                    suppressHydrationWarning
                  >
                    {mounted
                      ? new Date(message.createdAt).toLocaleTimeString()
                      : ""}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={cn("p-4 border-t", "dark:border-gray-700")}>
            {isLoading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type your message..."
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  size="icon"
                  className={cn("dark:hover:bg-gray-600")}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
