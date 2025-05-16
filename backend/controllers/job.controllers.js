import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//to create a job by recuiter
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, position, jobType, experience, companyId } = req.body;
    const userId = req.id;           //logged in user

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !companyId || !position) {
      return res.status(400).json({
        message: "something is missing ",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      experienceLevel: experience,
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "new job created",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// getting all jobs with filter
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    let query = {};
    if (keyword && keyword !== "undefined") {
      query = {
        $or: [{ title: { $regex: keyword, $options: "i" } }, { description: { $regex: keyword, $options: "i" } }],   //$regex lets MongoDB search text patterns  $options: "i" makes it case-insensitive
      };
    }

    const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });                    //.sort({ createdAt: -1 }) ➝ Newest jobs show first (descending order)
  
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//searching job by student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;                                 //You’re fetching a specific job using its ID (from the URL)
    const job = await Job.findById(jobId).populate({            //each job have information about application but we need information about applicant
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//recuiter or admin created job
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({          // all information about company that posted that job will be shared
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    await Application.deleteMany({ job: jobId }); //deleting all applications for this job

    await Job.findByIdAndDelete(jobId); // Delete the job

    return res.status(200).json({
      success: true,
      message: "Job  deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};