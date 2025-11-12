import * as React from "react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  loading?: boolean;
  progress?: number;
  icon?: React.ReactNode;
  href?: string;
}

export const PremiumButton = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, PremiumButtonProps>(
  ({ className, variant = "primary", size = "default", loading = false, progress, icon, children, href, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);
    const [particles, setParticles] = React.useState<Array<{ x: number; y: number; id: number; delay: number }>>([]);
    const [isHovered, setIsHovered] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement & HTMLAnchorElement>(null);

    // Ripple effect on click
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
      
      onClick?.(e);
    };

    // Generate particles on hover
    React.useEffect(() => {
      if (isHovered) {
        const interval = setInterval(() => {
          const id = Date.now();
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 0.5;
          
          setParticles((prev) => {
            const newParticles = [...prev, { x, y, id, delay }];
            return newParticles.slice(-8); // Keep max 8 particles
          });
          
          // Remove particle after animation
          setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== id));
          }, 2000);
        }, 200);
        
        return () => clearInterval(interval);
      } else {
        setParticles([]);
      }
    }, [isHovered]);

    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-3 font-bold rounded-xl overflow-hidden",
      "transition-all duration-500 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      size === "lg" && "px-12 py-6 text-xl min-w-[300px]",
      size === "default" && "px-8 py-4 text-lg min-w-[200px]",
      variant === "primary" && "bg-primary text-primary-foreground hover:scale-105 hover:shadow-glow",
      variant === "secondary" && "glass-strong border-2 border-border hover:border-primary/60 text-foreground hover:scale-105",
      className
    );

    const content = (
      <>
        {/* Particle effects */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary-foreground rounded-full pointer-events-none animate-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute w-0 h-0 rounded-full bg-white/30 pointer-events-none animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Progress bar */}
        {(loading || typeof progress === 'number') && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20 overflow-hidden">
            <div 
              className="h-full bg-primary-foreground transition-all duration-300"
              style={{ width: loading ? '100%' : `${progress}%` }}
            >
              {loading && (
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          {loading ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : icon ? (
            icon
          ) : null}
          <span>{children}</span>
        </div>
      </>
    );

    const Component = href ? "a" : "button";

    return (
      <Component
        ref={buttonRef as any}
        href={href}
        className={cn(baseClasses, "group")}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...(props as any)}
      >
        {content}
      </Component>
    );
  }
);

PremiumButton.displayName = "PremiumButton";
