const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { createUser, findUserByUsername } = require('../db/db');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const userId = await createUser(usuario, contraseña);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;
    try {
        const user = await findUserByUsername(usuario);
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const passwordMatch = await bcrypt.compare(contraseña, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        res.status(200).json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error al autenticar el usuario', error: error.message });
    }
});

module.exports = router;