const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const createToken = (_id) =>
	jwt.sign({ _id }, process.env.JWT_SECRET);

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.login(email, password);
		const token = createToken(user._id)
		res.status(200).json({email,token});
	} catch ({message}) {
		console.error(message);
		res.status(400).json({ error: message });
	}
};

const signUpUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.signup(email, password);
		const token = createToken(user._id)
		res.status(200).json({email,token});
	} catch ({message}) {
		console.error(message);
		res.status(400).json({ error: message });
	}
};

module.exports = {
	loginUser,
	signUpUser,
};
