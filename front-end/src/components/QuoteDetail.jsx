import React, { useContext } from "react";

//icon
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";

//context
import { QuoteContext } from "../contexts/QuoteContext";

const QuoteDetail = ({ quote, quoter, _id ,handleEdit}) => {
	const {  dispatch } = useContext(QuoteContext);
	

	const handleDelete = (id) => {
		axios.delete("http://localhost:5000/api/quote/delete/" + id);
		dispatch({ type: "DELETE_QUOTE", payload: {  id } });
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
					onClick={()=>handleEdit(_id)}
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
