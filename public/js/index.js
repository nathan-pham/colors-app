import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"

// components
import signUpModal from "./components/modal/signUpModal.js"
import signInModal from "./components/modal/signInModal.js"

// component utilities
import { remove as removePreloader } from "./components/preloader.js"
import { $, elements } from "./utils/elements.js"

// animations
import * as a from "./utils/animations.js"

// select elements
const [ signIn, signUp ] = $(".user-action")
removePreloader($(".preloader"))

// append modal to body onClick signIn or signUp
const onClick = (type) => () => {
    const modal = type == "signUpModal" ? signUpModal() : signInModal()
    const close = $(modal, ".close")
    const form = $(modal, ".form")

    // define local animations
    const scaleFadeOut = () => {
        a.scaleOut(form)
        a.fadeOut(modal, { delay: 0.5, remove: true })
    }

    const scaleFadeIn = () => {
        a.fadeIn(modal, {  })
        a.scaleIn(form, { delay: 0.5 })
    }

    // close modal if click on x or outside of main form
    close.addEventListener("click", () => scaleFadeOut())
    modal.addEventListener("click", e => {
        e.stopPropagation()
        if(e.target === modal) { scaleFadeOut() }
    })

    document.body.appendChild(modal)
    scaleFadeIn()
}

// apply onClick event listener
signIn.addEventListener("click", onClick("signInModal"))
signUp.addEventListener("click", onClick("signUpModal"))