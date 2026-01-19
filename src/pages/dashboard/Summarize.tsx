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
            module="summarize"
            welcomeMessage="Paste any text and I'll create a clear, organized summary for you! I'll extract the key points, main ideas, and important terms - perfect for quick revision before exams. Just paste what you need summarized!"
            placeholder="Paste text here to get a summary..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
