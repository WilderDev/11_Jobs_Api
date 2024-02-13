// * IMPORTS
const router = require('express').Router();

const {
  getSingleJob,
  getAllJobs,
  createNewJob,
  updateSingleJob,
  deleteSingleJob,
} = require('../controllers/job.controllers.js');

// * ROUTES
// GET Single Job
router.get('/:id', getSingleJob);

// GET All Jobs
router.get('/', getAllJobs);

// POST Single Job
router.post('/', createNewJob);

// PATCH Single Job
router.patch('/:id', updateSingleJob);

// DELETE Single Job
router.delete('/:id', deleteSingleJob);

// * EXPORTS
module.exports = router;
