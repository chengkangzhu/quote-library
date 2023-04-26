import React, { useEffect, useState } from "react";
import axios from "axios";

//component
import QuoteDetail from "../components/QuoteDetail";
import QuoteForm from "../components/QuoteForm";

//context hooks
import useQuoteContext from "../hooks/useQuoteContext";
import useAuthContext from "../hooks/useAuthContext";

const QuoteList = () => {
	const { Quotes, dispatch } = useQuoteContext();
	const [showForm, setShowForm] = useState(false);
	const [formId, setFormId] = useState("");
	const [formHeading, setFormHeading] = useState("");
	const [showNotification, setShowNotification] = useState(false);
	const { user } = useAuthContext();

	useEffect(() => {
		if (!user) return;
		axios
			.get("https://quote-library-api.onrender.com/api/quote", {
				headers: {
					authorization: `bearer ${user.token}`,
				},
			})
			.then((response) =>
				dispatch({ type: "SET_QUOTES", payload: response.data })
			)
			.catch((error) => console.error(error));
	}, [dispatch, user]);

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
		setFormHeading("Edit Quote");
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
					heading={formHeading}
					id={formId}
				/>
			)}

			{showNotification && (
				<span className="popup-notif show">
					Quote successfully edited
				</span>
			)}
			<button
				className="addQuoteBtn"
				onClick={() => {
					setShowForm(true);
					setFormHeading("Add Quote");
				}}
			>
				+
			</button>
		</div>
	);
};

export default QuoteList;
