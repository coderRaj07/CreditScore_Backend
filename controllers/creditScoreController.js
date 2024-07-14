const { getBalance, updateCreditScore } = require("../services/ethereumService");
const { getTransactionHistory, calculateMetrics } = require("../services/tatumService");

const getCreditScore = async (req, res) => {
  const address = req.params.address;
  try {
    const balance = await getBalance(address);
    const transactions = await getTransactionHistory(address);
    const metrics = calculateMetrics(transactions);

    const creditScore = await updateCreditScore(address, balance, metrics);

    res.json({
      address,
      balance: `${balance} ETH`,
      transactionVolume: `${metrics.transactionVolume.toFixed(2)} ETH`,
      transactionFrequency: metrics.transactionFrequency,
      newTransactions: metrics.newTransactions,
      transactionMix: metrics.transactionMix,
      creditScore: `${creditScore}`,
    });
  } catch (error) {
    if (error.message.includes("Can only update after 21 days")) {
      res.status(400).json({ error: "Can only update after 21 days" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  getCreditScore,
};
