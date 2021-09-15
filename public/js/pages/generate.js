import Sortable from "https://esm.run/sortablejs"

// component utilities
import { create as createNotification } from "/js/components/notification.js"
import { color as randomColor } from "/js/utils/random.js"
import { $, elements } from "/js/utils/elements.js"

const { a, div, input, ion_icon } = elements

// query
import graphql from "/js/utils/graphql.js"

// select elements
const colorWrapper = $(".color-generator .color-wrapper")
const [ addButton, generateButton ] = $(".color-generator button")
const [ photoOption, viewOption, exportOption, saveOption ] = $(".options .option")

// initalize sortable
new Sortable($(".color-wrapper"), {
    handle: ".handle",
    animation: 150
})

// download utility
const download = (filename, text) => {
    const el = a({
        href: `data:text/plain;charset=utf-8, ${ encodeURIComponent(text) }`,
        download: filename,
        style: "display: none"
    })

    document.body.appendChild(el)
    el.click()
    el.remove()
}

// get all current colors
const getAllColors = () => (
    $(colorWrapper, ".color").map(el => el.style.background)
)

// global variable managing palette size
let size = 4

const colorSlice = (background) => {
    const locked = ion_icon({ name: "lock-open-outline", onClick: () => {
        color.dataset.locked = color.dataset.locked == "true" ? "false" : "true"
        locked.name = color.dataset.locked == "true" ? "lock-closed-outline" : "lock-open-outline"
    }})

    const colorInput = div({ class: "input-color" },
        ion_icon({ name: "options-outline" }),
        input({ type: "color", value: background, onChange: (e) => {
            color.style.background = e.target.value
        }})
    )

    const color = div({ class: "color", style: `background: ${ background }` },
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
        colorWrapper.appendChild(colorSlice("#808080"))
    })
}


const createPalette = (genesis) => {
    const colors = $(colorWrapper, ".color")
    for(const color of (colors || [])) {
        if(color.dataset.locked == "false" || !color.dataset.locked) {
            const generatedColor = randomColor()
            color.style.background = generatedColor
            $(color, "input[type='color']").value = generatedColor
        }
    }
}

// generator option actions
document.addEventListener("keypress", e => {
    if(e.key == " ") { createPalette() }
})

generateButton.addEventListener("click", createPalette)

addButton.addEventListener("click", () => {
    size++
    colorWrapper.appendChild(colorSlice(randomColor()))
})

saveOption.addEventListener("click", () => {
    console.log(getAllColors())
})

exportOption.addEventListener("click", () => {
    download("colors.json", JSON.stringify({ colors: getAllColors() }, null, 4))
})

// initialize palette
genesisPalette()
createPalette()