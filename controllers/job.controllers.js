// * IMPORTS
const { successfulRes, unsuccessfulRes } = require('../lib/response');

// * CONTROLLERS
// Get a Single Job - GET: /api/v1/jobs/:id
async function getSingleJob(req, res) {
  // Send Successful Response
  return successfulRes({ res, data: {} });
}

// Get All Jobs - GET: /api/v1/jobs
async function getAllJobs(req, res) {
  // Send Successful Response
  return successfulRes({ res, data: {} });
}

// Create Single Job - POST: /api/v1/jobs
async function createNewJob(req, res) {
  // Send Successful Response
  return successfulRes({ res, status: 201, data: {} });
}

// Update Single Job - PATCH: /api/v1/jobs/:id
async function updateSingleJob(req, res) {
  // Send Successful Response
  return successfulRes({ res, data: {} });
}

// Delete Single Job - DELETE: /api/v1/jobs/:id
async function deleteSingleJob(req, res) {
  // Send Successful Response
  return successfulRes({ res, data: {} });
}

// * EXPORTS
module.exports = {
  getSingleJob,
  getAllJobs,
  createNewJob,
  updateSingleJob,
  deleteSingleJob,
};
