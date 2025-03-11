import React from "react";
import { cn } from "@/lib/utils";
import { Lock, Share2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SharingToggleProps {
  isShared: boolean;
  onShareChange: (shared: boolean) => void;
  className?: string;
  compact?: boolean;
}

const SharingToggle: React.FC<SharingToggleProps> = ({
  isShared,
  onShareChange,
  className,
  compact = false,
}) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-between rounded-lg transition-all duration-300 bg-secondary/80 hover:bg-secondary", 
        compact ? "py-2 px-3" : "p-3 glass-morphism",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          isShared 
            ? "bg-primary/10" 
            : "bg-background"
        )}>
          {isShared ? (
            <Share2 className="w-4 h-4 text-primary" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
        </div>
        
        <span className="text-sm font-medium mr-3">
          {isShared ? "Shared" : "Private"}
        </span>
      </div>
      <Switch
        checked={isShared}
        onCheckedChange={onShareChange}
        aria-label="Toggle sharing"
      />
    </div>
  );
};

export default SharingToggle;
