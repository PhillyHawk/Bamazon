var mysql = require("mysql");
var Table = require('cli-table2');
var inquirer = require("inquirer");


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
connection.connect();
 

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("-------------------------------");
    console.log("       Welcome to Bamazon     ");
    console.log("-------------------------------");
    console.log("");
    console.log("Find Your Product Below");
    console.log("");
     var table = new Table({
    head: ["Product Id", "Product Description", "Cost"],
    colWidths: [12, 50, 8],
    colAligns: ["center", "left", "right"],
    style: {
      head: ["aqua"],
      compact: true
    }
  });
  for (var i = 0;  i < res.length; i++){
  table.push([res[i].id, res[i].product_name, res[i].price]);}
  console.log(table.toString());
  console.log("");
  });
  };

display();