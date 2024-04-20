import express from "express";
import cors from "cors";
const productRouter = require("./routes/productRoutes");

const app = express();
// ** CORS **
let whitelist: string[] = [
  "http://localhost:3000",
  "https://peddle.vercel.app",
];
if (process.env.NODE_ENV !== "production") {
  whitelist = [...whitelist, "http://localhost:3000"];
}

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback("Not allowed by CORS", false);
    }
  },
};

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.use("/products", productRouter);

const PORT = process.env.PG_PORT || 4000;
app.listen(PORT, () => {
  console.log("Listening");
});
