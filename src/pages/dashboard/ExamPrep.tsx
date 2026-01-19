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
            module="exam-prep"
            welcomeMessage="Welcome to Exam Prep! I can help you ace your exams by generating practice questions, mock papers, and explaining key concepts. Tell me which subject and topic you want to focus on, and I'll create exam-style questions tailored to your class level!"
            placeholder="e.g., Generate 10 MCQs on Photosynthesis..."
          />
        </div>
      </ModuleCard>
    </div>
  );
}
