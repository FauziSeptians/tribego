import express from "express";

export const publicRouter = express.Router();

publicRouter.get("/test", (req, res) => {
   return res.status(200).send({
      message: "test",
   });
});


