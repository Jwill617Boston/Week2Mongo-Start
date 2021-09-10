const express = require("express");
const Partner = require("../models/partner");

const partnerRouter = express.Router();

partnerRouter
   .route("/")
   .get((req, res, next) => {
      Partner.find()
         .then((Partner) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(Partner);
         })
         .catch((err) => next(err));
   })
   .post((req, res, next) => {
      Partner.create(req.body)
         .then((Partner) => {
            console.log("Partner Created ", Partner);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(Partner);
         })
         .catch((err) => next(err));
   })
   .put((req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /Partner");
   })
   .delete((req, res, next) => {
      Partner.deleteMany()
         .then((response) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(response);
         })
         .catch((err) => next(err));
   });

partnerRouter
   .route("/:partnerId")
   .get((req, res, next) => {
      Partner.findById(req.params.partnerId)
         .then((Partner) => {
            if (Partner) {
               res.statusCode = 200;
               res.setHeader("Content-Type", "application/json");
               res.json(Partner.comments);
            } else {
               err = new Error(`Partner ${req.params.partnerId} not found`);
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   })
   .post((req, res, next) => {
      Partner.findById(req.params.partnerId)
         .then((Partner) => {
            if (Partner) {
               Partner.comments.push(req.body);
               Partner.save()
                  .then((Partner) => {
                     res.statusCode = 200;
                     res.setHeader("Content-Type", "application/json");
                     res.json(Partner);
                  })
                  .catch((err) => next(err));
            } else {
               err = new Error(`Partner ${req.params.partnerId} not found`);
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   })
   .put((req, res) => {
      res.statusCode = 403;
      res.end(
         `PUT operation not supported on /partners/${req.params.partnerId}/comments`
      );
   })
   .delete((req, res, next) => {
      Partner.findById(req.params.partnerId)
         .then((Partner) => {
            if (Partner) {
               for (let i = Partner.comments.length - 1; i >= 0; i--) {
                  Partner.comments.id(Partner.comments[i]._id).remove();
               }
               Partner.save()
                  .then((Partner) => {
                     res.statusCode = 200;
                     res.setHeader("Content-Type", "application/json");
                     res.json(Partner);
                  })
                  .catch((err) => next(err));
            } else {
               err = new Error(`Partner ${req.params.partnerId} not found`);
               err.status = 404;
               return next(err);
            }
         })
         .catch((err) => next(err));
   });



module.exports = partnerRouter;
