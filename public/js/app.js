const blockSource = () => {
	document.addEventListener("contextmenu", e => e.preventDefault())

	document.addEventListener("keydown", (e) => {
		if((e.keyCode == 123 ) || (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || (e.shiftKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) ||  e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'I'.charCodeAt(0)))))) 
			e.preventDefault()
	})	
}

const forceSecure = () => {
	if(window.location.protocol !== "https:") {
		location.href = location.href.replace("http://", "https://")
	}
}

blockSource()
forceSecure()