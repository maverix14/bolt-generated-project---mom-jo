import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Play, Pause, Mic, Image, Video } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getEntry } from "@/lib/journalData";
import { EntryProps } from "@/components/EntryCard";
import BottomBar from "@/components/BottomBar";
import { useToast } from "@/hooks/use-toast";

const EntryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entry, setEntry] = useState<EntryProps | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      const foundEntry = getEntry(id);
      if (foundEntry) {
        setEntry(foundEntry);
        setIsFavorite(foundEntry.favorite || false);
      }
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Entry removed from your favorites" : "Entry added to your favorites",
    });
  };

  const toggleAudioPlayback = () => {
    setIsPlaying(!isPlaying);
  };

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-pulse">Loading entry...</div>
      </div>
    );
  }

  const renderMedia = () => {
    if (!entry.media || entry.media.length === 0) return null;

    return (
      <div className="mt-6 mb-6 space-y-4">
        {entry.media.map((item, index) => {
          if (item.type === "photo") {
            return (
              <div key={index} className="rounded-xl overflow-hidden">
                <img src={item.url} alt={`Attachment ${index + 1}`} className="w-full max-h-80 object-cover" />
              </div>
            );
          }
          if (item.type === "video") {
            return (
              <div key={index} className="rounded-xl overflow-hidden relative bg-muted/30 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full glass-morphism flex items-center justify-center">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
                <video poster="/placeholder.svg" className="w-full h-full object-cover opacity-80" />
              </div>
            );
          }
          if (item.type === "audio") {
            return (
              <div key={index} className="py-4 px-5 rounded-xl glass-morphism flex items-center gap-3">
                <button 
                  onClick={toggleAudioPlayback}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-primary-foreground" /> : <Play className="w-5 h-5 ml-0.5 text-primary-foreground" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Voice Memo</span>
                  </div>
                  <div className="mt-1 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                    <div className={`h-full bg-primary ${isPlaying ? 'animate-progress' : ''}`} style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">0:45</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-24 px-4">
      <header className="py-4 flex items-center justify-between mb-6 animate-slide-down">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full neo-shadow hover:neo-inset transition-all duration-300 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <button 
          onClick={toggleFavorite}
          className="w-10 h-10 rounded-full neo-shadow hover:neo-inset transition-all duration-300 flex items-center justify-center"
        >
          <Heart className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-primary stroke-primary' : ''}`} />
        </button>
      </header>
      
      <main className="animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-medium tracking-tight">{entry.title}</h1>
          </div>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(entry.date, { addSuffix: true })}
          </span>
        </div>
        
        {renderMedia()}
        
        <div className="prose max-w-none">
          <p className="whitespace-pre-line leading-relaxed">
            {entry.content}
          </p>
        </div>
      </main>
      
      <BottomBar />
    </div>
  );
};

export default EntryDetail;
