import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface InteractiveGridPatternProps {
  className?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export default function InteractiveGridPattern({
  className,
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: InteractiveGridPatternProps) {
  const id = useRef(`grid-pattern-${Math.random()}`);
  const [squares, setSquares] = useState<Array<{ id: number; pos: [number, number] }>>([]);

  const getPos = () => [
    Math.floor(Math.random() * (props.width || 100) / width),
    Math.floor(Math.random() * (props.height || 100) / height),
  ] as [number, number];

  useEffect(() => {
    const generateSquares = () => {
      setSquares(
        Array.from({ length: numSquares }, (_, i) => ({
          id: i,
          pos: getPos(),
        }))
      );
    };

    generateSquares();
    const interval = setInterval(generateSquares, duration * 1000 + repeatDelay * 1000);

    return () => clearInterval(interval);
  }, [numSquares, duration, repeatDelay, width, height]);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id.current}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id.current})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            exit={{ opacity: 0 }}
            transition={{
              duration,
              repeat: 1,
              repeatType: "reverse",
              delay: index * 0.1,
            }}
            onAnimationComplete={() => {
              setSquares((prev) => prev.filter((s) => s.id !== id));
            }}
            key={`${id}-${index}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 1}
            y={y * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
