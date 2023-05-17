import React, { useState } from "react";

// icons
import { FaTwitter } from "react-icons/fa";
import { FaTumblr } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";
import { AiFillRobot } from "react-icons/ai";

//packages
import randomQuote from "quote-library";
import axios from "axios";

//context
import useAuthContext from "../hooks/useAuthContext";

export default function Home(props) {
	//setting random color
	const randomColor = () =>
		`hsl(${Math.floor(Math.random() * 360)}, 50%, 60%)`;

	//init states
	const [color, setColor] = useState(randomColor());
	const [bookmarked, setBookmark] = useState(false);
	const [{ quoteText, quoteAuthor }, setQuote] = useState(
		randomQuote.randomQuote()
	);
	const { user } = useAuthContext();

	//handle changes function
	function handleClick() {
		setColor(randomColor());
		setQuote(randomQuote.randomQuote());
		setBookmark(false);
	}

	async function handleBookmark() {
		if (!user) return alert("you need be logged in to save quotes");
		try {
			if (!bookmarked) {
				setBookmark(true);
				const newQuote = { quote: quoteText, quoter: quoteAuthor };
				await axios.post(
					"https://quote-library-2-production.up.railway.app/api/quote/add",
					newQuote,
					{
						headers: {
							Authorization: `bearer ${user.token}`,
						},
					}
				);
			}
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
				>
					<FaTwitter />
				</a>
				<a
					style={{ backgroundColor: color }}
					href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${quoteAuthor}&content=${quoteText}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
					className="icon-buttons"
					target="_blank"
					rel="noopener noreferrer"
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
				{/* <a
					style={{ backgroundColor: color }}
					className="icon-buttons"
					target="_blank"
				>
					<AiFillRobot />
				</a> */}

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
