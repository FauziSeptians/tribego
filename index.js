const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get data dummy
const data = require("./dummyData");
const myData = data.getData();
const users = myData.Users; // this is how to get data users
// get data dummy

app.set("view engine", "ejs");

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

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

const upload = multer({ storage: storage });

app.post(
  "/destination/create",
  upload.single("createImage"),
  createDestination
);
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

function createDestination(req, res) {
  const title = req.body.createTitle;
  const location = req.body.createLocation;
  const description = req.body.createDescription;
  const price = req.body.createPrice;
  const promo = req.body.createPromo;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = req.file.path;

  const newDestination = {
    id: myData.Destinations.length + 1,
    title: title,
    location: location,
    description: description,
    price: price,
    promo: promo,
    imagePath: imagePath,
  };

  console.log(newDestination);
}
