const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testvmo"
});


con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  app.get("/products", (req, res) => {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
  })

  app.put('/update',(req,res)=>{
    const id = req.body.id;
    const stock = req.body.stock;
    const sell = req.body.sell;
    con.query("UPDATE products SET stock_products = ?,sell_products = ? WHERE id = ?",[stock,sell,id],(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    })
  })

  app.put('/restock',(req,res)=>{
    const allstock = req.body.stockall;
    con.query("UPDATE products SET stock_products = ? WHERE id = id",[allstock],(err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    })
  })

});

app.listen(5000);

