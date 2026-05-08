import pool from "../config/db.js";

export const createLead = async (leadData) => {
  const {
    lead_name,
    company_name,
    email,
    phone,
    lead_source,
    salesperson,
    status,
    deal_value,
  } = leadData;

  const [result] = await pool.query(
    `INSERT INTO leads
    (
      lead_name,
      company_name,
      email,
      phone,
      lead_source,
      salesperson,
      status,
      deal_value
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      lead_name,
      company_name,
      email,
      phone,
      lead_source,
      salesperson,
      status,
      deal_value,
    ],
  );

  return result;
};

export const getLeadById = async (id) => {
  const [leads] = await pool.query("SELECT * FROM leads WHERE id = ?", [id]);

  return leads[0] ?? null;
};

export const getAllLeads = async (filters = {}) => {
  const { status, lead_source, salesperson, search } = filters;
  const conditions = [];
  const values = [];

  if (status) {
    conditions.push("status = ?");
    values.push(status);
  }

  if (lead_source) {
    conditions.push("lead_source = ?");
    values.push(lead_source);
  }

  if (salesperson) {
    conditions.push("salesperson = ?");
    values.push(salesperson);
  }

  if (search) {
    conditions.push(
      "(lead_name LIKE ? OR company_name LIKE ? OR email LIKE ?)",
    );
    const searchValue = `%${search}%`;
    values.push(searchValue, searchValue, searchValue);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const [leads] = await pool.query(
    `SELECT * FROM leads ${whereClause} ORDER BY created_at DESC`,
    values,
  );

  return leads;
};

export const updateLeadById = async (id, leadData) => {
  const {
    lead_name,
    company_name,
    email,
    phone,
    lead_source,
    salesperson,
    status,
    deal_value,
  } = leadData;

  await pool.query(
    `UPDATE leads
     SET
      lead_name = ?,
      company_name = ?,
      email = ?,
      phone = ?,
      lead_source = ?,
      salesperson = ?,
      status = ?,
      deal_value = ?
     WHERE id = ?`,
    [
      lead_name,
      company_name,
      email,
      phone,
      lead_source,
      salesperson,
      status,
      deal_value,
      id,
    ],
  );
};

export const deleteLeadById = async (id) => {
  await pool.query("DELETE FROM leads WHERE id = ?", [id]);
};
