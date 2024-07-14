require("dotenv").config();
const express = require("express");
const creditScoreRoutes = require("./routes/creditScoreRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", creditScoreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
