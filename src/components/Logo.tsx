// src/components/Logo.tsx

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  showText?: boolean;
}

export function Logo({
  size = "md",
  showSubtitle = true,
  showText = true,
}: LogoProps) {
  const sizes = {
    sm: {
      box: "h-10 w-10",
      title: "text-lg",
      subtitle: "text-xs",
      gap: "gap-2",
    },
    md: {
      box: "h-12 w-12",
      title: "text-xl",
      subtitle: "text-sm",
      gap: "gap-3",
    },
    lg: {
      box: "h-16 w-16",
      title: "text-3xl",
      subtitle: "text-base",
      gap: "gap-4",
    },
  } as const;

  const { box, title, subtitle, gap } = sizes[size];

  return (
    <div className={`flex items-center ${gap}`}>
      {/* Logo Container (FULL VIEW, NO CROP) */}
      <div
        className={`rounded-2xl bg-white/90 dark:bg-white shadow-glow p-2 flex items-center justify-center ${box}`}
      >
        <img
          src="/logo.png"
          alt="Punjab College Logo"
          className="h-full w-full object-contain select-none"
          draggable={false}
          loading="eager"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold gradient-text ${title}`}>
            Punjab College
          </span>

          {showSubtitle && (
            <span className={`text-muted-foreground ${subtitle}`}>
              Daroghawala Campus
            </span>
          )}
        </div>
      )}
    </div>
  );
}
