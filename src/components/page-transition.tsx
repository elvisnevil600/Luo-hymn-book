import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "forward" | "back";
}

export default function PageTransition({ children, direction = "up" }: PageTransitionProps) {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === "forward" ? 20 : direction === "back" ? -20 : 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: direction === "forward" ? -20 : direction === "back" ? 20 : 0,
      y: direction === "up" ? -20 : direction === "down" ? 20 : 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
