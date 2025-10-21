import React, { useState } from "react";
import { sendTransaction } from "../api/walletApi";

export default function SendTransaction() {
    const [from, setFrom] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);

    const handleSend = async () => {
        if (!from || !privateKey || !to || !amount) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const data = await sendTransaction({ from, privateKey, to, amount });
            setResult(data);
        } catch (err) {
            setResult({ error: err.message });
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <h2>Send ETH</h2>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="From address"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Private key"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="To address"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount ETH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
            </div>

            {result && (
                <pre style={{ background: "#eee", padding: "10px", marginTop: "10px" }}>
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}
