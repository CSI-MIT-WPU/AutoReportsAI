import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertFirestoreTimestampToDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}): Date {
  try {
    if (
      timestamp &&
      typeof timestamp.seconds === "number" &&
      typeof timestamp.nanoseconds === "number"
    ) {
      return new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
    }
  } catch (error) {
    console.error("Error formatting time:", error);
  }
  return new Date();
}