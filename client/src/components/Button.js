import React from "react";

export default function Button({children, onClick}) {
  return (
    <div>
      <button style={{...buttonStyle}} onClick={onClick}>
				{children}
			</button>
    </div>
  );
}

const buttonStyle = {
	background: 'none',
	border: 'none',
}




