// * IMPORTS
const Job = require('../models/Job.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');

// * CONTROLLERS
// Get a Single Job - GET: /api/v1/jobs/:id
async function getSingleJob(req, res) {
  // Grab the job id from req
  const { id: jobId } = req.params;

  const foundJob = await Job.findById(jobId);

  // Send Successful Response
  return successfulRes({
    res,
    data: {
      job: {
        title: foundJob.title,
        description: foundJob.description,
        status: foundJob.status,
      },
    },
  });
}

// Get All Jobs - GET: /api/v1/jobs
async function getAllJobs(req, res) {
  // Find the jobs
  const allJobs = await Job.find({ author: req.user.id }).sort('createdAt');

  // Send Successful Response
  return successfulRes({
    res,
    data: {
      jobs: allJobs,
      count: allJobs.length,
    },
  });
}

// Create Single Job - POST: /api/v1/jobs
async function createNewJob(req, res) {
  // Create a job in the database
  const newJob = await Job.create({
    ...req.body,
    author: req.user.id,
  });

  // Send Successful Response
  return successfulRes({
    res,
    status: 201,
    data: {
      job: newJob,
    },
  });
}

// Update Single Job - PATCH: /api/v1/jobs/:id
async function updateSingleJob(req, res) {
  // Get the job id and the author id from the request
  const {
    params: { id: jobId },
    user: { id: authorId },
    body: { title, description, status },
  } = req;

  if (!title && !description && !status) {
    return unsuccessfulRes({ res, message: 'What are we updating here?' });
  }

  // Update the job in the database
  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId, author: authorId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  // Send Successful Response
  return successfulRes({
    res,
    data: {
      job: updatedJob,
    },
  });
}

// Delete Single Job - DELETE: /api/v1/jobs/:id
async function deleteSingleJob(req, res) {
  // Get the jobId and authorId
  const {
    user: { id: authorId },
    params: { id: jobId },
  } = req;

  // Delete Job from Database
  const deletedJob = await Job.findOneAndDelete({
    _id: jobId,
    author: authorId,
  });

  // Send Successful Response
  return successfulRes({
    res,
    data: {
      job: deletedJob,
    },
  });
}

// * EXPORTS
module.exports = {
  getSingleJob,
  getAllJobs,
  createNewJob,
  updateSingleJob,
  deleteSingleJob,
};
