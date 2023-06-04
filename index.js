const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const express = require("express");
require('dotenv').config();
const consoleTable = require("console.table");


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the hr_tracker database.`)
);

function selections(){ inquirer.prompt([
    {
        type: 'list',
        name: 'inputPrompt',
        message: 'Please select from the following:',
        choices: [ "View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role" ]
    }
  ])
  .then((data) => {
    switch (data.inputPrompt) {        
      case "View All Departments":
        viewDepartments();
        break;
      case "View All Roles":
        viewRoles();

        break;
      case "View All Employees":
        viewEmployees();
        break;
      case "Add a Department": 
        addDepartment();
        break;
      case "Add a Role":
        addRole();
        break;
      case 
        "Add an Employee":
        addEmployee();
        break;
      case 
      "Update an Employee Role":
        updateEmployee();
        break;
    }
  });
}

selections();

//view each table/data
function viewDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.table(results);
    selections();
  });
}
  

function viewRoles() {
  db.query("SELECT * FROM roles", function (err, results) {
    console.table(results);
    selections();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employees", function (err, results) {
    console.table(results);
    selections();
  });
}

//add to each table/data
function addDepartment(){ 
    
    inquirer.prompt([
        {
        type: "input", 
        message: 'Department to add?' ,
        name: "newDepartment" 
        },
        
  ])
  .then((data) => {
    db.query(`INSERT INTO departments (department_name) VALUES (?)`,
    [data.newDepartment], function (err, results) {
      if (err) throw err;
      console.table(results);
      viewDepartments();
      selections();
    });
  });

}

function addRole() { 
  inquirer.prompt([
    {
      type: "input", 
      name: "newRole",
      message: "name of Role to add? "
    },
    {
      type: "input", 
      name: "newSalary",
      message: "Salary of Role? "
    },
    {
      type: "input", 
      name: "newDepartment",
      message: "Department ID for Role? "
    },

  ])
  .then((data) => {
    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
    [data.newRole, data.newSalary, data.newDepartment], 
    function (err, results) {
      if (err) throw err;
      console.table(results);
      
      selections();
    })
  })
}

function addEmployee(){ 
    
    inquirer.prompt([
    {
      type: "input", 
      name: "newFname",
      message: "First Name:  "
    },
    {
      type: "input", 
      name: "newLname",
      message: "Last Name: "
    },
    {
      type: "input", 
      name: "newRole",
      message: "Employee's Role ID: "
    },
    {
      type: "input", 
      name: "newRoleId",
      message: "Manager Role ID: "
    },


  ])
  .then((data) => {
    db.query(`INSERT INTO employees (fname, lname, role_id, manager_id) VALUES (?, ?, ?, ?)`,
    [data.newFname, data.newLname, data.newRole, data.newRoleId], function (err, results){
      if (err) throw err;
      console.table(results);
      console.log(results)
      viewEmployees();
      selections();
    })
  })
}

//update table/data
function updateEmployee(){ 
    inquirer.prompt([
    {
      type: "input", 
      name: "updateEmployee",
      message: "Employee's id: "
    },
    {
      type: "input", 
      name: "updateRole",
      message: "Employee's new Role ID: "
    }

  ])
  .then((data) => {
    db.query(`UPDATE employees SET role_id = ? WHERE id = ?`,
    [data.updateRole, data.updateEmployee], function (err, results){
      if (err) throw err;
      console.table(results);
      viewEmployees();
      selections();
    })
  })

}
