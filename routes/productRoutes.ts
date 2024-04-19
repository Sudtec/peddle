import express from 'express';  
const productController = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);
router.route("/:id").put(productController.updateProduct);

module.exports = router;
