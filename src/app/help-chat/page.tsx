'use client';

import { useState, useEffect, useRef } from 'react';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFirestore, useUser, useCollection, useMemoFirebase, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp, query, orderBy, getDocs, limit } from 'firebase/firestore';
import type { WithId } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


type ChatMessage = {
  text: string;
  senderId: string;
  senderType: 'user' | 'support';
  timestamp: any;
  isRead: boolean;
};

export default function HelpChatPage() {
  const [inputValue, setInputValue] = useState('');
  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const findOrCreateChatSession = async () => {
      if (user && firestore) {
        try {
          const chatsRef = collection(firestore, 'users', user.uid, 'chatSessions');
          const q = query(chatsRef, limit(1));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            setChatSessionId(querySnapshot.docs[0].id);
          } else {
            const newSessionData = {
              userId: user.uid,
              createdAt: serverTimestamp(),
              lastMessage: "",
            };
            const newSessionDoc = await addDocumentNonBlocking(chatsRef, newSessionData);
            if(newSessionDoc) {
                setChatSessionId(newSessionDoc.id);
            }
          }
        } catch (e: any) {
            const permissionError = new FirestorePermissionError({
              path: `users/${user.uid}/chatSessions`,
              operation: 'list', // Assuming getDocs is a list operation
            });
            errorEmitter.emit('permission-error', permissionError);
        }
      }
    };
    if(!isUserLoading) {
      findOrCreateChatSession();
    }
  }, [user, firestore, isUserLoading]);

  const messagesQuery = useMemoFirebase(() => {
    if (user && chatSessionId && firestore) {
      return query(
        collection(firestore, 'users', user.uid, 'chatSessions', chatSessionId, 'messages'),
        orderBy('timestamp', 'asc')
      );
    }
    return null;
  }, [user, chatSessionId, firestore]);

  const { data: messages, isLoading } = useCollection<ChatMessage>(messagesQuery);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || !user || !chatSessionId || !firestore) return;

    const newMessage: Omit<ChatMessage, 'id' | 'timestamp'> & { timestamp: any } = {
      text: inputValue,
      senderId: user.uid,
      senderType: 'user',
      timestamp: serverTimestamp(),
      isRead: false,
    };

    const messagesColRef = collection(firestore, 'users', user.uid, 'chatSessions', chatSessionId, 'messages');
    addDocumentNonBlocking(messagesColRef, newMessage);

    setInputValue('');
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full flex-1 p-4 md:p-8">
        <Card className="flex flex-col flex-1">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
                <div className="space-y-4">
                {isLoading && <p>Loading chat...</p>}
                {messages && messages.map((msg: WithId<ChatMessage>) => (
                    <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                        msg.senderType === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                    >
                    {msg.senderType === 'support' && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`max-w-xs rounded-lg p-3 text-sm md:max-w-md ${
                        msg.senderType === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                    >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.senderType === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70'}`}>
                           {msg.timestamp?.toDate()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Sending...'}
                        </p>
                    </div>
                    {msg.senderType === 'user' && (
                        <Avatar className="h-8 w-8">
                        <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
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
                disabled={isLoading || !chatSessionId}
              />
              <Button type="submit" size="icon" disabled={isLoading || !chatSessionId}>
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
