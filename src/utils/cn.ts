import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes properly, handling
 * conflicts dynamically. This is a crucial "Senior Level" pattern
 * for building reusable UI components with Tailwind CSS.
 *
 * Why: When building reusable components, you want to allow users
 * to override default styles via props. However, simple string concatenation
 * can cause Tailwind class conflicts (e.g., `p-4 p-2` has unpredictable results).
 * `tailwind-merge` knows how to resolve these conflicts natively.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
