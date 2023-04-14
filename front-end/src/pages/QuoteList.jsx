import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

//component
import QuoteDetail from "../components/QuoteDetail";
import QuoteForm from "../components/QuoteForm";

//context
import { QuoteContext } from "../contexts/QuoteContext";

const QuoteList = () => {
	const { Quotes, dispatch } = useContext(QuoteContext);
	const [showForm, setShowForm] = useState(false);
	const [formId, setFormId] = useState("");
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/quote")
			.then((response) =>
				dispatch({ type: "SET_QUOTES", payload: response.data })
			)
			.catch((error) => console.error(error));
	}, [dispatch]);

	const closeForm = () => {
		setFormId("");
		setShowForm(false);
	};
	const showNotif = () => {
		setShowNotification(true);
		setTimeout(() => setShowNotification(false), 1600);
	};

	async function handleEdit(id) {
		await setFormId(id);
		setShowForm(true);
	}

	return (
		<div id="quoteList">
			{Quotes &&
				Quotes.map((quote) => (
					<QuoteDetail
						key={quote._id}
						{...quote}
						handleEdit={handleEdit}
					/>
				))}
			{showForm && (
				<QuoteForm
					closeForm={() => closeForm()}
					showNotif={() => showNotif()}
					id={formId}
				/>
			)}

			{showNotification && (
				<span className="popup-notif show">
					Quote successfully edited
				</span>
			)}
			<button className="addQuoteBtn" onClick={() => setShowForm(true)}>
				+
			</button>
		</div>
	);
};

export default QuoteList;
