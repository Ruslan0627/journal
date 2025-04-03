import { useContext, useEffect, useState, useRef} from "react";
import { UserContext } from "../../context/user.context";
import cn from "classnames"
import Button from "../button/button";
import styles from "../select-user/select-user.module.css"

function SelectUser() {
	const [names, setNames] = useState([])
	const inputRef = useRef(null)
	useEffect(() => {
		const saveNames = JSON.parse(localStorage.getItem("save-names"))
		if (saveNames) {
			setNames(saveNames)
		}
	},[])

	useEffect(() => {
		if (names.length) {
			localStorage.setItem("save-names", JSON.stringify(names));
		}
	}, [names.length]);

	const addNewName = (e) => {
		e.preventDefault()
		const nameForm = new FormData(e.target)
    const formNameValues = Object.fromEntries(nameForm)
		const name = formNameValues.name
		const value = names.length + 1
		if (name === "") {
			return
		}
		else {
			setNames(prev => [
				...prev,
				{
					name,
					value
				},
			]);
		}

			inputRef.current.value = ""
	};


	const {setUserId} = useContext(UserContext)
	const onChangeUser = (e) => setUserId(Number(e.target.value))
		return (
			<div>
			<form action="" onSubmit={addNewName}>
				<label
					className={cn(styles.inputLabel, {
					})}
					htmlFor="name"
				>
					<input
						className={cn(styles.input)}
						placeholder="Ввидите новго пользователя"
						ref={inputRef}
						type="text"
						name="name"
					/>
				</label>
				<Button txt={"Добавитть ползователя"} />
			</form>
			<select
				className={cn(styles.select)}
				onChange={onChangeUser}
				style={{ width: "100%" }}
				name="user"
				id="user"
			>
				{names.map((elem, idx) => (
					<option key={idx} value={elem.value}>
						{elem.name}
					</option>
				))}
			</select>
		</div>
		)
}

export default SelectUser;