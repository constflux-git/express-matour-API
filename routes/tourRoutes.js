const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.postATour);
router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.editATour)
  .delete(tourController.deleteATour);

module.exports = router;
