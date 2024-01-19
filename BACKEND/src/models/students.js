// const connection = require('../db/sqldb'); // Import the MySQL connection

// const createStudentTableQuery = `
//   CREATE TABLE IF NOT EXISTS students (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     phone VARCHAR(10),
//     address TEXT NOT NULL
//   )
// `;

// connection.query(createStudentTableQuery, (err, results) => {
//   if (err) {
//     console.error('Error creating student table:', err);
//   } else  {

//     console.log(results);
//     console.log('MySQL student table created or already exists');
//   }
// });

// module.exports = connection;




// // 2nd

// const connection = require('../db/sqldb'); // Import the MySQL connection
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Prompt the user for student data
// rl.question('Enter student name: ', (name) => {
//   rl.question('Enter student email: ', (email) => {
//     rl.question('Enter student phone (optional): ', (phone) => {
//       rl.question('Enter student address: ', (address) => {

//         // SQL query to insert user-provided data into the "students" table
//         const insertStudentQuery = `
//           INSERT INTO students (name, email, phone, address)
//           VALUES ('${name}', '${email}', '${phone || ''}', '${address}');
//         `;

//         // Create the students table
//         connection.query(insertStudentQuery, (err, results) => {
//           if (err) {
//             console.error('Error inserting student data:', err);
//           } else {
//             console.log('Student data inserted successfully');
//           }

//           // Close the connection after inserting data
//           connection.end();
//           rl.close();
//         });
//       });
//     });
//   });
// });

// module.exports = connection;






// 3rd

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// function createDatabaseConnection() {
//   const connection = require('../db/sqldb'); // Import the MySQL connection

//   // Prompt the user for student data
//   rl.question('Enter student name: ', (name) => {
//     rl.question('Enter student email: ', (email) => {
//       rl.question('Enter student phone (optional): ', (phone) => {
//         rl.question('Enter student address: ', (address) => {
//           // SQL query to insert user-provided data into the "students" table
//           const insertStudentQuery = `
//             INSERT INTO students (name, email, phone, address)
//             VALUES ('${name}', '${email}', '${phone || ''}', '${address}');
//           `;

//           // Create the students table
//           connection.query(insertStudentQuery, (err, results) => {
//             if (err) {
//               console.error('Error inserting student data:', err);
//             } else {
//               console.log('Student data inserted successfully');
//             }

//             // Close the connection after inserting data
//             connection.end();
//             rl.close();
//           });
//         });
//       });
//     });
//   });

//   return connection;
// }

// module.exports = createDatabaseConnection;


// // 4th


// const Sequelize = require('sequelize');
// const connection = require('../db/sqldb');

// const Student = connection.define('student', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   phone: {
//     type: Sequelize.STRING
//   },
//   address: {
//     type: Sequelize.TEXT,
//     allowNull: false
//   }
// });

// // Uncomment the code below to synchronize the model with the database
// // connection.sync().then(() => {
// //   console.log('MySQL student table synchronized');
// // });

// module.exports = Student;









// // 5th

// const connection = require('../db/sqldb');

// function createStudentTable() {
//   const createStudentTableQuery = `
//     CREATE TABLE IF NOT EXISTS students (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       phone VARCHAR(10),
//       address TEXT NOT NULL
//     )
//   `;

//   connection.query(createStudentTableQuery, (err, results) => {
//     if (err) {
//       console.error('Error creating student table:', err);
//     } else {
//       console.log('MySQL student table created or already exists');
//     }
//   });
// }

// function insertStudent(name, email, phone, address) {
//   const insertStudentQuery = `
//     INSERT INTO students (name, email, phone, address)
//     VALUES (?, ?, ?, ?)
//   `;

//   connection.query(insertStudentQuery, [name, email, phone, address], (err, results) => {
//     if (err) {
//       console.error('Error inserting student data:', err);
//     } else {
//       console.log('Student data inserted successfully');
//     }

//     // You may want to handle the response or perform additional actions here
//   });
// }

// module.exports = {
//   createStudentTable,
//   insertStudent,
// };


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
        address TEXT NOT NULL
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

function insertStudent(name, email, phone, address) {
  return new Promise((resolve, reject) => {
    const insertStudentQuery = `
      INSERT INTO students (name, email, phone, address)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(insertStudentQuery, [name, email, phone, address], (err, results) => {
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