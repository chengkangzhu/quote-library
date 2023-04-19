const Quote = require("../models/quote.model");

//get all quotes
const getQuotes = async (req, res) => {
	try {
		const user_id = req.user._id;
		const quotes = await Quote.find({ user_id });
		res.json(quotes);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Failed to fetch data from database. Please try again later.",
		});
	}
};

//get one quote
const getQuote = async (req, res) => {
	const { id } = req.params;
	try {
		const quote = await Quote.findById(id);
		if (!quote) return res.status(404).json({ error: "Quote not found." });
		res.json(quote);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Failed to fetch quote from the database.",
		});
	}
};

//add one quote
const addQuote = async (req, res) => {
	try {
		const { quote, quoter } = req.body;
		const user_id = req.user._id;
		const newQuote = await Quote.create({ quote, quoter, user_id });
		res.json(newQuote);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Failed to add quote to database. Please try again later.",
		});
	}
};

//edit a quote
const editQuote = async (req, res) => {
	try {
		const { id } = req.params;
		const { quote, quoter } = req.body;
		const updatedQuote = await Quote.findByIdAndUpdate(
			id,
			{ quote, quoter },
			{ new: true }
		);
		if (!updatedQuote)
			return res
				.status(404)
				.json({ error: "Quote not found in the database." });
		res.json(updatedQuote);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			error: "Failed to update quote in the database.",
		});
	}
};

//delete a quote
const deleteQuote = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedQuote = await Quote.findByIdAndDelete(id);
		res.json(deletedQuote);
	} catch (err) {
		console
			.error(err)
			.res.status(500)
			.json({ error: "Fail to delete quote. Please try again later" });
	}
};

module.exports = {
	getQuotes,
	getQuote,
	addQuote,
	editQuote,
	deleteQuote,
};
