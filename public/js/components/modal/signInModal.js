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

    const [ email, password ] = $(e.target, "input").map(element => element.value)
    const submit = $(e.target, "button")
    const close = $(e.target, ".close")

    submit.disabled = true
    
    graphql(`
        query Query {
            loginUser(email: "${ email }", password: "${ password }") {
                token
            }
        }
    `).then(async ({ data, errors }) => {
        await sleep(750)
        close.click()

        await sleep(1000)

        if(data) {
            createNotification({ icon: "info", title: "You're all good!", text: "We're redirecting you to your dashboard." })

            await sleep(1000)
            location.href = "/~"
        } else {
            createNotification({ icon: "error", title: "Retry that...", text: errors[0].message })
        }
    })

    return false
}

// signInModal component
export default () => (
    div({ class: "form-wrapper" },
        form({ class: "form", onSubmit },
            ion_icon({ name: "close-outline", class: "close" }),

            h1({}, "Hello!"),
            p({}, "Sign into your account here"),

            modalInput({ icon: "mail-outline", placeholder: "Email", type: "email"}),
            modalInput({ icon: "lock-closed-outline", placeholder: "Password", type: "password"}),

            button({ class: "primary" }, "Sign in")
        )
    )
)