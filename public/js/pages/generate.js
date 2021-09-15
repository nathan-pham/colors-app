import Sortable from "https://esm.run/sortablejs"

// component utilities
import { create as createNotification } from "/js/components/notification.js"
import { pick, partition } from "/js/utils/random.js"
import { $, elements } from "/js/utils/elements.js"

const { div, input, ion_icon } = elements

// select elements
const colorWrapper = $(".color-generator .color-wrapper")
const generateButton = $(".color-generator button")

let size = 4

new Sortable($(".color-wrapper"), {
    handle: ".handle",
    animation: 150
})

const colorSlice = (background) => {
    const locked = ion_icon({ name: "lock-open-outline", onClick: () => {
        color.dataset.locked = color.dataset.locked == "true" ? "false" : "true"
        locked.name = color.dataset.locked == "true" ? "lock-closed-outline" : "lock-open-outline"
    }})

    const colorInput = div({ class: "input-color" },
        ion_icon({ name: "options-outline" }),
        input({ type: "color", value: `#${ background }`, onChange: (e) => {
            color.style.background = e.target.value
        }})
    )

    const color = div({ class: "color", style: `background: #${ background }` },
        ion_icon({ name: "move-outline", class: "handle" }),
        colorInput,
        locked,
        ion_icon({ name: "trash-outline", onClick: () => {
            if(size - 1 < 2) {
                createNotification({ icon: "error", title: "Bruh", text: "Palettes need to be larger than 2 colors!" })
            } else {
                size--
                color.remove()
            }
        }})
    )

    return color
}

const genesisPalette = () => {
    new Array(size).fill("color").forEach(() => {
        colorWrapper.appendChild(colorSlice("gray"))
    })
}

const createPalette = (genesis) => {
    const colors = $(colorWrapper, ".color")
    for(const color of (colors || [])) {
        if(color.dataset.locked == "false" || !color.dataset.locked) {
            const generatedColor = "#" + Math.floor(Math.random() * 8 ** 8).toString(16).padStart(6, '0')

            color.style.background = generatedColor
            $(color, "input[type='color']").value = generatedColor
        }
    }
}

document.addEventListener("keypress", e => {
    if(e.key == " ") {
        createPalette()
    }
})

generateButton.addEventListener("click", createPalette)

genesisPalette()
createPalette()

// createPalette()