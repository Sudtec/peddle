import express from 'express';
const productRouter = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/products", productRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening");
});
