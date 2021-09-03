import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import { jsh } from "https://esm.sh/stateful-components"
import gsap, { Expo } from "https://esm.sh/gsap"

import Palette from "./components/Palette.js"

import palettes from "./utils/palettes.js"
import { query } from "./utils/query.js"
import { pick } from "./utils/random.js"
import { $ } from "./utils/dom.js"

const [ signIn, signUp ] = $(".user-action")
const paletteWrapper = $(".palette-wrapper")
const preloader = $(".preloader")

for(let i = 0; i < 99; i++) {
    const palette = new Palette({ palette: pick(palettes), saves: Math.floor(Math.random() * 100) })
    paletteWrapper.appendChild(palette.render())
}

if(preloader) {
    gsap.to(preloader, {
        delay: 1,
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut,
        onComplete: () => preloader.remove()
    })
}

signIn.addEventListener("click", () => {
    console.log("sign in")
})

signUp.addEventListener("click", () => {
    console.log("sign up")
})
/*
 <button class="user-action">sign in</button>
                <button class="user-action primary">sign up</button>
 */
