
import { ChatInterface } from "@/components/ChatInterface";

const Chat = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="neural-network"></div>
        <div className="circuit-lines"></div>
        <div className="particle-field"></div>
        <div className="quantum-particles"></div>
      </div>

      {/* Chat Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <ChatInterface />
        </div>
      </section>
    </div>
  );
};

export default Chat;
