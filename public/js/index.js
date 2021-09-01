import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import { jsh } from "https://cdn.jsdelivr.net/npm/stateful-components"

import palettes from "./utils/palettes.js"
import { pick } from "./utils/random.js"

const { wrap, div, p } = jsh
const ionicon = wrap("ion-icon")

const createPalette = (palette) => {
    let saves = `${ Math.floor(Math.random() * 100) } saves`
    if(parseInt(saves.split(' ')) == 1) { saves = saves.slice(0, -1) }

    return (
        div({ class: "palette" }, 
            div({ class: "colors" },
                ...palette.map(color => div({ 
                    class: "color", 
                    style: `background: ${color}` 
                }))
            ),
            div({ class: "details" }, 
                p({}, saves),
                ionicon({ name: "ellipsis-horizontal" })
            )
        )
    )
}

const paletteWrapper = document.querySelector(".palette-wrapper")
for(let i = 0; i < 99; i++) {
    paletteWrapper.appendChild(createPalette(pick(palettes)))
}