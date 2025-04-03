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
const [selecetdItem, setSelectedItem] = useState({})
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
}, [data]);

const addNewJournalItem = formData => {
	console.log(formData);
	const newId = data.length + 1;
	const existItem = data.find(elem => elem.id === formData.id);

	if (existItem) {
    setData(prev =>
      prev.map(item =>
        item.id === formData.id
          ? { ...formData, date: new Date(formData.date) }
          : item
      )
    );
	} else {
		setData(prev => [
			{
				...formData,
				date: new Date(formData.date),
				id: newId,
			},
			...prev,
		]);
	}
};

	return (
		<div className="app">
	<UserContextProvider>
			<LeftPanel>
				<Header/>
				<JournalAddButton variant={"primary"} />
				<JournalList 
				setSelectedItem = {setSelectedItem} 
				data={data} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addNewJournalItem} selecetdItem = {selecetdItem} />
			</Body>
</UserContextProvider>
		</div>
	);
}

export default App;