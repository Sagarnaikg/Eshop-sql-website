//import
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DBFunctions = require("./db_services");

//initilization
//app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//dotenv
dotenv.config();
const db = DBFunctions.createDBFunctionsObject();

//read
//READ
app.get("/loadCatagories", (request, response) => {
  const data = db.getCatagoryList();

  data
    .then((data) => {
      response.json({
        catagories: data,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/orders", (request, response) => {
  const data = db.getOrders();

  data
    .then((data) => {
      response.json({
        orders: data,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/loadProducts", (request, response) => {
  const data = db.getProducts();

  data
    .then((data) => {
      response.json({
        products: data,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/loadUserProfile", (request, response) => {
  const data = db.getUserData();

  data
    .then((data) => {
      response.json({
        products: data,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/basketItems", (request, response) => {
  const data = db.getBasketItems();

  data
    .then((data) => {
      response.json({
        products: data,
      });
    })
    .catch((err) => console.log(err));
});

//create
app.post("/addBasket", (request, response) => {
  const data = db.addProduct(request.body["pid"], request.body["cid"]);

  data
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

app.post("/addOrders", (request, response) => {
  const data = db.addOrder(
    request.body["date"],
    request.body["price"],
    request.body["status"]
  );

  data
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
});

//delete
app.delete("/delete", (request, response) => {
  const res = db.delete();

  res.then((data) => console.log("Success")).catch((err) => console.log(err));
});

//update

app.listen(process.env.PORT, () => console.log("Server is running"));
