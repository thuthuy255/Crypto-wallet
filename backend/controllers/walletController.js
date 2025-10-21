import Web3 from "web3";

const web3 = new Web3(process.env.INFURA_URL);

export const getBalance = async (req, res) => {
  try {
    const balance = await web3.eth.getBalance(req.params.address);
    res.json({ balance: web3.utils.fromWei(balance, "ether") });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
