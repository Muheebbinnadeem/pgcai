import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { ListChecks } from 'lucide-react';

export default function Summarize() {
  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6">
      <ModuleCard
        title="Summarize Text"
        description="Convert long texts into concise bullet points and key takeaways"
        icon={<ListChecks className="w-5 h-5 text-primary-foreground" />}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 min-h-[500px]">
          <ChatInterface 
            welcomeMessage="Paste any text and I'll summarize it for you! I can:\n\n• Create concise bullet points from long passages\n• Extract key concepts and main ideas\n• Highlight important definitions and terms\n• Simplify complex explanations\n\nJust paste the text you want summarized!"
            placeholder="Paste text here to get a summary..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
