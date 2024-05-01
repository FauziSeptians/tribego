import express from "express";
import { publicRouter } from "../routes/public-router.js";
import bodyParser from "body-parser";
import multer from "multer";
import getData from "../../dummyData.js";
import { errorMiddleware } from "../middleware/errors-middleware.js";
import { connectDatabase } from "./db.js";
import methodOverride from "method-override";

export const apps = express();

connectDatabase();

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

apps.use(bodyParser.json());
apps.use(bodyParser.urlencoded({ extended: true }));

apps.use(publicRouter);
apps.use(errorMiddleware);
apps.use(bodyParser.urlencoded({ extended: true }));
apps.use(bodyParser.json());
apps.use(methodOverride("_method"));

// get data dummy
const myData = getData();
const users = myData.Users; // this is how to get data users
// get data dummy

apps.set("view engine", "ejs");

apps.use(express.static("public"));

// ROUTES
// USER
apps.get("/", home);
apps.get("/destinations", destinations);
apps.get("/reviews", reviews);
apps.get("/contact", contact);

// ADMIN
const routerAdminPage = "admin/pages/";
apps.get("/admin", admin);
apps.get("/admin/users", adminUsers);
apps.get("/admin/destinations", adminDestinations);
apps.get("/admin/services", adminServices);
apps.get("/admin/reviews", adminReviews);
apps.get("/admin/contact", adminContact);

// SERVICES
apps.post("/service/create", upload.single("image"), createService);
apps.patch("/service/update/:id", upload.single("image"), updateService);
apps.delete("/service/delete/:id", deleteService);

// DESTINATIONS
apps.post("/destination/create", upload.single("image"), createDestination);
apps.patch(
  "/destination/update/:id",
  upload.single("image"),
  updateDestination
);
apps.delete("/destination/delete/:id", deleteDestination);
// END ROUTES

// METHODS
function home(req, res) {
  res.render("index");
}

function destinations(req, res) {
  res.render("users/pages/Destinations/index", {
    data: myData.Destinations,
  });
}

function reviews(req, res) {
  res.render("users/pages/Reviews/index", {
    data: myData.Reviews,
  });
}

function contact(req, res) {
  res.render("users/pages/Contact/index", {
    data: myData.Destinations,
  });
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

function adminServices(req, res) {
  res.render(`${routerAdminPage}Services/index`, { data: myData.Services });
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

function findByIdDestination(req, res) {
  const id = req.params.id;
  const destination = myData.Destinations.find((destination) => {
    return destination.id == id;
  });

  console.log(destination);

  return destination;
}

function updateDestination(req, res) {
  const title = req.body.createTitle;
  const location = req.body.createLocation;
  const description = req.body.createDescription;
  const price = req.body.createPrice;
  const promo = req.body.createPromo;
  const id = req.params.id;

  if (req.file) {
    // memberikan kondisi jika ada file ubah path di database menjadi yang baru, kalau misal gaada tetap pakai url image sebelumnya
  }

  const imagePath = req.file.path;

  // OLAH AJA DISINI UPDATE NYA
}

function deleteDestination(req, res) {
  const id = req.params.id;
  console.log(id);
}

function createService(req, res) {
  const title = req.body.createTitle;
  const description = req.body.createDescription;

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = req.file.path;

  const newService = {
    id: myData.Services.length + 1,
    title: title,
    description: description,
    imagePath: imagePath,
  };

  console.log(newService);
}

function updateService(req, res) {
  const title = req.body.createTitle;
  const description = req.body.createDescription;
  const id = req.params.id;

  if (req.file) {
    // memberikan kondisi jika ada file ubah path di database menjadi yang baru, kalau misal gaada tetap pakai url image sebelumnya
  }

  const imagePath = req.file.path;

  // OLAH AJA DISINI UPDATE NYA
}

function deleteService(req, res) {
  const id = req.params.id;
  console.log(id);
}
