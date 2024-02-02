  const connection = require('../db/sqldb');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  require('dotenv').config();


  // Create Student Table

  function createStudentTable() {
    return new Promise((resolve, reject) => {
      const createStudentTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          phone VARCHAR(10),
          address TEXT NOT NULL,
          password VARCHAR(255) NOT NULL,
          confirmPassword VARCHAR(255) NOT NULL
        )
      `;

      connection.query(createStudentTableQuery, (err, results) => {
        if (err) {
          console.error('Error creating student table:', err);
          reject(err);
        } else {
          console.log('MySQL student table created or already exists');
          resolve();
        }
      });
    });
  }


  // POST method

  function insertStudent(name, email, phone, address, password, confirmPassword) {
    return new Promise((resolve, reject) => {
      const insertStudentQuery = `
        INSERT INTO students (name, email, phone, address, password, confirmPassword)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      connection.query(insertStudentQuery, [name, email, phone, address, password, confirmPassword], (err, results) => {
        if (err) {
          console.error('Error inserting student data:', err);
          reject(err);
        } else {
          console.log('Student data inserted successfully');
          resolve(results);
        }
      });
    });
  }



  // get method

  function getStudents() {
      return new Promise((resolve, reject) => {
        const getStudentsQuery = 'SELECT * FROM students';
    
        connection.query(getStudentsQuery, (err, results) => {
          if (err) {
            console.error('Error retrieving students:', err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }


  // put method


    function updateStudent(id, name, email, phone, address) {
      return new Promise((resolve, reject) => {
        const updateStudentQuery = `
          UPDATE students
          SET name = ?, email = ?, phone = ?, address = ?
          WHERE id = ?
        `;
    
        connection.query(
          updateStudentQuery,
          [name, email, phone, address, id],
          (err, results) => {
            if (err) {
              console.error('Error updating student data:', err);
              reject(err);
            } else {
              console.log('Student data updated successfully');
              resolve(results);
            }
          }
        );
      });
    }


  // patch method

    function patchStudent(id, updates) {
      return new Promise((resolve, reject) => {
        // Build SET clause for partial update
        const setClause = Object.entries(updates)
          .map(([key, value]) => `${key} = ?`)
          .join(', ');
    
        const patchStudentQuery = `
          UPDATE students
          SET ${setClause}
          WHERE id = ?
        `;
    
        connection.query(
          patchStudentQuery,
          [...Object.values(updates), id],
          (err, results) => {
            if (err) {
              console.error('Error patching student data:', err);
              reject(err);
            } else {
              console.log('Student data patched successfully');
              resolve(results);
            }
          }
        );
      });
    }


    // DELETE method


    function deleteStudent(id) {
      return new Promise((resolve, reject) => {
        const deleteStudentQuery = 'DELETE FROM students WHERE id = ?';
    
        connection.query(deleteStudentQuery, [id], (err, results) => {
          if (err) {
            console.error('Error deleting student:', err);
            reject(err);
          } else {
            console.log('Student deleted successfully');
            resolve(results);
          }
        });
      });
    }

  // CHECK Login Details

    async function checkLoginDetails(email, password) {
      return new Promise(async (resolve, reject) => {
        console.log('Checking login details for:', email);
        const checkLoginDetailsQuery = 'SELECT * FROM students WHERE email = ?';
    
        connection.query(checkLoginDetailsQuery, [email], async (err, results) => {
          if (err) {
            console.error('Error checking login details:', err);
            reject(err);
          } else {
            console.log('Query results:', results);
    
            if (results.length > 0) {
              // User found, check password
              const user = results[0];
    
              const passwordMatch = await bcrypt.compare(password, user.password);
              
              if (passwordMatch) {
                // Passwords match, generate and return a token
                const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
                  expiresIn: '1h', // Token expires in 1 hour
                });
    
                console.log('Login successful. Token:', token);
                resolve({ user, token });
              } else {
                // Passwords do not match
                console.log('Invalid password');
                resolve(null);
              }
            } else {
              // No matching user found
              console.log('User not found');
              resolve(null);
            }
          }
        });
      });
    }
    
    
    
    
    
    module.exports = {
      createStudentTable,
      insertStudent,
      getStudents,
      updateStudent,
      patchStudent,
      deleteStudent,
      checkLoginDetails,
    };