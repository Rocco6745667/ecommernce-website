const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const uri =
  "mongodb+srv://RoccoAli:Club22477!@itec4020.qdnex.mongodb.net/?retryWrites=true&w=majority&appName=ITEC4020";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL for product image
  category: { type: String }, // Optional: product category
});

app.use(express.static("public"));

const Product = mongoose.model("Product", ProductSchema);

const app = express();
app.use(bodyParser.json());

// Route for getting all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Route for getting a specific product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
});

// Route for creating a new product (for demonstration, replace with authentication/authorization)
app.post("/products", async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: "Error creating product" });
  }
});

// Placeholder route for simulating a successful payment (replace with actual payment processing logic)
app.post("/payment", (req, res) => {
  res.json({ message: "Payment successful" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
