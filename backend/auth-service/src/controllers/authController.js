const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
const { createError } = require("../middleware/errorHandler");

const DATA_FILE = path.join(__dirname, "../data/users.json");

// Helper baca/tulis data
const readUsers = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
};

// Registrasi (hanya untuk admin nantinya, tapi kita tetap sediakan)
const register = async (req, res, next) => {
  try {
    const { name, username, email, password, role = "user" } = req.body;

    // Validasi input
    if (!name || !username || !password) {
      throw createError(400, "Field name, username, password wajib diisi");
    }
    if (username.length < 3) {
      throw createError(400, "Username minimal 3 karakter");
    }
    if (password.length < 6) {
      throw createError(400, "Password minimal 6 karakter");
    }
    // Validasi email (opsional)
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw createError(400, "Format email tidak valid");
      }
    }

    const users = await readUsers();
    // Cek username sudah terdaftar
    const existingUsername = users.find((u) => u.username === username);
    if (existingUsername) {
      throw createError(409, "Username sudah terdaftar");
    }
    // Cek email jika diisi
    if (email) {
      const existingEmail = users.find((u) => u.email === email);
      if (existingEmail) {
        throw createError(409, "Email sudah terdaftar");
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(), // nanti bisa diganti dengan uuid
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

    // Buat token
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Hapus password sebelum dikirim
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      data: { user: userWithoutPassword, token },
    });
  } catch (err) {
    next(err);
  }
};

// Login menggunakan username
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw createError(400, "Username dan password wajib diisi");
    }

    const users = await readUsers();
    const user = users.find((u) => u.username === username);
    if (!user) {
      throw createError(401, "Username atau password salah");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw createError(401, "Username atau password salah");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: { user: userWithoutPassword, token },
    });
  } catch (err) {
    next(err);
  }
};

// Mendapatkan data user saat ini (dari token)
const me = async (req, res, next) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === req.user.id);
    if (!user) {
      throw createError(404, "User tidak ditemukan");
    }
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

// Logout (hanya untuk keperluan dokumentasi)
const logout = (req, res) => {
  res.json({ success: true, message: "Logout berhasil" });
};
// Di authController.js, tambahkan:
const seedAdmin = async () => {
  const users = await readUsers();
  const adminExists = users.some((u) => u.username === "admin");
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = {
      id: Date.now().toString(),
      name: "Administrator",
      username: "admin",
      email: "admin@smkn1sigumpar.sch.id",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(adminUser);
    await writeUsers(users);
    console.log("✅ Admin user created (username: admin, password: admin123)");
  }
};

// Ekspor juga fungsi seed ini
module.exports = { register, login, me, logout, seedAdmin };
