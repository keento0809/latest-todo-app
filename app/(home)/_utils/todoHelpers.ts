/**
 * Utility function to normalize todo completion status
 * Handles both boolean and string representations consistently
 */
export const isCompleted = (value: boolean | "true" | "false"): boolean => {
  return value === true || value === "true";
};