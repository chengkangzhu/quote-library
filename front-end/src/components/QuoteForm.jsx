import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

//contxt
import { QuoteContext } from "../contexts/QuoteContext";

const QuoteForm = ({ closeForm, heading, id, showNotif }) => {
	const [quoteText, setQuoteText] = useState("");
	const [quoteAuthor, setQuoteAuthor] = useState("");
	const { Quotes, dispatch } = useContext(QuoteContext);

	//fetch to be edited code from database
	useEffect(() => {
		if (id !== "") {
			const { quote, quoter } = Quotes.find((q) => q._id === id);
			setQuoteText(quote);
			setQuoteAuthor(quoter);
		}
	}, [Quotes, id]);

	const handleSubmit = async () => {
		if (id === "") {
			const newQuote = {
				quote: quoteText,
				quoter: quoteAuthor,
			};
			try {
				const response = await axios.post(
					"http://localhost:5000/api/quote/add",
					newQuote
				);
				dispatch({ type: "ADD_QUOTE", payload: response.data });
			} catch (err) {
				console.error(err);
			}
		} else {
			try {
				const editedQuote = {
					_id: id,
					quote: quoteText,
					quoter: quoteAuthor,
					__v: 0
				};
				const oldQuote = Quotes.find((q) => q._id === id);

				if (!_.isEqual(oldQuote, editedQuote)) {
					const { data } = await axios.put(
						"http://localhost:5000/api/quote/edit/" + id,
						editedQuote
					);
					dispatch({ type: "EDIT_QUOTE", payload: data });
					showNotif()
				}
			} catch (err) {
				console.error(err);
			}
		}
	};

	const handleDone = () => {
		handleSubmit();
		closeForm();
	};

	return (
		<div>
			<div className="popup">
				<h2>{heading}</h2>

				<label htmlFor="quote">Quote:</label>
				<textarea
					type="text"
					rows="4"
					value={quoteText}
					onChange={(e) => setQuoteText(e.target.value)}
				></textarea>

				<label htmlFor="author">Quoter:</label>
				<input
					type="text"
					value={quoteAuthor}
					onChange={(e) => setQuoteAuthor(e.target.value)}
				/>

				<div className="buttons">
					<button onClick={() => closeForm()}>Cancel</button>
					<button onClick={() => handleDone()}>Done</button>
				</div>
			</div>
			<div className="overlay" onClick={() => closeForm()}></div>
		</div>
	);
};

export default QuoteForm;
