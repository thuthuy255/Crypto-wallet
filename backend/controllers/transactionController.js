import Web3 from "web3";
import Transaction from "../models/Transaction.js";

const web3 = new Web3(process.env.INFURA_URL);

export const sendTransaction = async (req, res) => {
  const { from, to, privateKey, amount } = req.body;

  try {
    const tx = {
      from,
      to,
      value: web3.utils.toWei(amount.toString(), "ether"),
      gas: 21000,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    const transaction = new Transaction({
      from,
      to,
      amount,
      txHash: receipt.transactionHash,
      status: "confirmed",
    });
    await transaction.save();

    res.json({ receipt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
