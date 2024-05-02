import express from "express";
import { userController } from "../controllers/user-controllers.js";
import { galleryController } from "../controllers/gallery-controller.js";
import multer from "multer";
import { destinationController } from "../controllers/destination-controller.js";
import { servicesController } from "../controllers/services-controller.js";
import { reviewController } from "../controllers/review-controller.js";
import { bookController } from "../controllers/book-controller.js";
import { contactController } from "../controllers/contact-controller.js";

export const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const publicRouter = express.Router();
const uploadImage = multer({ storage: storage2 });

publicRouter.post("/test", (req, res) => {
  return res.status(200).send({
    message: "test",
  });
});

// -- User
publicRouter.post("/api/create/user", userController.create);
publicRouter.get("/api/users", userController.getUsers);
publicRouter.post("/api/verify/user", userController.login);
publicRouter.put("/api/update/user/:id", userController.update);
publicRouter.delete("/api/users/:id", userController.deleteUsers);

// -- Gallery
publicRouter.post(
  "/api/galleries",
  uploadImage.single("galleryImage"),
  galleryController.create
);
publicRouter.get("/api/galleries", galleryController.getGallery);
publicRouter.put(
  "/api/update/galleries/:id",
  uploadImage.single("galleryImage"),
  galleryController.update
);
publicRouter.delete("/api/galleries/:id", galleryController.deleteGallery);

// -- Destination
publicRouter.get("/api/destinations", destinationController.getDestination);
publicRouter.post(
  "/api/create/destinations",
  uploadImage.single("galleryImage"),
  destinationController.create
);
publicRouter.put(
  "/api/update/destinations/:id",
  uploadImage.single("galleryImage"),
  destinationController.update
);
publicRouter.delete(
  "/api/destinations/:id",
  destinationController.deleteDestination
);

// -- Services
publicRouter.post(
  "/api/create/services",
  uploadImage.single("galleryImage"),
  servicesController.create
);

publicRouter.get("/api/services", servicesController.getServices);
publicRouter.delete("/api/services/:id", servicesController.deleteServices);
// publicRouter.use(uploadImage.array());
publicRouter.put(
  "/api/update/services/:id",
  uploadImage.single("galleryImage"),
  servicesController.update
);

// -- review
publicRouter.post("/api/create/review", reviewController.create);
publicRouter.get("/api/review", reviewController.getReviews);
publicRouter.delete("/api/review/:id", reviewController.deleteReview);
publicRouter.put("/api/review/:id", reviewController.update);

// -- Booked
publicRouter.post("/api/create/book", bookController.create);
publicRouter.get("/api/book", bookController.getBook);
publicRouter.delete("/api/book/:id", bookController.deleteBook);
publicRouter.put("/api/update/book/:id", bookController.update);

//  -- Contact
publicRouter.post("/api/contact", contactController.create);
publicRouter.get("/api/contact", contactController.getContact);
publicRouter.delete("/api/contact/:id", contactController.deleteContact);
