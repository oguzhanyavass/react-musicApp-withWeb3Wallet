
"use client";

import { createContext, useState, ReactNode, useContext } from 'react';

interface WalletContextProps {
  walletCreated: boolean;
  setWalletCreated: (created: boolean) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletCreated, setWalletCreated] = useState(false);

  return (
    <WalletContext.Provider value={{ walletCreated, setWalletCreated }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
