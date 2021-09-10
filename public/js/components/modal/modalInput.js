import { elements } from "/js/utils/elements.js"

const { ion_icon, input, div } = elements

// modalInput component
export default ({ icon, placeholder="Input", type="text" }) => (
    div({ class: "input" },
        ion_icon({ name: icon }),
        input({ type, placeholder, required: true })
    )
)