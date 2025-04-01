
import "./journal-list.css"
import CardButton from "../card-btn/card-btn";
import JournalItem from "../journal-item/journal-item";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";


function JournalList({ data, setSelectedItem }) {
	const { userId } = useContext(UserContext);
	const filteredData = useMemo(() => { 
	return	data?.filter(item => item.userId === userId)
},[data, userId])
	return (
		<>
			{
				filteredData.map((elem, idx) => {
					return (
						<CardButton onClick = {() => setSelectedItem(elem)} key={idx}>
							<JournalItem data={elem} />
						</CardButton>
					);
				})}
		</>
	);
}

export default JournalList;