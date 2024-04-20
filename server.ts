import express from "express";
import cors from "cors";
const productRouter = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRouter);

const PORT = process.env.PG_PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening");
});
