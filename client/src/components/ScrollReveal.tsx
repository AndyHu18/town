import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  distance?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  distance = 50,
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: `0px 0px -${threshold * 100}% 0px` as any });

  const getInitialProps = () => {
    switch (direction) {
      case "up": return { y: distance, opacity: 0 };
      case "down": return { y: -distance, opacity: 0 };
      case "left": return { x: distance, opacity: 0 };
      case "right": return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case "up": case "down": return { y: 0, opacity: 1 };
      case "left": case "right": return { x: 0, opacity: 1 };
      default: return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialProps()}
      animate={isInView ? getAnimateProps() : getInitialProps()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for luxury feel
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
