"use client";

import { ReactNode } from "react";
import {WalletProvider} from "@/context/WalletContext";

const ClientSideWrapper = ({ children }: { children: ReactNode }) => {
  return <WalletProvider>{children}</WalletProvider>;
};

export default ClientSideWrapper;
