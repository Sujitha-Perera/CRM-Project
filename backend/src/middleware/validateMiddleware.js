export const validateLead = (req, res, next) => {
  const requiredFields = [
    "lead_name",
    "company_name",
    "email",
    "phone",
    "lead_source",
    "salesperson",
    "status",
    "deal_value",
  ];

  const missingFields = requiredFields.filter(
    (field) => !req.body[field] && req.body[field] !== 0,
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  next();
};

export const validateNote = (req, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  next();
};
