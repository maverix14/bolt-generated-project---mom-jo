import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EntryHeadingProps {
  handleSubmit: (e: React.FormEvent) => void;
}

const EntryHeading: React.FC<EntryHeadingProps> = ({ handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <header className="py-4 flex items-center justify-between mb-6 animate-slide-down">
      <button 
        onClick={() => navigate(-1)} 
        className="w-10 h-10 rounded-full neo-shadow hover:neo-inset transition-all duration-300 flex items-center justify-center"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <Button 
        onClick={handleSubmit}
        className="px-4 py-2 rounded-lg neo-shadow hover:neo-inset transition-all duration-300 flex items-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>Save</span>
      </Button>
    </header>
  );
};

export default EntryHeading;
