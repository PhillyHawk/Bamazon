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


var display = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("-------------------------------");
    console.log("       Welcome to Bamazon     ");
    console.log("-------------------------------");
    console.log("");
    console.log("Find Your Product Below");
    console.log("");
    var table = new Table({
      head: ["Product Id", "Product Description", "Cost", "Quantity"],
      colWidths: [12, 50, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["aqua"],
        compact: true
      }
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(table.toString());
    console.log("");
    shopping();

  });
  // shopping();
};

var shopping = function () {
  inquirer.prompt({
    name: "productToBuy",
    type: "input",
    message: "Please enter the Product Id of the item you'd wish to purchase.!"

  }).then(function (answer1) {
    var selection = answer1.productToBuy;
    connection.query("SELECT * FROM products WHERE ID=?", selection, function (err, res) {
      if (err) throw err;
      if (res.length === 0) {
        console.log("That Product doesn't exist, Please enter a product Id from the list above.");

        shopping();
      } else {
        inquirer.prompt({
          name: "quantity",
          type: "input",
          message: "how many items would you like to purchase?"
        }).then(function(answer2){
          var quantity = answer2.quantity;
          if (quantity > res[0].stock_quantity) {
            console.log("Our Apologies we only have " + res[0].stock_quantity + " items of the product selected")
            shopping();

          }else{
            console.log("");
            console.log(res[0].stock_quantity + "purchased");
            console.log(quantity + " qty @ $" + res[0].price);

            var newQuantity = res[0].stock_quantity - quantity;
            connection.query(
              "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " +res[0].id, function(err, resUpdate) {
                if (err) throw err;
                console.log("");
                console.log("Your Order has been Processed");
                console.log("Thank you for Shopping with us....!")
                console.log("");
                connection.end();
              }
            )
          }
        })
      }
    });
  });

};



display();
// shopping();