const connection = require('../config/database'); // Kết nối MySQL
const bcrypt = require('bcrypt');


const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);

  try {
    // 🔹 1) Truy vấn admin theo email
    const query = "SELECT * FROM ADMINs WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // 🔹 2) Kiểm tra mật khẩu (bcrypt)
      try {
        const match = await bcrypt.compare(password, user.password_hash.toString());
        if (!match) {
          return res.status(401).json({ error: "Sai mật khẩu" });
        }

        console.log("✅ Login successful:", user.email);

        // 🔹 3) Không gửi password_hash ra ngoài
        const { password_hash, ...safeUser } = user;

        return res.status(200).json({
          message: "Login successful",
          user: safeUser,
        });
      } catch (bcryptErr) {
        console.error("Bcrypt compare error:", bcryptErr);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (outerErr) {
    console.error("Unexpected error:", outerErr);
    return res.status(500).json({ error: "Unexpected server error" });
  }
};

module.exports = {
   login 
};