import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <TooltipProvider>
        <AuthProvider>
          <Component {...pageProps} />
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryProvider>
  );
}
