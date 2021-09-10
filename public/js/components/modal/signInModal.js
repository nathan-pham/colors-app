import { elements } from "/js/utils/elements.js"
import modalInput from "./modalInput.js"

const { ion_icon, button, form, div, h1, p } = elements

// signInModal component
export default () => (
    div({ class: "form-wrapper" },
        form({ class: "form" },
            ion_icon({ name: "close-outline", class: "close" }),

            h1({}, "Hello!"),
            p({}, "Sign into your account here"),

            modalInput({ icon: "mail-outline", placeholder: "Email", type: "email"}),
            modalInput({ icon: "lock-closed-outline", placeholder: "Password", type: "password"}),

            button({ class: "primary" }, "Sign in")
        )
    )
)