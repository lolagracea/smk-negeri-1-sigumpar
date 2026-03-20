const express = require("express");
const {
  register,
  login,
  me,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Endpoint publik
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);

// Endpoint khusus admin (dilindungi)
router.post(
  "/admin/create-user",
  authMiddleware,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const { name, username, email, password, role = "user" } = req.body;
      if (!name || !username || !password) {
        return next(createError(400, "Name, username, password wajib diisi"));
      }

      const users = await readUsers(); // pastikan readUsers diimpor
      if (users.find((u) => u.username === username)) {
        return next(createError(409, "Username sudah digunakan"));
      }
      if (email && users.find((u) => u.email === email)) {
        return next(createError(409, "Email sudah digunakan"));
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: Date.now().toString(),
        name,
        username,
        email: email || null,
        password: hashedPassword,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(newUser);
      await writeUsers(users);

      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json({ success: true, data: userWithoutPassword });
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
