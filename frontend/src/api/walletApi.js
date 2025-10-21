const BASE_URL = "http://localhost:5000/api";

export const getBalance = async (address) => {
  const res = await fetch(`${BASE_URL}/wallet/balance/${address}`);
  return res.json();
};

export const sendTransaction = async ({ from, to, privateKey, amount }) => {
  const res = await fetch(`${BASE_URL}/transaction/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, privateKey, amount }),
  });
  return res.json();
};

export const getTransactionHistory = async () => {
  const res = await fetch(`${BASE_URL}/transaction/history`);
  return res.json();
};
