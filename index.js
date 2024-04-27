const express = require("express");
const app = express();
const port = 3000;

// get data dummy
const data = require("./dummyData");
const myData = data.getData();
const users = myData.Users; // this is how to get data users
// get data dummy

app.set("view engine", "ejs");

app.use(express.static("public"));

// ROUTES
// USER
app.get("/", home);

// ADMIN
const routerAdminPage = "admin/pages/";
app.get("/admin", admin);
app.get("/admin/users", adminUsers);
app.get("/admin/destinations", adminDestinations);
app.get("/admin/reviews", adminReviews);
app.get("/admin/contact", adminContact);
// END ROUTES

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

// METHODS
function home(req, res) {
  res.render("index");
}
function admin(req, res) {
  res.render("admin/index", { data: myData.Users });
}

function adminUsers(req, res) {
  res.render(`${routerAdminPage}Users/index`, { data: myData.Users });
}

function adminDestinations(req, res) {
  res.render(`${routerAdminPage}Destinations/index`, {
    data: myData.Destinations,
  });
}

function adminReviews(req, res) {
  res.render(`${routerAdminPage}Reviews/index`, { data: myData.Reviews });
}

function adminContact(req, res) {
  res.render(`${routerAdminPage}Contact/index`, { data: myData.Contact });
}
