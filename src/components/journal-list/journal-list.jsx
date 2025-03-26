
import "./journal-list.css"
import CardButton from "../card-btn/card-btn";
import JournalItem from "../journal-item/journal-item";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";


function JournalList({ data }) {
	const { userId } = useContext(UserContext);
	return (
		<>
			{data
				?.filter(item => item.userId === userId)
				.map((elem, idx) => {
					return (
						<CardButton key={idx}>
							<JournalItem data={elem} />
						</CardButton>
					);
				})}
		</>
	);
}

export default JournalList;