import express from "express";
import { publicRouter } from "../routes/public-router.js";
import bodyParser from "body-parser";
import multer from "multer";
import getData from "../../dummyData.js";
import { errorMiddleware } from "../middleware/errors-middleware.js";
import { connectDatabase } from "./db.js";
import methodOverride from "method-override";
import { destinationController } from "../controllers/destination-controller.js";
import { servicesController } from "../controllers/services-controller.js";
import { reviewController } from "../controllers/review-controller.js";
import { userController } from "../controllers/user-controllers.js";
import { galleryController } from "../controllers/gallery-controller.js";
import { bookController } from "../controllers/book-controller.js";
import { verifyLogin } from "../middleware/auth-middleware.js";
import path, { dirname } from "path";
import fs from "fs";
import { RoleMiddleware } from "../middleware/role-middleware.js";
import session from "express-session";
import { UserServices } from "../services/user-services.js";
import { DestinationServices } from "../services/destination-services.js";
import { contactController } from "../controllers/contact-controller.js";
import { BookServices } from "../services/book-services.js";

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

apps.use(
  session({
    secret: "secret",
    // resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

apps.use((req, res, next) => {
  res.locals = {
    ...res.locals,
    userId: req.session.userId || null,
    userName: req.session.userName || null,
    userEmail: req.session.userEmail || null,
    userRole: req.session.userRole || null,
    isLogin: req.session.isLogin || false,
  };

  next();
});

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
apps.get("/destination/:id", destinationDetail);
apps.get("/books", verifyLogin, bookings);
apps.get("/reviews", reviews);
apps.get("/contact", contact);

// ADMIN
const routerAdminPage = "admin/pages/";

apps.get("/admin", verifyLogin, RoleMiddleware, admin);
apps.get("/admin/users", verifyLogin, RoleMiddleware, adminUsers);
apps.get("/admin/destinations", verifyLogin, RoleMiddleware, adminDestinations);
apps.get("/admin/services", verifyLogin, RoleMiddleware, adminServices);
apps.get("/admin/bookings", verifyLogin, RoleMiddleware, adminBooking);
// apps.get("/admin/gallery", verifyLogin, RoleMiddleware, adminGallery);
apps.get("/admin/reviews", verifyLogin, RoleMiddleware, adminReviews);
apps.get("/admin/contact", verifyLogin, RoleMiddleware, adminContact);

apps.post("/login", login);
apps.post("/register", register);
apps.get("/logout", logout);

// END ROUTES

// METHODS
async function home(req, res) {
  try {
    const dataD = await destinationController.getDestination();

    const filterThreeArray = dataD.slice(0, 3);

    function rupiah(num) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      })
        .format(num)
        .replace("Rp", "Rp ");
    }

    const filterData = filterThreeArray.map((item) => {
      return {
        ...item,
        Price: rupiah(item.Price),
        Promo: rupiah(item.Promo),
        TotalRupiah: rupiah(item.Price - item.Promo),
      };
    });

    res.render("index", {
      dataServices: await servicesController.getServices(),
      dataGallery: await galleryController.getGallery(),
      dataDestination: filterData,
    });
  } catch (error) {
    res.render("index", {
      dataServices: undefined,
      dataGallery: undefined,
      dataDestination: undefined,
      message: error.message,
    });
  }
}

async function destinations(req, res) {
  const data = await destinationController.getDestination();

  function rupiah(num) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(num)
      .replace("Rp", "Rp ");
  }

  console.log(data);

  const filterData = data.map((item) => {
    return {
      ...item,
      Price: rupiah(item.Price),
      Promo: rupiah(item.Promo),
      TotalRupiah: rupiah(item.Price - item.Promo),
    };
  });

  console.log(filterData);
  res.render("users/pages/Destinations/index", {
    data: filterData,
  });
}

async function destinationDetail(req, res) {
  const id = req.params.id;
  const data = await DestinationServices.getDestinationById(id);

  console.log(data);
  res.render("users/pages/Destinations/index", {
    data: data,
  });
}

async function bookings(req, res) {
  try {
    const data = await BookServices.getBookByIdUser(req.session.userId);

    console.log(data);
    let Images = [];
    data.data.map((item, idx) => {
      data.Destination.map((items) => {
        console.log(items.Title == item.destinationName);
        if (items.Title == item.destinationName) {
          data.data[idx].Images = items.Images;
          Images.push(items.Images);
        }
        return;
      });
      return;
    });

    console.log(data.data);
    console.log(Images);

    console.log("test99");
    console.log(data.data);
    console.log(data);
    console.log(data.length);

    res.render("users/pages/Bookings/index", {
      data: data.length == 0 ? [] : data.data,
      Images: Images,
      message: undefined,
      error: false,
    });
  } catch (error) {
    res.render("users/pages/Bookings/index", {
      message: error.message,
    });
  }
}

async function reviews(req, res) {
  res.render("users/pages/Reviews/index", {
    data: await reviewController.getReviews(),
  });
}

async function contact(req, res) {
  res.render("users/pages/Contact/index", {
    data: myData.Destinations,
  });
}

function admin(req, res) {
  const user = res.locals.user;

  console.log(user);

  res.render("admin/index", { data: myData.Users, user });
}

async function adminUsers(req, res) {
  res.render(`${routerAdminPage}Users/index`, {
    data: await userController.getUsers(),
  });
}

async function adminDestinations(req, res) {
  res.render(`${routerAdminPage}Destinations/index`, {
    data: await destinationController.getDestination(),
  });
}

async function adminServices(req, res) {
  res.render(`${routerAdminPage}Services/index`, {
    data: await servicesController.getServices(),
  });
}

async function adminGallery(req, res) {
  res.render(`${routerAdminPage}Gallery/index`, {
    data: await galleryController.getGallery(),
  });
}

async function adminBooking(req, res) {
  const data = await bookController.getBook();
  console.log(data);
  res.render(`${routerAdminPage}Bookings/index`, {
    data: data,
  });
}

async function adminReviews(req, res) {
  const data = await reviewController.getReviews();
  console.log(data);
  res.render(`${routerAdminPage}Reviews/index`, {
    data: data,
  });
}

async function adminContact(req, res) {
  res.render(`${routerAdminPage}Contact/index`, {
    data: await contactController.getContact(),
  });
}

async function login(req, res) {
  try {
    const data = await UserServices.login(req.body);

    if (data) {
      req.session.userId = data._id;
      req.session.userEmail = data.email;
      req.session.userName = data.name;
      req.session.userRole = data.Role;

      res.redirect("/");
      return;
    } else {
      res.redirect("/login");
      return;
    }
  } catch (error) {
    res.redirect("/");
  }
}

async function register(req, res) {
  console.log(req.body);

  const data = await UserServices.create(req.body);

  if (data) {
    req.session.userId = data._id;
    req.session.userEmail = data.email;
    req.session.userName = data.name;
    req.session.userRole = data.Role;

    res.redirect("/");
  } else {
    res.redirect("/login");
    return;
  }
}

async function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}
