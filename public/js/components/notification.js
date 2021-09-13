import gsap, { Expo } from "https://esm.run/gsap"
import { elements } from "/js/utils/elements.js"
import { shared } from "/js/utils/animations.js"

const { ion_icon, div, h1, p } = elements

const aliases = {
    "default": "notifications",
    
    "info": "information-circle",
    "error": "bug"
}

// notification component
const notification = ({ icon="default", text, title }={}) => (
    div({ class: "notification" },
        ion_icon({ name: `${ aliases[icon] || aliases["default"] }-outline` }),
        h1({}, title),
        p({}, text)
    )
)

export const create = (config) => {
    // base animations
    const animationStart = shared({ opacity: 0, y: "10rem" })
    const animationEnd = shared({ opacity: 1, y: 0 })

    // create notification component & append it to the body
    const element = notification(config)
    document.body.appendChild(element)

    // animate notification
    gsap.fromTo(element, animationStart, animationEnd)
    gsap.fromTo(element, animationEnd, { ...animationStart, delay: 4, onComplete: () => element.remove() })
}