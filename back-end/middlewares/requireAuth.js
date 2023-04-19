const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const requireAuth = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token)
		return res.status(401).json({ error: "Authentication token required" });

	try {
		const { _id } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(_id).select("_id");
		next();
	} catch (error) {
		res.status(401).json({ error: "Request is not authorized" });
	}
};

module.exports = requireAuth;
