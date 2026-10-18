"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  listConversations,
  listMessages,
  sendMessage,
  markConversationRead,
  type Conversation,
  type Message,
} from "@/lib/api";

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listConversations()
      .then(setConversations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openConversation = async (conv: Conversation) => {
    setActiveConv(conv);
    const msgs = await listMessages(conv.id);
    setMessages(msgs);
    if (conv.unread_count > 0) {
      await markConversationRead(conv.id).catch(() => {});
      setConversations((prev) =>
        prev.map((c) => (c.id === conv.id ? { ...c, unread_count: 0 } : c))
      );
    }
  };

  const handleSend = async () => {
    if (!newMsg.trim() || !activeConv) return;
    const msg = await sendMessage(activeConv.id, newMsg.trim());
    setMessages((prev) => [...prev, msg]);
    setNewMsg("");
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, last_message: msg.content, last_message_at: msg.created_at }
          : c
      )
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Messages</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Conversation List */}
        <Card className={activeConv ? "hidden lg:block" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {conversations.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No conversations yet</p>
            ) : (
              <div className="divide-y">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => openConversation(conv)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      activeConv?.id === conv.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">Worker #{conv.worker_id}</p>
                      {conv.unread_count > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                    {conv.last_message && (
                      <p className="text-sm text-gray-500 mt-1 truncate">{conv.last_message}</p>
                    )}
                    {conv.last_message_at && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(conv.last_message_at).toLocaleDateString()}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Thread */}
        <div className={`lg:col-span-2 ${!activeConv ? "hidden lg:block" : ""}`}>
          {activeConv ? (
            <Card className="flex flex-col" style={{ minHeight: "500px" }}>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveConv(null)} className="lg:hidden">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <CardTitle>Worker #{activeConv.worker_id}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_id === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.sender_id === user?.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender_id === user?.id ? "text-blue-200" : "text-gray-400"}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="border-t p-4 flex gap-2">
                <input
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={handleSend} disabled={!newMsg.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="flex h-96 items-center justify-center">
              <CardContent className="text-center text-gray-500">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p>Select a conversation to start messaging</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
