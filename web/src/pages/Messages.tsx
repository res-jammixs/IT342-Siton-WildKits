import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, Phone, MoreVertical, Image, MessageSquare } from "lucide-react";
import { useState } from "react";

const conversations: Array<{
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
}> = [];

const messages: Array<{
  id: string;
  sender: string;
  text: string;
  time: string;
}> = [];

export default function Messages() {
  const [selectedConvo, setSelectedConvo] = useState("1");

  return (
    <Layout>
      <div className="container py-4 md:py-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card" style={{ height: "calc(100vh - 10rem)" }}>
          <div className="grid h-full md:grid-cols-[300px_1fr]">
            {/* Conversations List */}
            <div className="border-r border-border">
              <div className="border-b border-border p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-9 text-sm" />
                </div>
              </div>
              <div className="overflow-y-auto">
                {conversations.length > 0 ? (
                  conversations.map((convo) => (
                    <button
                      key={convo.id}
                      onClick={() => setSelectedConvo(convo.id)}
                      className={`flex w-full items-center gap-3 border-b border-border p-3 text-left transition-colors ${
                        selectedConvo === convo.id ? "bg-secondary" : "hover:bg-muted"
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {convo.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground">{convo.name}</p>
                          <span className="text-xs text-muted-foreground">{convo.time}</span>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{convo.lastMsg}</p>
                      </div>
                      {convo.unread > 0 && (
                        <Badge className="h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs">
                          {convo.unread}
                        </Badge>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-sm font-medium text-foreground">No conversations yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Start chatting with buyers and sellers</p>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-col">
              {conversations.length > 0 ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between border-b border-border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Select a conversation</p>
                        <p className="text-xs text-muted-foreground">No conversation selected</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === "me"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`mt-1 text-xs ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="border-t border-border p-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Input placeholder="Type a message..." className="flex-1 text-sm" />
                      <Button size="icon" className="h-9 w-9 shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">No messages yet</h3>
                  <p className="text-sm text-muted-foreground">When you start buying, selling, or lending items,<br />your conversations will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
