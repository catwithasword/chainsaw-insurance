"use client";

import { useState } from "react";
import { connectWallet } from "@/utils/connectWallet";

export default function ConnectButton() {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {walletAddress
        ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}
