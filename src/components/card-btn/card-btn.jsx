import "./card-btn.css"

function CardButton( {children, variant , className} ) {
  const cls = `card-button ${variant || ""} ${className || ""}`;
		return (
			<button className= {cls}>
			{children}
			</button>
		);
}

export default CardButton;