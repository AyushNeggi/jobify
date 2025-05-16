import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//apply for job
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "job id is required ",
        success: false,
      });
    }

    //check user  already applied or not
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for this job ",
        success: false,
      });
    }

    //check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: " job not found",
        success: false,
      });
    }

    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);          //You're adding the newly created application’s ID into the applications array of the Job.
    await job.save();

    return res.status(200).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//all jobs applied by user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({                                                 //info about job    
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {                                               //info about company  =>nested populate      
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(400).json({
        message: "no application ",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for admin to check how many applicants applied for job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      succees: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//changing of status either rejected or accepted
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantionId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required ",
        success: false,
      });
    }
    const application = await Application.findById(applicantionId); //find application by applicant id
    if (!application) {
      return res.status(400).json({
        message: "application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: ` your application is ${status}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};