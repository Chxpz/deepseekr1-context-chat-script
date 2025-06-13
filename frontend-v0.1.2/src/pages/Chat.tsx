import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { AgentSidebar } from "@/components/AgentSidebar";
import { ChatHeader } from "@/components/ChatHeader";

const Chat = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useWalletAuth();

  useEffect(() => {
    console.log('Chat page: Auth state -', { isAuthenticated, isLoading });
    
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      console.log('Chat page: Redirecting to home (not authenticated)');
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-cyan-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-black text-white overflow-hidden relative flex flex-col">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="neural-network"></div>
        <div className="circuit-lines"></div>
        <div className="particle-field"></div>
        <div className="quantum-particles"></div>
      </div>

      {/* Header */}
      <ChatHeader />

      {/* Main Layout - Split Screen with remaining height */}
      <div className="flex-1 flex relative z-10 min-h-0">
        {/* Left Side - Agent */}
        <div className="w-1/2 flex items-center justify-center p-4 overflow-auto">
          <AgentSidebar />
        </div>

        {/* Right Side - Chat Interface */}
        <div className="w-1/2 flex flex-col h-full">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat;
