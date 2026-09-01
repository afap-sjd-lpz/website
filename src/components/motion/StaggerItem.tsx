"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  if (as === "li") {
    return (
      <motion.li variants={staggerItemVariants} className={className}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
