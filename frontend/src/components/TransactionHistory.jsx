import React, { useState, useEffect } from "react";
import { getTransactionHistory } from "../api/walletApi";
import "../css/LichSuGiaoDich.css";

export default function LichSuGiaoDich() {
  const [giaoDich, setGiaoDich] = useState([]);

  // Lấy dữ liệu từ API
  const layLichSuGiaoDich = async () => {
    try {
      const data = await getTransactionHistory();
      setGiaoDich(data);
    } catch (err) {
      console.error("❌ Không thể lấy lịch sử giao dịch:", err);
    }
  };

  useEffect(() => {
    layLichSuGiaoDich();
    const interval = setInterval(layLichSuGiaoDich, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">📜 Lịch sử giao dịch</h2>

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Người gửi</th>
              <th>Người nhận</th>
              <th>Số lượng (ETH)</th>
              <th>Trạng thái</th>
              <th>Mã giao dịch</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {giaoDich.length > 0 ? (
              giaoDich.map((tx) => (
                <tr key={tx._id}>
                  <td>{tx.from}</td>
                  <td>{tx.to}</td>
                  <td>{tx.amount}</td>
                  <td>
                    <span
                      className={`status ${
                        tx.status === "confirmed"
                          ? "success"
                          : tx.status === "failed"
                          ? "failed"
                          : "pending"
                      }`}
                    >
                      {tx.status === "confirmed" && "✅ Hoàn tất"}
                      {tx.status === "failed" && "❌ Thất bại"}
                      {tx.status === "pending" && "⏳ Đang xử lý"}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`https://goerli.etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tx.txHash.slice(0, 10)}...
                    </a>
                  </td>
                  <td>{new Date(tx.createdAt).toLocaleString("vi-VN")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Chưa có giao dịch nào 👀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
