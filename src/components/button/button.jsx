import "./button.css"

  function Button ( {OnClick, txt } ) {
		

	return (
		<button onClick={OnClick} className="button primary">
			{txt}
		</button>
	) 
}

export default Button