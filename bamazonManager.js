var mysql = require("mysql");
var inquirer = require("inquirer");

​var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "D1!!1ng3r",
  database: "bamazon_DB"
});

​
connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});
​
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    }).then(function (answer){
      switch (answer.action){
        case "View Products for Sale":
          productSearch();
          break;

        case "View Low Inventory":
          rangeSearch();
          break;

        case "exit":
          connection.end();
          break;     
      }
    });

  };
  function productSearch() {
    inquirer
      .prompt({
        name: "product",
        type: "input",
        message: "What product would you like to look for?"
      })
      .then(function(answer) {
        console.log(answer.song);
        connection.query("SELECT * FROM bamazon WHERE ?", { song: answer.song }, function(err, res) {
          if (err) throw err;
          console.log(
            "Id: " +
              res[0].id +
              " || Product: " +
              res[0].product_name +
              " || Brand: " +
              res[0].department_name +
              " || Quantity: " +
              res[0].stock_quantity
          );
          runSearch();
        });
      });
 
  }
  
  function rangeSearch () {
    inquirer
    .prompt([
      {
      name: "start",
      type: "input",
      message: "Enter starting inventory amount: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
        name: "end",
        type:"input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false){
            return ture;
          }
          return false;
        }
      },
    
    ])
    .then(function(answer) {
      var query = "SELECT Id,product,brand,quantity FROM bamazon WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Id: " +
              res[i].id +
              " || Product: " +
              res[i].prduct_name +
              " || Brand: " +
              res[i].department_name +
              " || Quantity: " +
              res[i].stock_quantity
          );
        }
        runSearch();
      });
    });
  }
    
  


  