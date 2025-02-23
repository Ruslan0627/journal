import "./journal-add-btn.css"
import CardButton from "../card-btn/card-btn";
function JournalAddButton({ variant }) {
		return (
				<CardButton variant={variant} className={"journal-add-button"}>
					+ Новое вопспоминание
				</CardButton>
		);
}

export default JournalAddButton