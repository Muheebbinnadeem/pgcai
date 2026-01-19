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
            welcomeMessage="I'm here to help with your assignments! I can assist with:\n\n• Structuring essays and reports\n• Research guidance and finding sources\n• Explaining assignment requirements\n• Proofreading and improving your writing\n• Citation formatting\n\nWhat assignment are you working on?"
            placeholder="e.g., Help me structure an essay on Climate Change..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
