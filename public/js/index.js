import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import { jsh } from "https://esm.sh/stateful-components"
import gsap, { Expo } from "https://esm.sh/gsap"

import Palette from "./components/Palette.js"
import Modal from "./components/Modal.js"

import palettes from "./utils/palettes.js"

import { fadeIn, fadeOut } from "./utils/animations.js"
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

if(preloader) { fadeOut(preloader, { remove: true, delay: 1 }) }

signIn.addEventListener("click", () => {
    console.log("sign in")
})

signUp.addEventListener("click", () => {
    const modal = new Modal({ mode: "sign-up" }).render()
    modal.addEventListener("click", e => {
        e.stopPropagation()

        if(e.target === modal) {
            fadeOut(modal, { remove: true })
        }
    })

    const close = $(modal, ".close")
    close.addEventListener("click", e => { fadeOut(modal, { remove: true }) })
    
    const form = $(modal, ".form")
    
    document.body.appendChild(modal)
    fadeIn(modal, { duration: 0.5})
})
/*
 <button class="user-action">sign in</button>
                <button class="user-action primary">sign up</button>
 */
