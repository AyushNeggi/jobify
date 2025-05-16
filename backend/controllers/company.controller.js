import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";

//create company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "company is already registered with same company ",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    let user = await User.findById(req.id);
    user.profile.company = company;

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get company  by user id
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id company is to be searched
    const companies = await Company.find({ userId }).populate("userId", "fullname");        //replaces the user ID with the actual user's full name.
    if (!companies) {
      return res.status(404).json({
        message: "companies not found ",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get company by company id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    let logo;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location };
    if (logo) {
      updateData.logo = logo;
    }
    const companyId = req.params.id;
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,                       // ensures you get the updated version of the company in response.
    });
    if (!company) {
      return res.status(404).json({
        message: "company not found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "company information updated  ",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompany = async (req, res) => {
  try {
    let companyid = req.params.id;

    if (!companyid) {
      return res.status(404).json({
        message: "company not found ",
        success: false,
      });
    }

    await Job.deleteMany({ company: companyid }); //deleting all jobs of that company 

    await Company.findByIdAndDelete(companyid);
    return res.status(200).json({
      message: "company deleted ",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};