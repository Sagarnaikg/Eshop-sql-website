document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/loadCatagories")
    .then((response) => response.json())
    .then((data) => setCatagories(data["catagories"]))
    .catch((err) => console.log(err));

  fetch("http://localhost:5000/loadProducts")
    .then((response) => response.json())
    .then((data) => setProducts(data["products"]))
    .catch((err) => console.log(err));

  fetch("http://localhost:5000/loadUserProfile")
    .then((response) => response.json())
    .then((data) => setUserProfile(data["products"][0]))
    .catch((err) => console.log(err));

  addBtn();
});

let setCatagories = (catagoriesList) => {
  const tabs = document.getElementsByClassName("tabs")[0];
  tabs.innerHTML = "";
  catagoriesList.forEach((catagory, index) => {
    tabs.innerHTML += `<li class='tab col s4 ${
      index == 0 ? "active" : ""
    }'><a href='#test${index + 1}'>${catagory["name"]}</a></li>`;
  });
};

let setProducts = (productsList) => {
  const products1 = document.getElementsByClassName("products1")[0];
  const products2 = document.getElementsByClassName("products2")[0];
  const products3 = document.getElementsByClassName("products3")[0];

  products1.innerHTML = "";
  products2.innerHTML = "";
  products3.innerHTML = "";

  productsList.forEach((product) => {
    if (product["catId"] === "cat1") {
      products1.innerHTML += `
        <!-- card1 -->
                      <div style="margin: 10px;">
                          <div class="card white ">
                              <div class="card-content ">
                                  <img class="center col m12"
                                      src="${product["img"]}"
                                      alt="apple image" srcset="">
                                  <div class="product-name">${product["name"]}</div>
                                  <p class="product-price">Price:-<span>₹${product["price"]}</span></p>
                              </div>
                              <div class="buy-actions">
                            
                                  <div class="buy-btn"   >
                                      <a class="waves-effect waves-light btn-small"  data-id="${product["pId"]}"   ><i
                                              class="material-icons right">add_shopping_cart</i>Add</a>
                                  </div>
                              </div>
                          </div>
                      </div><!-- /card -->
  
        `;
    } else if (product["catId"] === "cat2") {
      products2.innerHTML += `
        <!-- card1 -->
                      <div style="margin: 10px;">
                          <div class="card white ">
                              <div class="card-content ">
                                  <img class="center col m12"
                                      src="${product["img"]}"
                                      alt="apple image" srcset="">
                                  <div class="product-name">${product["name"]}</div>
                                  <p class="product-price">Price:-<span>₹${product["price"]}</span></p>
                              </div>
                              <div class="buy-actions">
                                  <div class="buy-btn">
                                      <a class="waves-effect waves-light btn-small" data-id="${product["pId"]}"><i
                                              class="material-icons right">add_shopping_cart</i>Add</a>
                                  </div>
                              </div>
                          </div>
                      </div><!-- /card -->
  
        `;
    } else if (product["catId"] === "cat3") {
      products3.innerHTML += `
        <!-- card1 -->
                      <div style="margin: 10px;">
                          <div class="card white ">
                              <div class="card-content ">
                                  <img class="center col m12"
                                      src="${product["img"]}"
                                      alt="apple image" srcset="">
                                  <div class="product-name">${product["name"]}</div>
                                  <p class="product-price">Price:-<span>₹${product["price"]}</span></p>
                              </div>
                              <div class="buy-actions">
                                  <div class="buy-btn">
                                      <a class="waves-effect waves-light btn-small" data-id="${product["pId"]}"><i
                                              class="material-icons right">add_shopping_cart</i>Add</a>
                                  </div>
                              </div>
                          </div>
                      </div><!-- /card -->
  
        `;
    }
  });
};

let setUserProfile = (user) => {
  const profileModel = document.getElementById("modal2");
  profileModel.innerHTML = `<div class='modal-content'>
  <h5>My Profile</h5>
  <ul class='profile-content" style="display: grid;grid-template-columns: auto auto;'>
      <div>${user["name"]}</div>
      <div>${user["email"]}</div>
      <div>${user["address"]}</div>
      <div>${user["phone"]}</div>
  </ul>
</div> `;
};

let addBtn = () => {
  document.getElementById("test1").addEventListener("click", (e) => {
    addTobasket(e.target.dataset.id);
  });
  document.getElementById("test2").addEventListener("click", (e) => {
    addTobasket(e.target.dataset.id);
  });
  document.getElementById("test3").addEventListener("click", (e) => {
    addTobasket(e.target.dataset);
  });

  document.getElementById("b").addEventListener("click", () => {
    fetch("http://localhost:5000/basketItems")
      .then((response) => response.json())
      .then((data) => addBasketProducts(data["products"]))
      .catch((err) => console.log(err));
  });

  document.getElementById("o").addEventListener("click", () => {
    fetch("http://localhost:5000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data["orders"]))
      .catch((err) => console.log(err));
  });
};

let setOrders = (orders) => {
  const ordersModel = document.getElementById("orders");

  ordersModel.innerHTML = "";

  orders.forEach((item) => {
    ordersModel.innerHTML += `
      <div class="order-product-card">
      <div class="img-section" style="width: 100px;text-align: center;">
          <div class="product-name">${item["date"]}</div>
      </div>
      <div class="content-section">

          <div class="card-order-footer">
              <p class="product-price">₹${item["price"]}</p>
              <div class="product-name">${item["status"]}</div>
          </div>
      </div>
  </div>
      `;
  });
};

let addTobasket = (id) => {
  fetch("http://localhost:5000/addBasket", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ pid: id, cid: "c1" }),
  });
};

let addBasketProducts = (basketProducts) => {
  const products = document.getElementById("myOrders");
  const checkoutBtn = document.getElementById("ckeckout");

  let total = 0;

  products.innerHTML = " ";

  basketProducts.forEach((item) => {
    total += item["price"];
    products.innerHTML += ` <div class="order-product-card">
        <div class="img-section">
            <img class="center col m12"
                src="${item["img"]}"
                alt="apple image" srcset="">
        </div>
        <div class="content-section">
            <div class="product-name">${item["name"]}</div>

            <div class="card-order-footer">
                <p class="product-price">₹${item["price"]}</p>
            </div>
        </div>
    </div>
        `;
  });

  checkoutBtn.innerHTML += total;

  checkoutBtn.addEventListener("click", () => {
    let date = "7/12/2020";
    fetch("http://localhost:5000/addOrders", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ date: date, price: total, status: "On the way" }),
    });

    products.innerHTML = "No orders";
    checkoutBtn.innerHTML = "Checkout";

    fetch("http://localhost:5000/delete", {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ data: "nothing" }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success"))
      .catch((err) => console.log(err));
  });
};
