import React, { useState, useEffect } from "react";
import axios from "axios";

//contxt
import useQuoteContext from "../hooks/useQuoteContext";
import useAuthContext from "../hooks/useAuthContext";

const QuoteForm = ({ closeForm, heading, id, showNotif }) => {
	const [quoteText, setQuoteText] = useState("");
	const [quoteAuthor, setQuoteAuthor] = useState("");
	const { Quotes, dispatch } = useQuoteContext();
	const { user } = useAuthContext();

	//fetch to be edited code from context
	useEffect(() => {
		if (id !== "") {
			const { quote, quoter } = Quotes.find((q) => q._id === id);
			setQuoteText(quote);
			setQuoteAuthor(quoter);
		}
	}, [Quotes, id]);

	const handleSubmit = async () => {
		closeForm();
		const quoteData = {
			quote: quoteText,
			quoter: quoteAuthor,
		};

		const url = id
			? `https://quote-library-api.onrender.com/api/quote/edit/${id}`
			: "https://quote-library-api.onrender.com/api/quote/add";
		const requestType = id ? "put" : "post";
		const actionType = id ? "EDIT_QUOTE" : "ADD_QUOTE";

		try {
			if (!user) return;
			const { data } = await axios[requestType](url, quoteData, {
				headers: {
					Authorization: `bearer ${user.token}`,
				},
			});
			dispatch({ type: actionType, payload: data });
			if (id) showNotif();
		} catch (err) {
			console.error(err);
		}
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
					<button onClick={() => handleSubmit()}>Done</button>
				</div>
			</div>
			<div className="overlay" onClick={() => closeForm()}></div>
		</div>
	);
};

export default QuoteForm;
