import { useState } from "react";
import "./journal-form.css"
import Button from "../button/button";
function JournalForm() {
	const [inputValue, SetInputValue] = useState("")
	const onChangeInput = (e) => {
		SetInputValue(e.target.value)
	}
	const clickFormBtn = () => {
		console.log("click");
	}

	const onSubmitForm = (e) => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formValues = Object.fromEntries(formData)
		console.log(formValues);
		
	}
		return (
				<form  onSubmit={onSubmitForm} className="journal-form">
					<input type="text" name="title" value={inputValue} onChange={onChangeInput}/>
					<input type="date" name="date"/>
					<input type="text" name="tag"  />
					<textarea name="post" cols={"30"} rows={"10"} ></textarea>
					<Button OnClick={clickFormBtn} txt = {"Отправить"} />
				</form>
		);
}

export default JournalForm;