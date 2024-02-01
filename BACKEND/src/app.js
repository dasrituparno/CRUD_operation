const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const studentsModel = require("./models/students");
const productsModel = require("./models/products");
const uploads = require('./models/uploads');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Create the student and product tables if not exists
studentsModel.createStudentTable();
productsModel.createProductTable();


// Cookie verification middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // No token found, redirect to login page
    return res.status(401).redirect('/login');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Invalid token, redirect to login page
      return res.status(401).redirect('/login');
    }

    // Token is valid, proceed to the next middleware or route handler
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
  });
};


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
    console.log(hashedPassword)

    await studentsModel.createStudentTable(); // Wait for student table creation

    await studentsModel.insertStudent(name, email, phone, address, hashedPassword, hashedPassword); // Wait for student data insertion

    // Redirect to the login page after successful registration
    res.status(201).send({ name, email, phone, address});
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message || e);
  }
});


app.get("/students", async (req, res) => {
  try {
    await studentsModel.createStudentTable(); // Wait for table creation

    const students = await studentsModel.getStudents(); // Wait for data retrieval

    res.status(200).send(students);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});


// update using put method

app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    await studentsModel.createStudentTable(); // Wait for table creation

    await studentsModel.updateStudent(id, name, email, phone, address); // Wait for data update

    res.status(200).send({ id, name, email, phone, address });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

// update using patch method
app.patch("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    await studentsModel.createStudentTable(); // Wait for table creation

    await studentsModel.patchStudent(id, updates); // Wait for data patch

    res.status(200).send({ id, ...updates });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});


app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await studentsModel.createStudentTable(); // Wait for table creation

    await studentsModel.deleteStudent(id); // Wait for data deletion

    res.status(204).send(); // 204 No Content
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});




// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received login request for email:', email);
    console.log('Received login request with password:', password);

    // Logging added for debugging
    const user = await studentsModel.checkLoginDetails(email, password);

    console.log('checkLoginDetails result:', user);

    if (user) {
      // Generate a JWT token and set it as a cookie
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      res.cookie("token", token, { httpOnly: true });

      // Redirect to the products page after successful login
      res.status(200).send({ message: "Successfully logged in", token:token });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

// Products endpoints with cookie verification middleware
app.get('/products', verifyToken, async (req, res) => {
  try {
    await productsModel.createProductTable();
    const products = await productsModel.getProducts();
    res.status(200).send(products);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message || e);
  }
});

// POST method for adding products with image upload
app.post('/products', uploads.single('productImage'), async (req, res) => {
  try {
    const { product_name, product_description } = req.body;
    const productImage = req.file.filename; // Assuming multer saves the filename

    await productsModel.createProductTable();
    await productsModel.insertProduct(product_name, product_description, productImage);

    res.status(201).send({ product_name, product_description, productImage });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message || error);
  }
});

// Update a product by ID
app.put('/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_description } = req.body;
    const product_Image = req.file.filename= req.body; // Assuming multer saves the filename

    await productsModel.createProductTable(); // Wait for product table creation

    const updatedProduct = await productsModel.updateProduct(id, product_name, product_description, product_Image); // Wait for product data update

    res.status(200).send(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || error);
  }
});


// // Update a product by ID
// app.put('/products/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { product_name, product_description } = req.body;
//     const product_Image = req.file.filename; // Assuming multer saves the filename

//     console.log('Received request to update product with ID:', id);
//     console.log('Received product details:', { product_name, product_description, product_Image });

//     await productsModel.createProductTable(); // Wait for product table creation

//     console.log('Calling updateProduct function with ID:', id);
//     const updatedProduct = await productsModel.updateProduct(id, product_name, product_description, product_Image); // Wait for product data update

//     console.log('Product updated successfully:', updatedProduct);
//     res.status(200).send(updatedProduct);
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).send(error.message || error);
//   }
// });




// Partially update a product by ID
app.patch('/products/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    await productsModel.createProductTable(); // Wait for product table creation

    const patchedProduct = await productsModel.patchProduct(id, updates); // Wait for product data patch

    res.status(200).send(patchedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || error);
  }
});




// Delete a product by ID
app.delete('/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await productsModel.createProductTable(); // Wait for product table creation

    await productsModel.deleteProduct(id); // Wait for product data deletion

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || error);
  }
});

// Retrieve a single product by ID
app.get('/products/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await productsModel.createProductTable(); // Wait for product table creation

    const product = await productsModel.getProductById(id); // Wait for product data retrieval

    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.status(200).send(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || error);
  }
});

// Server create
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});