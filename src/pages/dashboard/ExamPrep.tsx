import { ChatInterface } from '@/components/dashboard/ChatInterface';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { FileText } from 'lucide-react';

export default function ExamPrep() {
  return (
    <div className="flex-1 flex flex-col p-4 lg:p-6">
      <ModuleCard
        title="Exam Prep"
        description="Generate mock papers, practice questions, and exam strategies"
        icon={<FileText className="w-5 h-5 text-primary-foreground" />}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 min-h-[500px]">
          <ChatInterface 
            welcomeMessage="Welcome to Exam Prep! I can help you prepare for your exams by:\n\n• Generating mock test papers for your subjects\n• Creating practice questions by topic\n• Explaining important concepts likely to appear in exams\n• Providing time management strategies\n\nTell me which subject and topic you want to focus on!"
            placeholder="e.g., Generate 10 MCQs on Photosynthesis for Class 9..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
