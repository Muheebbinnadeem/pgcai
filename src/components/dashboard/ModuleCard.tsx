import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function ModuleCard({ title, description, icon, className, children }: ModuleCardProps) {
  return (
    <div className={cn("glass rounded-2xl shadow-card overflow-hidden", className)}>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            {icon}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
