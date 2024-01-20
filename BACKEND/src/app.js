const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const studentsModel = require("./models/students");

app.use(express.json());
const sqldblocal = require("./db/sqldb");

studentsModel.createStudentTable(); // Create the student table if not exists

// routing
app.get("/", (req, res) => {
  res.send("Hi, I am good");
});

// // create a new student
// app.post("/students", (req, res) => {
//   const { name, email, phone, address } = req.body;
//   studentsModel.insertStudent(name, email, phone, address);
//   res.status(201).send({ name, email, phone, address });
// });


// create a new student
// app.post("/students", (req, res) => {

//     try{
//         const { name, email, phone, address } = req.body;
//         studentsModel.insertStudent(name, email, phone, address);
//         res.status(201).send({ name, email, phone, address });

//     }catch(e){res.status(400).send(e); }

//   });


// INSERT using POST method

app.post("/register", async (req, res) => {
    try {
      const { name, email, phone, address, password, confirmPassword } = req.body;
      
      await studentsModel.createStudentTable(); // Wait for table creation
      
      await studentsModel.insertStudent(name, email, phone, address, password, confirmPassword); // Wait for data insertion
      
      res.status(201).send({ name, email, phone, address, password, confirmPassword });
    } catch (e) {
      console.error(e);
      res.status(400).send(e.message || e);
    }
  });
  



// // read students data

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
  
  
// DELETE students data


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



// server create
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});