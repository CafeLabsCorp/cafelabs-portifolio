"use client"

import * as React from "react"
import { MotionConfig } from "framer-motion"

// Faz todas as animações do Framer Motion respeitarem o "reduzir movimento" do sistema
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
