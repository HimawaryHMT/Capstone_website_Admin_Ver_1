const connection = require("../config/database"); // Kết nối MySQL
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");

// ================== GET ALL USERS ==================
const getAllUsers = (req, res) => {
  const query =
    "SELECT user_id, full_name, phone, email, status, created_at, updated_at FROM `USERs`";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const users = (results || []).map((u) => ({
      id: u.user_id,
      name: u.full_name,
      email: u.email,
      phone: u.phone,
      status: u.status,
      created_at: u.created_at,
      updated_at: u.updated_at,
    }));

    res.status(200).json(users);
  });
};
// DONE


// ================== GET USER BY ID ==================
const getUserById = (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT user_id, full_name, phone, email, status, created_at, updated_at FROM `USERs` WHERE user_id = ? LIMIT 1";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    res.status(200).json({
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  });
};

// -------------------- UPDATE USER --------------------
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password, status } = req.body;

  try {
    // If password provided, hash it
    let hashed = null;
    if (password) {
      hashed = await bcrypt.hash(password, 10);
    }

    // Build query: update only provided fields via COALESCE
    const sql = `
      UPDATE USERs
      SET full_name = COALESCE(?, full_name),
          phone = COALESCE(?, phone),
          email = COALESCE(?, email),
          password_hash = COALESCE(?, password_hash),
          status = COALESCE(?, status),
          updated_at = CURRENT_TIMESTAMP(3)
      WHERE user_id = ?
    `;
    connection.query(
      sql,
      [
        name || null,
        phone || null,
        email || null,
        hashed || null,
        status || null,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("updateUser DB error:", err, err?.sqlMessage);
          if (err.code === "ER_DUP_ENTRY") {
            const dupField =
              /for key '([^']+)'/.exec(err.sqlMessage || "")?.[1] || "";
            const message = dupField.toLowerCase().includes("email")
              ? "Email already exists"
              : dupField.toLowerCase().includes("phone")
              ? "Phone already exists"
              : "Duplicate entry";
            return res.status(409).json({ error: message });
          }
          return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "User not found" });
        return res.json({ ok: true, affected: result.affectedRows });
      }
    );
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// -------------------- DELETE USER --------------------
const deleteUser = (req, res) => {
  const { id } = req.params;
  // Because foreign keys use ON DELETE CASCADE for some tables, a single DELETE should remove related rows.
  const sql = "DELETE FROM USERs WHERE user_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("deleteUser DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    return res.json({ ok: true, deletedId: id });
  });
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser, 
    deleteUser
}