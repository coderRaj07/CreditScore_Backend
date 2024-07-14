const { ethers } = require("ethers");
const contractDetails = require("../Contract/contract.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;

const getBalance = async (address) => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error fetching wallet balance:", error.message);
    throw error;
  }
};

const updateCreditScore = async (address, balance, metrics) => {
  const contract = new ethers.Contract(contractAddress, contractDetails.abi, provider);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const transactionVolumeInWei = ethers.utils.parseEther(metrics.transactionVolume.toString());

  try {
    const tx = await contract.connect(wallet).updateUserDetails(
      address,
      transactionVolumeInWei,
      balance,
      metrics.transactionFrequency,
      metrics.transactionMix,
      metrics.newTransactions
    );

    await tx.wait();
    const creditScore = await contract.getCreditScore(address);
    return creditScore;
  } catch (error) {
    console.error("Error updating credit score:", error.message);
    throw error;
  }
};

module.exports = {
  getBalance,
  updateCreditScore,
};
