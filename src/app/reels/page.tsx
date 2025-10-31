
'use client';

import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import placeholderImages from "@/lib/placeholder-images.json";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { useState } from "react";

export default function ReelsPage() {
  const videoReels = placeholderImages.videoReels;
  const [selectedReel, setSelectedReel] = useState<(typeof videoReels)[0] | null>(null);

  return (
    <AppLayout>
      <Dialog>
        <div className="p-4 md:p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Video Reels</h1>
            <p className="text-muted-foreground mt-2">
              Watch our latest work and behind-the-scenes moments.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {videoReels.map((reel, index) => (
              <DialogTrigger asChild key={index} onClick={() => setSelectedReel(reel)}>
                <Card className="overflow-hidden group cursor-pointer">
                  <CardContent className="p-0 aspect-[9/16] relative">
                    <Image
                      src={reel.poster}
                      alt={reel.alt}
                      width={reel.width}
                      height={reel.height}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      data-ai-hint={reel['data-ai-hint']}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-16 h-16 text-white/80" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 bg-background/80 backdrop-blur-sm">
                    <p className="text-sm font-semibold truncate">{reel.title}</p>
                  </CardFooter>
                </Card>
              </DialogTrigger>
            ))}
          </div>
        </div>
        
        {selectedReel && (
            <DialogContent className="p-0 border-0 max-w-md w-full aspect-[9/16]">
                 <video
                    src={selectedReel.videoSrc}
                    className="w-full h-full object-contain rounded-lg"
                    controls
                    autoPlay
                    loop
                 >
                    Your browser does not support the video tag.
                 </video>
            </DialogContent>
        )}

      </Dialog>
    </AppLayout>
  );
}
