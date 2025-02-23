import "./App.css";
import JournalAddButton from "./components/journal-add-btn/journal-add-btn";
import LeftPanel from "./layouts/left-panel/left-panel";
import JournalList from "./components/journal-list/journal-list"
import JournalItem from "./components/journal-item/journal-item"
import CardButton from "./components/card-btn/card-btn";
import Body from "./layouts/body/body";
import JournalForm from "./components/journal-form/journal-form";




function App() {
	const data = [
		{
			title: "Тему воспоминания я не придумал",
			date: new Date("10.29.2023"),
			content: "Тут должен быть какой-то философский текст"
		},
		{
			title: "Подготовка к обновлению курсов ",
			date: new Date("10.31.2022"),
			content: "Думал, что очень много времени я трачу понапрасну, но вс... "
		},
		{
			title: "Первая заметка",
			date: new Date("10.31.2021"),
			content: "Даже не знаю, что тут написать, но написать что-то нужно, ве..."
		}
	]
	return (
		<div className="app">
			<LeftPanel>
				<JournalAddButton variant={"primary"}/>
				<JournalList>
					{
						data?.map( ( elem, idx )=> { 
							return (
						<CardButton key = {idx}>
							<JournalItem data = {elem}/>
						</CardButton> 
							)
						})
					}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm/>
			</Body>
		</div>
	);
}

export default App;
