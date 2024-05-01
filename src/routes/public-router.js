import express from "express";
import { userController } from "../controllers/user-controllers.js";
import { galleryController } from "../controllers/gallery-controller.js";
import multer from "multer";

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

publicRouter.get("/test", (req, res) => {
  return res.status(200).send({
    message: "test",
  });
});

// -- User
publicRouter.post("/api/create/user", userController.create);
publicRouter.get("/api/users", userController.getUsers);
publicRouter.post("/api/verify/user", userController.login);
publicRouter.put("/api/update/user/:id", userController.update);
publicRouter.delete("/api/user/:id", userController.deleteUsers);

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
