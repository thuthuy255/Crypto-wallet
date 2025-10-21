import React, { useState, useEffect } from "react";
import { getTransactionHistory } from "../api/walletApi";

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    const fetchHistory = async () => {
        try {
            const data = await getTransactionHistory();
            setTransactions(data);
        } catch (err) {
            console.error("Failed to fetch transaction history:", err);
        }
    };

    useEffect(() => {
        fetchHistory();
        const interval = setInterval(fetchHistory, 5000); // cập nhật 5s/lần
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ marginBottom: "20px" }}>
            <h2>Transaction History</h2>
            <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount (ETH)</th>
                        <th>Status</th>
                        <th>Tx Hash</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx._id}>
                            <td>{tx.from}</td>
                            <td>{tx.to}</td>
                            <td>{tx.amount}</td>
                            <td>{tx.status}</td>
                            <td>
                                <a
                                    href={`https://goerli.etherscan.io/tx/${tx.txHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {tx.txHash.slice(0, 10)}...
                                </a>
                            </td>
                            <td>{new Date(tx.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
