const express = require("express");
const partner = require("../models/partner");

const partnerRouter = express.Router();

partnerRouter
   .route("/")
   .get((req, res, next) => {
      partner
         .find()
         .then((partner) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(partner);
         })
         .catch((err) => next(err));
   })
   .post((req, res, next) => {
      partner
         .create(req.body)
         .then((partner) => {
            console.log("partner Created ", partner);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(partner);
         })
         .catch((err) => next(err));
   })
   .put((req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /partner");
   })
   .delete((req, res, next) => {
      partner
         .deleteMany()
         .then((response) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(response);
         })
         .catch((err) => next(err));
   });

partnerRouter
   //   ":" req.params.data = React data
   .route("/:partnerId")
   .all((req, res, next) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      next();
   })
   .get((req, res) => {
      res.end(
         `Will send details of the partner: ${req.params.partnerId} to you`
      );
   })
   .post((req, res) => {
      res.statusCode = 403;
      res.end(
         `POST operation not supported on /partner/${req.params.partnerId}`
      );
   })
   .put((req, res) => {
      res.write(`Updating the partner: ${req.params.partnerId}\n`);
      res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
   })
   .delete((req, res) => {
      res.end(`Deleting partner: ${req.params.partnerId}`);
   });

module.exports = partnerRouter;
