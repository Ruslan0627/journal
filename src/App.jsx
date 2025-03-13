import "./App.css";
import JournalAddButton from "./components/journal-add-btn/journal-add-btn";
import LeftPanel from "./layouts/left-panel/left-panel";
import JournalList from "./components/journal-list/journal-list"
import Body from "./layouts/body/body";
import JournalForm from "./components/journal-form/journal-form";
import { useEffect, useState } from "react";

// const ITEM = [
// 	{
// 		title: "Тему воспоминания я не придумал",
// 		date: new Date("10.29.2023"),
// 		content: "Тут должен быть какой-то философский текст"
// 	},
// 	{
// 		title: "Подготовка к обновлению курсов ",
// 		date: new Date("10.31.2022"),
// 		content: "Думал, что очень много времени я трачу понапрасну, но вс... "
// 	},
// 	{
// 		title: "Первая заметка",
// 		date: new Date("10.31.2021"),
// 		content: "Даже не знаю, что тут написать, но написать что-то нужно, ве..."
// 	}
// ]

function App() {
	const [data, setData] = useState([])
	useEffect( () => {
		try {
			const items = JSON.parse(localStorage.getItem("journal-item")); 
					setData(items.map(i => ({
							...i,
							date: new Date(i.date),
					})));
			}
			catch (error) {
        setData([]);  
    }
	}, []);

	useEffect( () => {
		if (data.length) {
			localStorage.setItem("journal-item",JSON.stringify(data))
		}
	},[data])

	const addNewJournalItem = (formData) => {
		setData( prev => [
			{...formData,
			date: new Date(formData.date)
		}
		,...prev
	])
	}
	return (
		<div className="app">
			<LeftPanel>
				<JournalAddButton variant={"primary"}/>
				<JournalList data ={data}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addNewJournalItem}/>
			</Body>
		</div>
	);
}

export default App;
