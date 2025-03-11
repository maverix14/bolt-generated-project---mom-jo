import React from "react";
import { Feather, Heart, Users, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BottomBarProps {
  className?: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ className }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className={cn("fixed bottom-6 left-0 right-0 z-50 max-w-sm mx-auto px-6 animate-slide-up", className)}>
      <nav className="h-16 rounded-full backdrop-blur-md bg-black/20 border border-white/10 shadow-lg flex items-center justify-between relative">
        {/* Left icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1 flex justify-center">
                <Link 
                  to="/baby-health" 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
                  aria-label="Baby Health Details"
                >
                  <Heart 
                    className={cn(
                      "w-6 h-6 transition-colors", 
                      location.pathname === "/baby-health" 
                        ? "fill-primary stroke-primary" 
                        : "stroke-white fill-transparent"
                    )} 
                  />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Baby Health (Coming Soon)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Center floating button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1 flex justify-center relative">
                <Link 
                  to={isHomePage ? "/new" : "/"} 
                  className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg absolute left-1/2 -translate-x-1/2 -top-7 transition-transform hover:scale-110 active:scale-95"
                  aria-label={isHomePage ? "New Entry" : "Home"}
                >
                  {isHomePage ? (
                    <Feather className="w-6 h-6" />
                  ) : (
                    <Home className="w-6 h-6" />
                  )}
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isHomePage ? "New Journal Entry" : "Back to Journal"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Right icon */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1 flex justify-center">
                <Link 
                  to="/shared" 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
                  aria-label="Private Groups"
                >
                  <Users 
                    className={cn(
                      "w-6 h-6 transition-colors", 
                      location.pathname === "/shared" 
                        ? "fill-primary stroke-primary" 
                        : "stroke-white fill-transparent"
                    )} 
                  />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Private Groups</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </div>
  );
};

export default BottomBar;
