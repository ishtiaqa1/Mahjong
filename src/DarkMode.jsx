import React, { useState, useEffect } from "react"


export default function DarkModeToggle() {
    const [icon, setIcon] = useState(localStorage.getItem("dark-mode")==='🌙' ? '🌙' : '☀️');
    
    function toggleMode(){
        setIcon((oldIcon) => {
			const newIcon = oldIcon==='☀️' ? '🌙' : '☀️';
			localStorage.setItem("dark-mode", newIcon);
			return newIcon;
	});
        };
    useEffect(() => {
        setIcon(localStorage.getItem("dark-mode")==='🌙' ? '🌙' : '☀️');
        document.documentElement.setAttribute("data-dark-mode", icon==='🌙');
    }, [icon]);
 
    return(
            <button onClick={toggleMode}>{icon}</button>
    )
}

