import "./card-btn.css"

function CardButton( {children, variant , className, onClick} ) {
  const cls = `card-button ${variant || ""} ${className || ""}`;
		return (
			<button onClick={onClick} className= {cls}>
			{children}
			</button>
		);
}

export default CardButton;