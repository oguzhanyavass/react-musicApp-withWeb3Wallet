// src/components/providers.tsx
import { ReactNode } from "react";
import { WalletProvider } from "@/context/WalletContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <WalletProvider>{children}</WalletProvider>;
};

export default Providers;
