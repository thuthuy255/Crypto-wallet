// import Web3 from "web3";
// import Transaction from "../models/Transaction.js";

// const web3 = new Web3(process.env.INFURA_URL);

// export const sendTransaction = async (req, res) => {
//   const { from, to, privateKey, amount } = req.body;

//   try {
//     const tx = {
//       from,
//       to,
//       value: web3.utils.toWei(amount.toString(), "ether"),
//       gas: 21000,
//     };

//     const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

//     const transaction = new Transaction({
//       from,
//       to,
//       amount,
//       txHash: receipt.transactionHash,
//       status: "confirmed",
//     });
//     await transaction.save();

//     res.json({ receipt });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getTransactionHistory = async (req, res) => {
//   try {
//     const transactions = await Transaction.find()
//       .sort({ createdAt: -1 })
//       .limit(50);
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import Web3 from "web3";
import Transaction from "../models/Transaction.js";

const web3 = new Web3(process.env.INFURA_URL);

export const sendTransaction = async (req, res) => {
  const { from, to, privateKey, amount } = req.body;

  try {
    // 🔹 Lấy gasPrice động
    const gasPrice = await web3.eth.getGasPrice();

    // 🔹 Tạo giao dịch
    const tx = {
      from,
      to,
      value: web3.utils.toWei(amount.toString(), "ether"),
      gas: 21000,
      gasPrice,
    };

    // 🔹 Ký giao dịch
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    // 🔹 Gửi giao dịch
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    // 🔹 Lưu vào MongoDB
    const transaction = new Transaction({
      from,
      to,
      amount,
      txHash: receipt.transactionHash,
      status: receipt.status ? "confirmed" : "failed",
    });
    await transaction.save();

    // ✅ Fix lỗi BigInt: chuyển mọi giá trị BigInt thành string trước khi gửi JSON
    const safeReceipt = JSON.parse(
      JSON.stringify(receipt, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({
        message: "✅ Transaction sent successfully!",
        receipt: safeReceipt,
      })
    );
  } catch (err) {
    console.error("❌ Send transaction error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(50);

    // ✅ Fix BigInt trong lịch sử (nếu có)
    const safeTransactions = JSON.parse(
      JSON.stringify(transactions, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(safeTransactions));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
