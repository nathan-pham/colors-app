import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"

const DEVELOPMENT = "DEVELOPMENT"
const PRODUCTION = "PRODUCTION"

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

const registerWorker = () => {
	if("serviceWorker" in navigator) {
		navigator.serviceWorker.register("service-worker.js", { scope: '/' })
	}
}

export const createApp = (mode) => {
    console.log(`Warning: running in ${mode} mode.`)

    // blockSource()
    // forceSecure()

    if(mode == PRODUCTION) {
        registerWorker()
    }
}

createApp(MODE)