const db = require("mysql");
const dotenv = require("dotenv");

let instance = null;

//dotenv
dotenv.config();

const connection = db.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("db connected");
  }
});

class DBFunctions {
  static createDBFunctionsObject() {
    return instance ? instance : new DBFunctions();
  }

  async getCatagoryList() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM catagory;";
        connection.query(query, (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getProducts() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM products;";
        connection.query(query, (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getUserData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM USERS WHERE id='c1';";
        connection.query(query, (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(pid, cid) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO basket(uid,pid) VALUES(?,?) ;";
        connection.query(query, [cid, pid], (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });

      return {
        status: "succsess",
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getBasketItems() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM products,basket where basket.pid=products.pId  ;";
        connection.query(query, (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addOrder(date, price, status) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "INSERT INTO orders(date,price,status) VALUES(?,?,?) ;";
        connection.query(query, [date, price, status], (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });

      return {
        status: "succsess",
      };
    } catch (err) {
      console.log(err);
    }
  }

  //delete
  async delete() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM basket";
        connection.query(query, (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });

      return {
        data: "succsess",
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getOrders() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM orders;";
        connection.query(query, (err, response) => {
          if (err) reject(new Error(err.message));
          resolve(response);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DBFunctions;
