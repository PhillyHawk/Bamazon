var mysql = require("mysql");
var Table = require('cli-table2');
var inquirer = require("inquirer");
var colors = require('colors');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "D1!!1ng3r",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("=====================================================");
  runSelected();
});

function runSelected() {
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
        "End Program"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProductsForSale();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addToInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;

        case "End Program":
          endProgram();
          break;
      }
    });
}

function viewProductsForSale() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("--------------------------------------------------------------------------------------");
    console.log("                        Welcome to Bamazon                                            ".bgCyan.black);
    console.log("--------------------------------------------------------------------------------------");
    console.log("");
    console.log("Find Your Product Below".yellow.underline);
    console.log("");
    var table = new Table({
      head: ["Id", "Sneaker Style", "Brand", "Cost", "Quantity"],
      colWidths: [5, 30, 18, 18],
      colAligns: ["center", "left", "right", "left", "center"],
      style: {
        head: ["bgCyan", "black"],
        compact: true
      }
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].department_name, "$".green + res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    console.log("");
    runSelected();

  
  });
}
function viewLowInventory() {
      connection.query("SELECT * FROM products WHERE stock_quantity < 5" , function(err, res) {
        console.log("Low inventory Report: ");
        var table = new Table({
          head: ["Id", "Sneaker Style", "Brand", "Cost", "Quantity"],
          colWidths: [5, 30, 18, 18],
          colAligns: ["center", "left", "right", "left", "center"],
          style: {
            head: ["bgCyan", "black"],
            compact: true
          }
        });
        for (var i = 0; i < res.length; i++) {
          table.push([res[i].id, res[i].product_name, res[i].department_name, "$".green + res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log("");
        runSelected();
        
 });
}
