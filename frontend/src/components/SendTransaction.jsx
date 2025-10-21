import React, { useState } from "react";
import { sendTransaction } from "../api/walletApi";
import "../css/GuiGiaoDich.css";

export default function GuiGiaoDich() {
  const [nguoiGui, setNguoiGui] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [soTien, setSoTien] = useState("");
  const [ketQua, setKetQua] = useState(null);
  const [dangGui, setDangGui] = useState(false);

  const handleSend = async () => {
    if (!nguoiGui || !privateKey || !nguoiNhan || !soTien) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setDangGui(true);
    setKetQua(null);

    try {
      const data = await sendTransaction({
        from: nguoiGui,
        privateKey,
        to: nguoiNhan,
        amount: soTien,
      });
      setKetQua({ success: true, ...data });
    } catch (err) {
      setKetQua({ error: err.message });
    } finally {
      setDangGui(false);
    }
  };

  return (
    <div className="send-container">
      <h2 className="send-title">💰 Gửi ETH</h2>

      <div className="send-form">
        <input
          type="text"
          placeholder="Địa chỉ người gửi"
          value={nguoiGui}
          onChange={(e) => setNguoiGui(e.target.value)}
        />
        <input
          type="text"
          placeholder="Khóa riêng (Private Key)"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Địa chỉ người nhận"
          value={nguoiNhan}
          onChange={(e) => setNguoiNhan(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số lượng ETH cần gửi"
          value={soTien}
          onChange={(e) => setSoTien(e.target.value)}
        />

        <button onClick={handleSend} disabled={dangGui}>
          {dangGui ? "⏳ Đang gửi..." : "🚀 Gửi giao dịch"}
        </button>
      </div>

      {ketQua && !ketQua.error && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#d4edda",
            color: "#155724",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          ✅ Giao dịch thành công!
        </div>
      )}

      {ketQua && ketQua.error && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f8d7da",
            color: "#721c24",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          ❌ Giao dịch thất bại: {ketQua.message}
        </div>
      )}
    </div>
  );
}
