'use client';

import { useState } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
};

export default function HelpChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate a support reply
    setTimeout(() => {
        const supportReply: Message = {
            text: "Thank you for your message. Our support team will get back to you shortly.",
            sender: 'support',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, supportReply]);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full flex-1 p-4 md:p-8">
        <Card className="flex flex-col flex-1">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-6">
                <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`flex items-end gap-2 ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                    >
                    {msg.sender === 'support' && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`max-w-xs rounded-lg p-3 text-sm md:max-w-md ${
                        msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                    >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>
                            {msg.timestamp}
                        </p>
                    </div>
                    {msg.sender === 'user' && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    )}
                    </div>
                ))}
                </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                id="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
