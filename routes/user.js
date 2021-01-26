var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {

   User.findOne({
        "username": req.body.username
    }, function (err, user) {
         if (err) return next(err);
          if (user) {
            return res.status(200).send({
                code: 101,
                message: 'Username already Exists..',
            })
        }
        else
        {
           User.create(req.body, function (err, post) {
               return res.status(200).send({
                code: 100,
                message: 'Sign Up Successfulyy.',
            })
              });
        }

    });



 
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
