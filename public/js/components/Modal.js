import { jsh } from "https://esm.sh/stateful-components"

const { wrap, button, input, div, h1, p } = jsh
const ionicon = wrap("ion-icon")

const cinput = ({ icon, placeholder="Input", type="text" }) => (
    div({ class: "input" },
        ionicon({ name: icon }),
        input({ type, placeholder })
    )
)

export default class Modal {
    constructor({ mode }) {
        this.mode = mode
    }

    render() {
        return this.mode == "sign-up"
            ? (
                div({ class: "form-wrapper" },
                    div({ class: "form" },
                        ionicon({ name: "close-outline", class: "close" }),

                        h1({}, "Join Coloors"),
                        p({}, "Sign up to collect your palettes"),

                        cinput({ icon: "person-circle-outline", placeholder: "Full Name" }),
                        cinput({ icon: "mail-outline", placeholder: "Email", type: "email"}),
                        cinput({ icon: "lock-closed-outline", placeholder: "Password", type: "password"}),

                        button({ class: "primary" }, "Create a free account")
                    )
                )
            )
            : (
                ""
            )
    }
}