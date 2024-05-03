// import { bodyParser } from "body-parser";
// import { multer } from "multer";
// import { apps } from "../apps/web.js";

// apps.use(bodyParser.urlencoded({ extended: true }));
// apps.use(bodyParser.json());

// // get data dummy
// const data = require("./dummyData");
// const myData = data.getData();
// const users = myData.Users; // this is how to get data users
// // get data dummy

// apps.set("view engine", "ejs");

// apps.use(express.static("public"));

// const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//       cb(null, "public/uploads/");
//    },
//    filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//    },
// });

// // ROUTES
// // USER
// apps.get("/", home);

// // ADMIN
// const routerAdminPage = "admin/pages/";
// apps.get("/admin", admin);
// apps.get("/admin/users", adminUsers);
// apps.get("/admin/destinations", adminDestinations);
// apps.get("/admin/reviews", adminReviews);
// apps.get("/admin/contact", adminContact);

// const upload = multer({ storage: storage });

// apps.post(
//    "/destination/create",
//    upload.single("createImage"),
//    createDestination
// );
// // END ROUTES

// // METHODS
// function home(req, res) {
//    res.render("index");
// }
// function admin(req, res) {
//    res.render("admin/index", { data: myData.Users });
// }

// function adminUsers(req, res) {
//    res.render(`${routerAdminPage}Users/index`, { data: myData.Users });
// }

// function adminDestinations(req, res) {
//    res.render(`${routerAdminPage}Destinations/index`, {
//       data: myData.Destinations,
//    });
// }

// function adminReviews(req, res) {
//    res.render(`${routerAdminPage}Reviews/index`, { data: myData.Reviews });
// }

// function adminContact(req, res) {
//    res.render(`${routerAdminPage}Contact/index`, { data: myData.Contact });
// }

// function createDestination(req, res) {
//    const title = req.body.createTitle;
//    const location = req.body.createLocation;
//    const description = req.body.createDescription;
//    const price = req.body.createPrice;
//    const promo = req.body.createPromo;

//    if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//    }

//    const imagePath = req.file.path;

//    const newDestination = {
//       id: myData.Destinations.length + 1,
//       title: title,
//       location: location,
//       description: description,
//       price: price,
//       promo: promo,
//       imagePath: imagePath,
//    };

//    console.log(newDestination);
// }
