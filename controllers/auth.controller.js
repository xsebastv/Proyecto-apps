const { response } = require("express");
const Usuario = require("../models/mongoUsuario.model");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

// LOGIN
const login = async (req, res = response) => {
    const { correo, password } = req.body; // Cambiado a 'correo'

    try {
        const usuario = await Usuario.findOne({ correo }); // Cambiado a 'correo'
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario / Password no son correctos - correo",
            });
        }

        // Verificar si el usuario está activo
        if (usuario.estado === false) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario / Password no son correctos - estado: false",
            });
        }

        // Verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario / Password no son correctos - password",
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: "Login ok",
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el Administrador...",
            error: error.message,
        });
    }
};

// REGISTER
const register = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        // Verificar si el correo ya existe
        const existeUsuario = await Usuario.findOne({ correo });
        if (existeUsuario) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        // Crear usuario
        const usuario = new Usuario({ nombre, correo, password, rol });

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en BD
        await usuario.save();

        res.status(201).json({
            msg: 'Usuario registrado exitosamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al registrar usuario', error: error.message });
    }
};

module.exports = {
    login,
    register
};