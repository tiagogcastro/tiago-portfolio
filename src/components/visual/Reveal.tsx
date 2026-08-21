"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = React.ComponentProps<typeof motion.div>;

export function Reveal({ className, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
