import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {email, password, username } = req.body

    try {
        const passHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passHash,
        });
    
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token)

        //console.log(newUser)
        res.json({
          id: userSaved._id,
          username: userSaved.username,
          email: userSaved.email  
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const login = async (req, res) => {
    const {email, password } = req.body

    try {
        const userLogin = await User.findOne({ email });
        if (!userLogin) return res.status(400).json({ message: "Usuario no existe" });

        const isLogin = await bcrypt.compare(password, userLogin.password);
        if (!isLogin) return res.status(400).json({ message: "Datos incorrectos" });

        const token = await createAccessToken({ id: userLogin._id});

        res.cookie('token', token)

        //console.log(newUser)
        res.json({
          id: userLogin._id,
          username: userLogin.username,
          email: userLogin.email  
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const logout =  (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const profile =  async (req, res) => {
    const userLogin = await User.findById(req.user.id)

    if (!userLogin) return res.status(400).json({ message: "Usuario no existe" });

    return res.json({
        id:userLogin._id,
        username: userLogin.username,
        email: userLogin.email,
        createdAt: userLogin.createdAt,
        updatedAt: userLogin.updatedAt,
    })
}

export const updateUser = async (req, res) => {
    const userLogin = await User.findByIdAndUpdate(req.user.id, req.body, {new: true});
    if(!userLogin) return res.status(404).json({ message: 'Usuario no existe' })
    res.json(userLogin)    
};