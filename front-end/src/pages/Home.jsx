import React, { useState, useContext, useEffect } from "react";

// icons
import { FaTwitter } from "react-icons/fa";
import { FaTumblr } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";

//packages
import randomQuote from "quote-library";
import axios from "axios";

//context
import { QuoteContext } from "../contexts/QuoteContext";

export default function Home(props) {
	const { Quotes, dispatch } = useContext(QuoteContext);

	//setting random color
	const randomColor = () =>
		`hsl(${Math.floor(Math.random() * 360)}, 50%, 60%)`;

	//init states
	const [color, setColor] = useState(randomColor());
	const [bookmarked, setBookmark] = useState(false);
	const [{ quoteText, quoteAuthor }, setQuote] = useState(
		randomQuote.randomQuote()
	);

	//handle changes function
	function handleClick() {
		setColor(randomColor());
		setQuote(randomQuote.randomQuote());
		setBookmark(false);
	}

	async function handleBookmark() {
		try {
			setBookmark((prev) => !prev);
			const newQuote = { quote: quoteText, quoter: quoteAuthor };
			const response = await axios.post("http://localhost:5000/api/quote/add",newQuote);

			//use dispatch to add quote to the quoteList context
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div id="home" style={{ background: color }}>
			<div className="home-container">
				<p className="quote" style={{ color: color }}>
					<FaQuoteLeft
						className="quote-left-icon"
						style={{ color: color }}
					/>
					{quoteText}
				</p>

				<p className="quoter" style={{ color: color }}>
					- {quoteAuthor}
				</p>
				<a
					style={{ backgroundColor: color }}
					href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quoteText}" ${quoteAuthor}`}
					className="icon-buttons"
					target="_blank"
					rel="noopener noreferrer"
					onClick={props.onclick}
				>
					<FaTwitter />
				</a>
				<a
					style={{ backgroundColor: color }}
					href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quoteAuthor}&content=${quoteText}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
					className="icon-buttons"
					target="_blank"
					rel="noopener noreferrer"
					onClick={props.onclick}
				>
					<FaTumblr />
				</a>
				<button
					style={{ backgroundColor: color }}
					className="icon-buttons"
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleBookmark}
				>
					{bookmarked ? <AiFillStar /> : <AiOutlineStar />}
				</button>

				<button
					style={{ background: color }}
					className="text-buttons"
					onClick={handleClick}
				>
					New Quote
				</button>
			</div>
			<p className="creator">by Cheng Kang Zhu</p>
		</div>
	);
}
