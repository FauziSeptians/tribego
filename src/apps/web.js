import express from "express";
import { publicRouter } from "../routes/public-router.js";
import bodyParser from "body-parser";
import multer from "multer";
import getData from "../../dummyData.js";
import { errorMiddleware } from "../middleware/errors-middleware.js";
import { connectDatabase } from "./db.js";
import methodOverride from "method-override";
import { verifyJWT } from "../middleware/auth-middleware.js";
import path, { dirname } from "path";
import fs from "fs";
import {RoleMiddleware} from "../middleware/role-middleware.js"

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
apps.use(bodyParser.urlencoded({ extended: true }));
apps.use(bodyParser.json());

apps.use(publicRouter);
apps.use(errorMiddleware);

apps.use(methodOverride("_method"));

apps.get("/api/images/:filename", (req, res) => {
  try {
    const filename = req.params.filename;

    const dir = "public/uploads/" + filename;

    console.log(dir);

    if (fs.existsSync(dir)) {
      const image = fs.readFileSync(dir);

      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(image, "binary");
    } else {
      return res.status(404).send({
        status: "404",
        message: "File gambar tidak ditemukan",
        additionalData: {},
      });
    }
  } catch (error) {
    return res.status(200).send({
      status: "404",
      message: error.message,
      additionalData: {},
    });
  }
});

// get data dummy
const myData = getData();
const users = myData.Users; // this is how to get data users

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
apps.get("/admin", verifyJWT, RoleMiddleware, admin);
apps.get("/admin/users", verifyJWT, RoleMiddleware, adminUsers);
apps.get("/admin/destinations", verifyJWT, RoleMiddleware, adminDestinations);
apps.get("/admin/services", verifyJWT, RoleMiddleware, adminServices);
apps.get("/admin/reviews", verifyJWT, RoleMiddleware, adminReviews);
apps.get("/admin/contact", verifyJWT, RoleMiddleware, adminContact);

// SERVICES
apps.post(
  "/service/create",
  upload.single("image"),
  verifyJWT,
  RoleMiddleware,
  createService
);
apps.patch(
  "/service/update/:id",
  upload.single("image"),
  verifyJWT,
  RoleMiddleware,
  updateService
);
apps.delete("/service/delete/:id", verifyJWT, RoleMiddleware, deleteService);

// DESTINATIONS
apps.post(
  "/destination/create",
  upload.single("image"),
  verifyJWT,
  RoleMiddleware,
  createDestination
);
apps.patch(
  "/destination/update/:id",
  upload.single("image"),
  verifyJWT,
  RoleMiddleware,
  updateDestination
);
apps.delete(
  "/destination/delete/:id",
  verifyJWT,
  RoleMiddleware,
  deleteDestination
);
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
