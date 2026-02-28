import { Suspense } from "react";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#2D2420] flex items-center justify-center">
        <div className="w-10 h-px bg-[#C4956A] animate-pulse" />
      </div>
    }>
      {children}
    </Suspense>
  );
}
