const { response } = require("express");
const Usuario = require("../models/mongoUsuario.model");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

// LOGIN
const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario / Password no son correctos - correo",
            });
        }

        if (usuario.estado === false) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario / Password no son correctos - estado: false",
            });
        }

        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Usuario / Password no son correctos - password",
            });
        }

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

        const existeUsuario = await Usuario.findOne({ correo });
        if (existeUsuario) {
            return res.status(400).json({ msg: 'El correo ya está registrado' });
        }

        const usuario = new Usuario({ nombre, correo, password, rol });

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

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

// OBTENER FAVORITOS
const getFavoritos = async (req, res = response) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).populate('favoritos');
        res.json({ favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener favoritos', error: error.message });
    }
};

// AGREGAR FAVORITO
const addFavorito = async (req, res = response) => {
    try {
        const { sitioId } = req.body;
        const usuario = await Usuario.findById(req.usuario.id);
        if (!usuario.favoritos.includes(sitioId)) {
            usuario.favoritos.push(sitioId);
            await usuario.save();
        }
        res.json({ msg: 'Sitio agregado a favoritos', favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ msg: 'Error al agregar favorito', error: error.message });
    }
};

// ELIMINAR FAVORITO
const removeFavorito = async (req, res = response) => {
    try {
        const { sitioId } = req.body;
        const usuario = await Usuario.findById(req.usuario.id);
        usuario.favoritos = usuario.favoritos.filter(id => id.toString() !== sitioId);
        await usuario.save();
        res.json({ msg: 'Sitio eliminado de favoritos', favoritos: usuario.favoritos });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar favorito', error: error.message });
    }
};

module.exports = {
    login,
    register,
    getFavoritos,
    addFavorito,
    removeFavorito
};