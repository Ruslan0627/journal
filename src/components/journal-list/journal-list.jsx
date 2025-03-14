
import "./journal-list.css"
import CardButton from "../card-btn/card-btn";
import JournalItem from "../journal-item/journal-item";

function JournalList ( { data } ) {
		return (
			<div className="journal-list">
									{ data?.map( ( elem, idx )=> { 
							return (
						<CardButton key = {idx}>
							<JournalItem data = {elem}/>
						</CardButton> 
							)
						})}
			</div>
		);
}

export default JournalList ;