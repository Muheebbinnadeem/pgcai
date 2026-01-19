import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Made with</span>
        <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
        <span>by</span>
        <span className="font-semibold gradient-text">Muheeb Bin Nadeem</span>
      </div>
    </footer>
  );
}
