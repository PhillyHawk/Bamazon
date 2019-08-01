var mysql = require("mysql");
var inquirer = require("inquirer");
​
var connection = mysql.createConnection({
  host: "localhost",
​
  // Your port; if not 3306
  port: 3306,
​
  // Your username
  user: "root",
​
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
          break;     
      }
    });

  };
  function productSearch(){
    inquirer
      .prompt({
        name: "product",
        type: "input",
        message: "What product would you like to search for?" 
      })
      .then(function(answer){
        var query = "SELECT id, product, brand FROM bamazon WHERE ?";
        conection.query(query, { product: answer.product 
      }, function(err, res){
        if (err) throw err;
        for (var i= 0; i < res.length; i++) {
          console.log("Id: " + res[i].id + " || Product: " + res[i].product_name + " || Brand: " + res[i].department_name);
        }
        runSearch();
      });
    });
  }


  