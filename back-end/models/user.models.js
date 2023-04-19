const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.statics.signup = async function (email, password) {
	if (!email || !password) {
		throw Error("All fields must be filled");
	}

	if (!validator.isEmail(email)) {
		throw Error("Please enter a valid email");
	}

	if (!validator.isStrongPassword(password)) {
		throw Error(
			"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
		);
	}

	const existingUser = await this.findOne({ email });
	if (existingUser) {
		throw Error("Email already in use");
	}

	// Hash the password using bcrypt
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create the user in the database with the hashed password
	const user = await this.create({ email, password: hashedPassword });
	return user;
};

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error("All fields must be filled");
	}

	const user = await this.findOne({ email });
	if (!user) {
		throw Error("Email not registered");
	}

	// Compare the entered password with the stored hashed password
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw Error("Incorrect password");
	}

	return user;
};

module.exports = mongoose.model("User", userSchema);
