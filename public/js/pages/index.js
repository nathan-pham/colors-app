// components
import signUpModal from "/js/components/modal/signUpModal.js"
import signInModal from "/js/components/modal/signInModal.js"

// component utilities
import { remove as removePreloader } from "/js/components/preloader.js"
import { $ } from "/js/utils/elements.js"

// animations
import * as a from "/js/utils/animations.js"

// only run if user is not signed in
const signInOptions = () => {
    // select elements
    const [ signIn, signUp ] = $(".user-action")

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
}

if($(".user-action")) {
    signInOptions()
}

removePreloader($(".preloader"))