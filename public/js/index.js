import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import { jsh } from "https://esm.sh/stateful-components"
import gsap, { Expo } from "https://esm.sh/gsap"

import Preloader from "./components/Preloader.js"
import Palette from "./components/Palette.js"
import palettes from "./utils/palettes.js"
import { pick } from "./utils/random.js"

const paletteWrapper = document.querySelector(".palette-wrapper")
const preloader = document.querySelector(".preloader")

for(let i = 0; i < 99; i++) {
    const palette = new Palette({
        palette: pick(palettes),
        saves: Math.floor(Math.random() * 100)
    })

    paletteWrapper.appendChild(palette.render())


    gsap.to(preloader, {
        delay: 1,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
        onComplete: () => preloader.remove()
    })
}
