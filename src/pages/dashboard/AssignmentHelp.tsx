import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { HelpCircle } from 'lucide-react';

export default function AssignmentHelp() {
  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6">
      <ModuleCard
        title="Assignment Help"
        description="Get help structuring assignments, research guidance, and citations"
        icon={<HelpCircle className="w-5 h-5 text-primary-foreground" />}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 min-h-[500px]">
          <ChatInterface 
            module="assignment-help"
            welcomeMessage="I'm here to help with your assignments! I can assist with structuring essays, providing research guidance, explaining requirements, and improving your writing. Tell me about your assignment - what topic is it on and what help do you need?"
            placeholder="e.g., Help me structure an essay on Climate Change..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
