const Reference = require('../models/reference');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//SEED DATA
router.get('/setUpReference', (req, res, next) => {
    var firstReference = [{
            name : 'Java 7 Reference',
            description : 'reference description'
        }];
    Reference.create(firstReference, (err, results) => {
      if(err){
          return res.status(500).json({
              title: 'An error ocurred',
              error: err
          });
      }
      res.status(200).json({
          success: true,
          references: results
      });
    });
});
//GET ALL REFERENCES NO CHAPTERS
router.get('/all', (req, res, next) => {
    Reference.find({}, (err, poemList) => {
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(200).json({
            success: true,
            references: poemList
        });
    });
});
//GET ALL REFERENCES WITH CHAPTERS EMBEDED
router.get('/allReferences', (req, res, next) => {
    Reference.find()
        .populate('chapters', 'title')
        .exec( (err, result) => {
            if(err){
                return res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }
            res.status(200).json({
                success: true,
                obj: result
            });
    });
});
//REGISTER REFERENCE
router.post('/register', (req, res, next) => {
    let newReference = new Reference({
         name: req.body.name,
         description: req.body.description
    });

    newReference.save( (err, result) => {
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(200).json({
            success: true,
            obj: result
        });
    });
});
//UPDATE REFERENCE
router.post('/modify',(req, res, next) => {
    Reference.findByIdAndUpdate( req.body.id, {
              name: req.body.name,
              description: req.body.description
          }, function(err, course){
            if(err){
                return res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }
            res.status(200).json({
              success: true,
              msg: 'Reference updated!'});
          });
});
//FIND REFERENCE BY ID
router.get('/referenceById/:id', (req, res, next) => {
   Reference.findById({ _id: req.params.id}, (err, result) => {
       if(err){
           return res.status(500).json({
               title: 'An error ocurred',
               error: err
           });
       }
       res.status(200).json({
         success: true,
         obj: result
       });
   });
});
//DELETE REFERENCE
router.delete('/drop/:id',(req, res, next) => {
   Reference.findById({ _id: req.params.id}, (err, reference) => {
       if(err){
           return res.status(500).json({
               title: 'An error ocurred',
               error: err
           });
       }
       if(!reference){
         return res.status(500).json({
             title: 'No Reference found',
             error: { message: 'Reference not found!'}
         });
       }
       reference.remove((err, result) => {
         if(err){
             return res.status(500).json({
                 title: 'An error ocurred',
                 error: err
             });
         }
         res.status(200).json({
           success: true,
           obj: result
         });
       });

   });
});

module.exports = router;
