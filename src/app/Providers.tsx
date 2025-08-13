// app/Providers.tsx
"use client";
import { ThemeProvider } from "@/components/components";
import { Toaster } from "@/components/ui/sonner";
import { appStore } from "@/store/store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={appStore}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}
