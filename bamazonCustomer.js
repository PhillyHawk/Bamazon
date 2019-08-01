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
connection.connect();


var display = function () {
  connection.query("SELECT * FROM products", function (err, res)  {
    if (err) throw err;
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
    shopping();

  });
  // shopping();
};

var shopping = function () {
  inquirer.prompt({
    name: "productToBuy",
    type: "input",
    message: "Please enter the Product Id # of the item you'd wish to purchase.!".cyan

  }).then(function (answer1) {
    var selection = answer1.productToBuy;
    connection.query("SELECT * FROM products WHERE ID=?", selection, function (err, res) {
      if (err) throw err;
      if (res.length === 0) {
        console.log("That Product doesn't exist, Please enter a product Id from the list above.".red);

        shopping();
      } else {
        inquirer.prompt({
          name: "quantity",
          type: "input",
          message: "how many items would you like to purchase?".cyan
        }).then(function(answer2){
          var quantity = answer2.quantity;
          if (quantity > res[0].stock_quantity) {
            console.log("Our Apologies we only have ".red + res[0].stock_quantity + " items of the product selected".red)
            shopping();

          }else{
            console.log("");
            console.log(res[0].product_name + " purchased");
            console.log(quantity + " qty @ $" + (res[0].price * quantity));

            var newQuantity = res[0].stock_quantity - quantity;
            connection.query(
              "UPDATE products SET stock_quantity = " + newQuantity + " WHERE id = " +res[0].id, function(err, resUpdate) {
                if (err) throw err;
                console.log("");
                console.log("Your Order has been Processed".green);
                console.log("Thank you for Shopping with us....!".green)
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