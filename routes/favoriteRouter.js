const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");

const cors = require("./cors");
const favoriteRouter = express.Router();

favoriteRouter
   .route("/")
   .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
   .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
      Favorite.find({ user: req.user._id })
         .populate("user")
         .populate("favorite")
         .then((favorite) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(favorite);
         })
         .catch((err) => next(err));
   })
   .post(
      cors.corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      (req, res, next) => {
         Favorite.findOne({ user: req.user._id }).then((favorite) => {
            if (favorite) {
               req.body.array.forEach((fave) => {
                  if (!favorite.campsites.includes(fave._id)) {
                     favorite.campsites.push(fave._id);
                  }
               });
               favorite
                  .save()
                  .then((favorite) => {
                     res.statusCode = 200;
                     res.setHeader("Content-Type", "application/json");
                     res.json(favorite);
                  })
                  .catch((err) => next(err));
            } else {
               Favorite.create({ user: req.user._id }).then((favorite) => {
                  req.body.array.forEach((fave) => {
                     if (!favorite.campsites.includes(fave._id)) {
                        favorite.campsites.push(fave._id);
                     }
                  });
                  favorite
                     .save()
                     .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(favorite);
                     })
                     .catch((err) => next(err));
               });
            }
         });
      }
   )
   .delete(
      cors.corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      (req, res, next) => {}
   );

favoriteRouter
   .route("/:campsiteId")
   .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
   .get(cors.cors, authenticate.verifyUser, (req, res) => {
      res.statusCode = 403;
      res.setHeader("Content-Type", "application/json");
      res.end(`Get operations Not supported`);
   })
   .post(
      cors.corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      (req, res, next) => {}
   )
   .delete(
      cors.corsWithOptions,
      authenticate.verifyUser,
      authenticate.verifyAdmin,
      (req, res, next) => {}
   );

module.exports = favoriteRouter;