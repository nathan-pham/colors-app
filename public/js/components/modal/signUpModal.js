import { $, elements } from "/js/utils/elements.js"
import modalInput from "./modalInput.js"
import graphql from "/js/utils/graphql.js"

const { ion_icon, button, form, div, h1, p } = elements

const onSubmit = e => {
    e.preventDefault()

    const [ name, email, password ] = $(e.target, "input").map(element => element.value)
    
    graphql(`
        mutation Mutation {
            createUser(name: "${ name }", email: "${ email }", password: "${ password }") {
                id
            }
        }
    `).then(console.log)

    return false
}

// signUpModal component
export default () => (
    div({ class: "form-wrapper" },
        form({ class: "form", onSubmit },
            ion_icon({ name: "close-outline", class: "close" }),

            h1({}, "Join Coloors"),
            p({}, "Sign up to collect your palettes"),

            modalInput({ icon: "person-circle-outline", placeholder: "Full Name" }),
            modalInput({ icon: "mail-outline", placeholder: "Email", type: "email"}),
            modalInput({ icon: "lock-closed-outline", placeholder: "Password", type: "password"}),

            button({ class: "primary" }, "Create a free account")
        )
    )
)
/*
            : (
                div({ class: "form-wrapper" },
                    div({ class: "form" },
                        ionicon({ name: "close-outline", class: "close" }),

                        h1({}, "Hello!"),
                        p({}, "Sign into your account here"),

                        cinput({ icon: "mail-outline", placeholder: "Email", type: "email"}),
                        cinput({ icon: "lock-closed-outline", placeholder: "Password", type: "password"}),

                        button({ class: "primary" }, "Sign in")
                    )
                )
            )
 */