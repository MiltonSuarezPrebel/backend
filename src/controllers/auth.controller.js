import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {lastname, name, email, password, username } = req.body

    try {
        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(['El email ya existe']);
         

        const passHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            lastname, 
            name,
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
          email: userSaved.email,
          name: userSaved.name,
          lastname: userSaved.lastname,
          createdAt: userSaved.createdAt,
          updatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const login = async (req, res) => {
    const {email, password } = req.body

    try {
        const userLogin = await User.findOne({ email });
        if (!userLogin) return res.status(400).json(['Usuario no existe']);

        const isLogin = await bcrypt.compare(password, userLogin.password);
        if (!isLogin) return res.status(400).json(['Datos incorrectos']);

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