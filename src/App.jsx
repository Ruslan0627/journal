import "./App.css";
import JournalAddButton from "./components/journal-add-btn/journal-add-btn";
import LeftPanel from "./layouts/left-panel/left-panel";
import JournalList from "./components/journal-list/journal-list";
import Body from "./layouts/body/body";
import JournalForm from "./components/journal-form/journal-form";
import { useEffect, useState } from "react";
import { UserContextProvider } from "./context/user.context";
import Header from "./components/header/header";

function App() {
const [data, setData] = useState([]);
useEffect(() => {
	const items = JSON.parse(localStorage.getItem("journal-item"));
	if (items) {
		setData(
			items.map(i => ({
				...i,
				date: new Date(i.date),
			}))
		);
	}
}, []);

useEffect(() => {
	if (data.length) {
		localStorage.setItem("journal-item", JSON.stringify(data));
	}
}, [data.length]);

const addNewJournalItem = formData => {
	console.log(formData);
	
	setData(prev => [
		{
			...formData,
			date: new Date(formData.date),
		},
		...prev
	]);
};

	return (
		<div className="app">
	<UserContextProvider>
			<LeftPanel>
				<Header/>
				<JournalAddButton variant={"primary"} />
				<JournalList data={data} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addNewJournalItem} />
			</Body>
</UserContextProvider>
		</div>
	);
}

export default App;