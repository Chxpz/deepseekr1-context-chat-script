
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ModalHeader = () => {
  return (
    <DialogHeader className="relative z-10">
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 relative">
          <img 
            src="/lovable-uploads/a4527a00-4181-4e53-b4c5-2ed37ad18dd4.png" 
            alt="Autonoma Logo" 
            className="w-full h-full object-contain mix-blend-screen"
          />
        </div>
      </div>
      
      <DialogTitle className="text-3xl font-bold text-center neon-text mb-4">
        Welcome to Autonoma
      </DialogTitle>
    </DialogHeader>
  );
};
