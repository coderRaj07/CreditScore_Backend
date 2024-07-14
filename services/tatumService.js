const { TatumSDK, Network } = require("@tatumio/tatum");

const getTransactionHistory = async (address) => {
  try {
    const tatum = await TatumSDK.init({
      network: Network.ETHEREUM_SEPOLIA,
      apiKey: {
        v4: process.env.TATUM_API_KEY,
      },
    });

    const pageSize = 50;
    let data = [];
    let offset = 0;
    let txs;

    do {
      txs = await tatum.address.getTransactions({
        address: address,
        pageSize: pageSize,
        offset: offset,
      });

      data = data.concat(txs.data);
      offset += pageSize;

      if (offset > 2000) {
        break;
      }
    } while (txs.length === pageSize);

    return data;
  } catch (error) {
    console.error("Error fetching transaction history:", error.message);
    throw error;
  }
};

const calculateMetrics = (transactions) => {
  let transactionFrequency = 0;
  let transactionVolume = 0;
  let newTransactions = 0;
  let transactionTypes = new Set();

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  transactions.forEach((tx) => {
    transactionFrequency++;

    if (tx.transactionType === "native") {
      transactionVolume += parseFloat(tx.amount);
    }

    const txTimestamp = new Date(tx.timestamp).getTime();
    if (txTimestamp > thirtyDaysAgo) {
      newTransactions++;
    }

    transactionTypes.add(tx.transactionType);
  });

  const transactionMix = transactionTypes.size;

  return {
    transactionVolume,
    transactionFrequency,
    transactionMix,
    newTransactions,
  };
};

module.exports = {
  getTransactionHistory,
  calculateMetrics,
};
