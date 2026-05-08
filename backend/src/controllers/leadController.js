import {
  createLead as createLeadRecord,
  deleteLeadById,
  getAllLeads,
  getLeadById,
  updateLeadById,
} from "../models/leadModel.js";

export const createLead = async (req, res) => {
  try {
    const result = await createLeadRecord(req.body);

    res.status(201).json({
      success: true,
      message: "Lead created",
      data: {
        id: result.insertId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await getAllLeads(req.query);

    res.json({
      success: true,
      message: "Leads fetched",
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await getLeadById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Lead fetched",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//update lead
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    await updateLeadById(id, req.body);

    res.json({
      success: true,
      message: "Lead updated",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//delete lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteLeadById(id);

    res.json({
      success: true,
      message: "Lead deleted",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
