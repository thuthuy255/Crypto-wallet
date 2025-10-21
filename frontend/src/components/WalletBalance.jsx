import React, { useState, useEffect } from "react";
import { getTransactionHistory } from "../api/walletApi";
import "../css/TransactionHistory.css"; // import CSS thuần

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  // Lấy dữ liệu giao dịch từ API
  const fetchHistory = async () => {
    try {
      const data = await getTransactionHistory();
      setTransactions(data);
    } catch (err) {
      console.error("❌ Không thể lấy lịch sử giao dịch:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tx-container">
      <h2 className="tx-title">📜 Lịch sử giao dịch</h2>

      {transactions.length === 0 ? (
        <p className="tx-empty">Chưa có giao dịch nào...</p>
      ) : (
        <div className="tx-table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Số lượng (ETH)</th>
                <th>Trạng thái</th>
                <th>Tx Hash</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="tx-row">
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td className="tx-amount">{tx.amount}</td>
                  <td>
                    <span
                      className={`tx-status ${
                        tx.status === "confirmed" ? "success" : "failed"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`https://goerli.etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tx-hash"
                    >
                      {tx.txHash.slice(0, 12)}...
                    </a>
                  </td>
                  <td>{new Date(tx.createdAt).toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
