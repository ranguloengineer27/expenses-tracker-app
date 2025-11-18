import { devtools } from "zustand/middleware";

export const withDevtools = <T>(
  initializer: T,
  options?: Parameters<typeof devtools>[1],
): T => {
  if (process.env.NODE_ENV === "development") {
    return devtools(initializer as any, options) as T;
  }

  return initializer;
};
