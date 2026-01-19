interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function Logo({ size = 'md', showSubtitle = true }: LogoProps) {
  const sizes = {
    sm: { img: 28, title: 'text-lg', subtitle: 'text-xs' },
    md: { img: 36, title: 'text-xl', subtitle: 'text-sm' },
    lg: { img: 52, title: 'text-3xl', subtitle: 'text-base' },
  };

  const { img, title, subtitle } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/90 dark:bg-white p-2 rounded-xl shadow-glow">
        <img
          src="/logo.png"
          alt="Punjab College Logo"
          width={img}
          height={img}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col">
        <span className={`font-bold gradient-text ${title}`}>Punjab College</span>
        {showSubtitle && (
          <span className={`text-muted-foreground ${subtitle}`}>
            Daroghawala Campus
          </span>
        )}
      </div>
    </div>
  );
}
