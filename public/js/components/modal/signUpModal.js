// components
import modalInput from "./modalInput.js"

// component utilities
import { create as createNotification } from "/js/components/notification.js"
import { $, elements } from "/js/utils/elements.js"
import { sleep } from "/js/utils/animations.js"

import graphql from "/js/utils/graphql.js"

const { ion_icon, button, form, div, h1, p } = elements

const onSubmit = async (e) => {
    e.preventDefault()

    const [ name, email, password ] = $(e.target, "input").map(element => element.value)
    const submit = $(e.target, "button")
    const close = $(e.target, ".close")

    submit.disabled = true
    
    graphql(`
        mutation Mutation {
            createUser(name: "${ name }", email: "${ email }", password: "${ password }") {
                id
            }
        }
    `).then(async ({ data, errors }) => {
        await sleep(750)
        submit.disabled = false
        close.click()

        await sleep(1000)
        createNotification(data
            ? { icon: "info", title: "Created account", text: "You can now sign in with your account" }
            : { icon: "error", title: "Retry that...", text: "Something went wrong on our end. Please try again." }
        )
    })

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