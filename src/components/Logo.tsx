import { GraduationCap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function Logo({ size = 'md', showSubtitle = true }: LogoProps) {
  const sizes = {
    sm: { icon: 24, title: 'text-lg', subtitle: 'text-xs' },
    md: { icon: 32, title: 'text-xl', subtitle: 'text-sm' },
    lg: { icon: 48, title: 'text-3xl', subtitle: 'text-base' },
  };

  const { icon, title, subtitle } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className="gradient-primary p-2 rounded-xl shadow-glow">
        <GraduationCap size={icon} className="text-primary-foreground" />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold gradient-text ${title}`}>Punjab College</span>
        {showSubtitle && (
          <span className={`text-muted-foreground ${subtitle}`}>Daroghawala Campus</span>
        )}
      </div>
    </div>
  );
}
