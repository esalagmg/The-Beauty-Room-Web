import type { ReactNode } from "react";

export const metadata = { title: "Admin · Sign in" };

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-gradient px-6">
      <div className="grain" />
      <div className="relative z-10 w-full max-w-sm">{children}</div>
    </div>
  );
}
