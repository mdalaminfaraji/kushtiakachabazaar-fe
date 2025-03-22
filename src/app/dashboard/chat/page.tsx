/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase.config";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SellerChat() {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [activeChatRoom, setActiveChatRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, userLoading] = useAuthState(auth);
  const { strapiToken } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchChatRooms = async () => {
    if (!strapiToken) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/chat-rooms?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${strapiToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setChatRooms(data.data || []);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!strapiToken || !mounted) return;

    const newSocket = io(process.env.NEXT_PUBLIC_STRAPI_URL as string, {
      auth: { token: strapiToken },
    });

    setSocket(newSocket);
    fetchChatRooms();

    return () => {
      newSocket.close();
    };
  }, [strapiToken, mounted]);

  useEffect(() => {
    if (!socket || !mounted) return;

    socket.on("message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("chatRoom", (room: any) => {
      setChatRooms((prev) => prev.map((cr) => (cr.id === room.id ? room : cr)));
    });

    return () => {
      socket.off("message");
      socket.off("chatRoom");
    };
  }, [socket, mounted]);

  const handleSend = () => {
    if (!inputText.trim() || !activeChatRoom || !socket) return;

    const newMessage = {
      content: inputText,
      sender: { id: user?.uid },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    socket.emit("message", {
      content: inputText,
      chatRoomId: activeChatRoom.id,
    });

    setInputText("");
  };

  // Don't render anything during SSR
  if (!mounted) {
    return null;
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            Please sign in to access the chat dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" suppressHydrationWarning>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-2rem)]">
        {/* Chat Rooms List */}
        <Card className="p-4 overflow-auto">
          <h2 className="font-semibold mb-4">Chat Rooms</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <Button
                  key={room.id}
                  variant={
                    activeChatRoom?.id === room.id ? "default" : "outline"
                  }
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveChatRoom(room);
                    setMessages(room.messages || []);
                  }}
                >
                  <div className="truncate">
                    <span className="font-medium">
                      {room.customer?.username || "Customer"}
                    </span>
                    <span
                      className="text-xs text-muted-foreground ml-2"
                      suppressHydrationWarning
                    >
                      {mounted
                        ? new Date(room.lastMessage).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </Card>

        {/* Chat Messages */}
        <Card className="md:col-span-2 p-4 flex flex-col">
          {activeChatRoom ? (
            <>
              <div className="flex-1 overflow-auto space-y-4 mb-4">
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
              </div>
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
                <Button onClick={handleSend} disabled={!inputText.trim()}>
                  Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a chat room to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
