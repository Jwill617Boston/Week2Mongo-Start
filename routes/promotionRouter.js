const express = require("express");
const promotion = require("../models/promotion");

const promotionRouter = express.Router();

promotionRouter
   .route("/")
   .get((req, res, next) => {
      promotion
         .find()
         .then((promotions) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(promotions);
         })
         .catch((err) => next(err));
   })
   .post((req, res, next) => {
      promotion
         .create(req.body)
         .then((promotion) => {
            console.log("promotion Created ", promotion);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(promotion);
         })
         .catch((err) => next(err));
   })
   .put((req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /promotions");
   })
   .delete((req, res, next) => {
      promotion
         .deleteMany()
         .then((response) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(response);
         })
         .catch((err) => next(err));
   });

promotionRouter
   //   ":" req.params.data = React data
   .route("/:promotionId")
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      next();
   })
   .get((req, res) => {
      res.end(
         `Will send details of the promotion: ${req.params.promotionId} to you`
      );
   })
   .post((req, res) => {
      res.statusCode = 403;
      res.end(
         `POST operation not supported on /promotion/${req.params.promotionId}`
      );
   })
   .put((req, res) => {
      res.write(`Updating the promotion: ${req.params.promotionId}\n`);
      res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
   })
   .delete((req, res) => {
      res.end(`Deleting promotion: ${req.params.promotionId}`);
   });

module.exports = promotionRouter;
