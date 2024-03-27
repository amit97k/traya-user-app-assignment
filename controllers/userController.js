
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const registerUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400)
                .json({ message: "Email or password are missing" });
        }

        const user = await User.findOne({ email });

        if(user) {
            return res.status(409)
                .json({ message: "User is already exist" });
        }
        
        const userInfo = new User(req.body);
        userInfo.password = await bcrypt.hash(password, 10);

        const output = await userInfo.save();

        return res.status(201)
            .json({ message: "User is registered successfully", data: output});

    } catch (err) {
        console.log(err);
        res.status(500)
            .json({ message: "Internal server error" });
    }

}

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(403)
                .json({ message: "Authication failed. User doesn't exist" });
        }

        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return res.status(403)
                .json({ message: "Authication failed. Please enter the correct password" });
        }

        const userObject = {
            email,
            name: user.name,
            _id: user._id
        }

        const jwtToken = jwt.sign(userObject, process.env.JWT_SECRET, { expiresIn: '12h' });
        userObject.jwtToken = jwtToken;

        res.status(200)
            .json({ message: "success", data: userObject });
            
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getUsers = async (req, res) => {
    try {
        const results = await User.find({});
        res.status(200)
            .json({ message: "success", data: results });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getUserById = async (req, res) => {

    try {
        const id = req.params.id;
        const result = await User.findById(id);
        res.status(200)
            .json({ message: "success", data: result });
        
    } catch (err) {

        res.status(500)
            .json({ message: "Internal server error" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById
}