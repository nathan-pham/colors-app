import { elements } from "/js/utils/elements.js"
const { ion_icon, button, div, br, h1, p } = elements

// deleteModal component
export default () => (
    div({ class: "form-wrapper" },
        div({ class: "form" },
            ion_icon({ name: "close-outline", class: "close" }),
            h1({}, "Are you sure?"),
            p({}, 
                "Are you sure you want to delete this color palette?",
                br(),
                "It will be gone forever!"
            ),

            button({ class: "primary", style: "margin: 0" }, "Yes, I'm sure")
        )
    )
)