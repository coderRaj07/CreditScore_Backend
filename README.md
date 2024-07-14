# 🎯 Credit Score Application

## ⚙️ Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/coderRaj07/CreditScore_Backend
    cd credit-score-app
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file and add the following variables:**
    ```env
    PORT=3000
    RPC_URL=YOUR_RPC_URL
    CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
    PRIVATE_KEY=YOUR_PRIVATE_KEY
    TATUM_API_KEY=YOUR_TATUM_API_KEY
    ```

4. **Start the server:**
    ```sh
    npm start
    ```

## 🚀 Usage

**Access the API endpoint to get the credit score:**
```sh
GET /api/get-credit-score/:address
```
Replace `:address` with the Ethereum address you want to check.
