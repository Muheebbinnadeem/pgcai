import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { MessageSquare } from 'lucide-react';

export default function AIAssistant() {
  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6">
      <ModuleCard
        title="AI Study Assistant"
        description="Your personal AI tutor - ask questions, get explanations, upload images"
        icon={<MessageSquare className="w-5 h-5 text-primary-foreground" />}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 min-h-[500px]">
          <ChatInterface 
            welcomeMessage="Hello! I'm your AI Study Assistant for Punjab College. I'm aware of your class level and subject, so I'll tailor my explanations accordingly. Ask me anything about your studies, upload an image for analysis, or let me help you understand complex topics!"
            placeholder="Ask me anything about your studies..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
