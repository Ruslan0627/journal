import "./journal-item.css"

function JournalItem( { data } ) {	
	const formatedDate = new  Intl.DateTimeFormat("ru-RU").format(data.date)
	
		return (
			<>
				<h2 className="journal-item__title">{ data.title }</h2>
				<div className="journal-item__body">
					<p className="journal-item__date">{ formatedDate }</p>
					<p className="journal-item__text">{ data.content }</p>
				</div>
			</>
		)
}

export default JournalItem;