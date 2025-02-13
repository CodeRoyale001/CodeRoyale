"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/lib/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <AuthProvider>
    {children}
    </AuthProvider>
    </Provider>;
}
