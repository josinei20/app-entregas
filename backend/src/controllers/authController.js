const Driver = require('../models/Driver');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register a new driver
exports.register = async (req, res) => {
  try {
    const { name, username, email, password, phone } = req.body;

    // Check if driver already exists
    let driver = await Driver.findOne({ $or: [{ email }, { username }] });
    if (driver) {
      return res.status(400).json({ success: false, message: 'Motorista já cadastrado' });
    }

    // Create new driver
    driver = new Driver({
      name,
      username,
      email,
      password,
      phone,
      role: 'driver'
    });

    await driver.save();

    const token = generateToken(driver._id);

    res.status(201).json({
      success: true,
      message: 'Motorista cadastrado com sucesso',
      token,
      driver: driver.toJSON()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Usuário e senha obrigatórios' });
    }

    // Check for driver
    const driver = await Driver.findOne({ 
      $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }]
    });

    if (!driver) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    // Check password
    const isMatch = await driver.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    // Check if driver is active
    if (!driver.isActive) {
      return res.status(401).json({ success: false, message: 'Motorista desativado' });
    }

    const token = generateToken(driver._id);

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      driver: driver.toJSON()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Get current driver
exports.getMe = async (req, res) => {
  try {
    const driver = await Driver.findById(req.user.id);
    res.json({ success: true, driver: driver.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Get all drivers (admin only)
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ role: 'driver' });
    res.json({ success: true, drivers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    let driver = await Driver.findById(req.user.id);

    if (email && email !== driver.email) {
      const existingDriver = await Driver.findOne({ email });
      if (existingDriver) {
        return res.status(400).json({ success: false, message: 'Email já cadastrado' });
      }
    }

    driver.name = name || driver.name;
    driver.email = email || driver.email;
    driver.phone = phone || driver.phone;
    driver.updatedAt = Date.now();

    await driver.save();

    res.json({ 
      success: true, 
      message: 'Motorista atualizado com sucesso',
      driver: driver.toJSON() 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const driver = await Driver.findById(req.user.id);

    // Check current password
    const isMatch = await driver.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Senha atual incorreta' });
    }

    // Update password
    driver.password = newPassword;
    driver.updatedAt = Date.now();
    await driver.save();

    res.json({ 
      success: true, 
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor', error: error.message });
  }
};
