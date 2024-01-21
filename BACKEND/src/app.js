const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const studentsModel = require("./models/students");
const productsModel = require("./models/products");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

// Create the student and product tables if not exists
studentsModel.createStudentTable();
productsModel.createProductTable();

// Routing
app.get("/", (req, res) => {
  res.send("Hi, I am good");
});

// Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, address, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await studentsModel.createStudentTable(); // Wait for student table creation

    await studentsModel.insertStudent(name, email, phone, address,confirmPassword , hashedPassword); // Wait for student data insertion

    // Redirect to the login page after successful registration
    res.status(201).send({ name, email, phone, address, redirectTo: "/login" });
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message || e);
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Assuming you have a function in studentsModel to check login details
    const user = await studentsModel.checkLoginDetails(email, password);

    if (user) {
      // Generate a JWT token and set it as a cookie
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      res.cookie("token", token, { httpOnly: true });

      // Redirect to the products page after successful login
      res.status(200).send({ message: "Successfully logged in", redirectTo: "/products" });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

// Products endpoints
app.get("/products", async (req, res) => {
  try {
    await productsModel.createProductTable(); // Wait for product table creation
    
    const products = await productsModel.getProducts(); // Wait for product data retrieval
    
    res.status(200).send(products);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

app.post("/products", async (req, res) => {
  try {
    const { product_name, product_description } = req.body;

    await productsModel.createProductTable(); // Wait for product table creation

    await productsModel.insertProduct(product_name, product_description); // Wait for product data insertion

    res.status(201).send({ product_name, product_description });
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message || e);
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_description } = req.body;

    await productsModel.createProductTable(); // Wait for product table creation

    await productsModel.updateProduct(id, product_name, product_description); // Wait for product data update

    res.status(200).send({ id, product_name, product_description });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

app.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    await productsModel.createProductTable(); // Wait for product table creation

    await productsModel.patchProduct(id, updates); // Wait for product data patch

    res.status(200).send({ id, ...updates });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await productsModel.createProductTable(); // Wait for product table creation

    await productsModel.deleteProduct(id); // Wait for product data deletion

    res.status(204).send(); // 204 No Content
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

// Server create
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
