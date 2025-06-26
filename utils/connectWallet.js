export const connectWallet = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (err) {
    console.error("Failed to connect wallet:", err);
    return null;
  }
};
