import React from "react";
import WalletBalance from "./components/WalletBalance.jsx";
import SendTransaction from "./components/SendTransaction.jsx";
import TransactionHistory from "./components/TransactionHistory.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">💰 Ví Tiền Điện Tử (Mạng Thử Nghiệm Goerli)</h1>

      <div className="app-card">
        <SendTransaction />

        <WalletBalance />
        <TransactionHistory />
      </div>
    </div>
  );
}

export default App;
