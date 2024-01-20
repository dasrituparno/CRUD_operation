// 6th
const connection = require('../db/sqldb');

function createStudentTable() {
  return new Promise((resolve, reject) => {
    const createStudentTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(10),
        address TEXT NOT NULL,
        password VARCHAR(8) NOT NULL,
        confirmPassword VARCHAR(8) NOT NULL
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
  
  module.exports = {
    createStudentTable,
    insertStudent,
    getStudents,
    updateStudent,
    patchStudent,
    deleteStudent,
  };