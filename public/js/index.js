import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import { jsh } from "https://esm.sh/stateful-components"
import gsap, { Expo } from "https://esm.sh/gsap"

import Palette from "./components/Palette.js"
import Modal from "./components/Modal.js"

import palettes from "./utils/palettes.js"

import { fadeIn, fadeOut, scaleIn, scaleOut } from "./utils/animations.js"
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

const createModal = (config) => () => {
    const modal = new Modal(config).render()
    const close = $(modal, ".close")
    const form = $(modal, ".form")
    
    const animateOut = () => {
        scaleOut(form)
        fadeOut(modal, { remove: true, delay: 1 })
    }

    modal.addEventListener("click", e => {
        e.stopPropagation()

        if(e.target === modal) { animateOut() }
    })

    close.addEventListener("click", e => { animateOut() })
    
    document.body.appendChild(modal)
    fadeIn(modal, { duration: 0.5})
    scaleIn(form, { delay: 0.5 })
}

signIn.addEventListener("click", createModal({ mode: "sign-in" }))
signUp.addEventListener("click", createModal({ mode: "sign-up" }))