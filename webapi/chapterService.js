const Chapter = require('../models/chapter');
const Reference = require('../models/reference');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//GET ALL CHAPTERS
router.get('/allChapters', (req, res, next) => {
    Chapter.find({}, (err, chapterList) => {
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(200).json({
            success: true,
            chapterList: chapterList
        });
    });
});
//REGISTER
router.post('/register', (req, res, next) => {
    Reference.findById(req.body.referenceId, (err, referenceById) => {
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        var newchapter = new Chapter({
            title: req.body.title,
            reference: referenceById
        });
        newchapter.save((err, chapterSaved) => {

            if(err){
                return res.status(500).json({
                    title: 'An error ocurred',
                    error: err
                });
            }

            referenceById.chapters.push(chapterSaved);

            referenceById.save((err, referenceSaved) => {
                if(err){
                    return res.status(500).json({
                        title: 'An error ocurred',
                        error: err
                    });
                }
                res.status(200).json({
                    success: true,
                    reference: referenceSaved
                });
            });
        });
    });
});
//DELETE CHAPTER
router.delete('/remove/:id', (req, res, next) => {
  Chapter.findById(req.params.id, (err, chapter) => {
      if(err){
          return res.status(500).json({
              title: 'An error ocurred',
              error: err
          });
      }
      if(!chapter){
          return res.status(500).json({
              title: 'No Reference found!',
              error: err
          });
      }
      chapter.remove( (err, result) => {
        if(err){
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(200).json({
            success: true,
            chapter: result
        });
      });
  })
});

module.exports = router;
