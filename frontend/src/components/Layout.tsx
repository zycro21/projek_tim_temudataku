// src/components/Layout.tsx
import { ReactNode } from "react";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {children}
      
      {/* Sonner Toast Container */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        toastOptions={{
          duration: 5000,
          classNames: {
            toast: "group",
          },
        }}
      />
    </div>
  );
}