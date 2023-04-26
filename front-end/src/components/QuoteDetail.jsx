import React from "react";

//icon
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";

//context
import useQuoteContext from "../hooks/useQuoteContext";
import useAuthContext from "../hooks/useAuthContext";

const QuoteDetail = ({ quote, quoter, _id, handleEdit }) => {
	const { dispatch } = useQuoteContext();
	const {user} = useAuthContext()

	const handleDelete = (id) => {
		if(!user)return 
		axios.delete("https://quote-library-api.onrender.com/api/quote/delete/" + id, {
			headers: {
				Authorization: `bearer ${user.token}`,
			},
		});
		dispatch({ type: "DELETE_QUOTE", payload: { id } });
	};

	return (
		<div className="card">
			<div className="card-body">
				<blockquote className="blockquote">
					<p>{quote}</p>
				</blockquote>
				<figcaption className="blockquote-footer">
					<cite title="Source Title">{quoter}</cite>
				</figcaption>
			</div>
			<div className="actionButton">
				<AiFillEdit
					className="editIcon"
					onClick={() => handleEdit(_id)}
				/>
				<RiDeleteBin6Line
					className="deleteIcon"
					onClick={() => handleDelete(_id)}
				/>
			</div>
		</div>
	);
};

export default QuoteDetail;
