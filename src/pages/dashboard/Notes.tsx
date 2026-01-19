import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { BookOpen } from 'lucide-react';

export default function Notes() {
  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6">
      <ModuleCard
        title="Curated Notes"
        description="High-yield study material and comprehensive topic explanations"
        icon={<BookOpen className="w-5 h-5 text-primary-foreground" />}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 min-h-[500px]">
          <ChatInterface 
            welcomeMessage="Welcome to Curated Notes! Ask me for comprehensive notes on any topic. I'll provide:\n\n• High-yield study material tailored to your level\n• Key concepts and definitions\n• Important formulas and equations\n• Diagrams descriptions and explanations\n• Exam-focused content\n\nWhat topic would you like notes on?"
            placeholder="e.g., Give me comprehensive notes on Cell Division..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
