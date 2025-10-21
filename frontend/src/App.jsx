import React from "react";
import WalletBalance from "./components/WalletBalance.jsx";
import SendTransaction from "./components/SendTransaction.jsx";
import TransactionHistory from "./components/TransactionHistory.jsx";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Crypto Wallet (Goerli Testnet)</h1>
      <WalletBalance />
      <SendTransaction />
      <TransactionHistory />
    </div>
  );
}

export default App;
