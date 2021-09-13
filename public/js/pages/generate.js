import { pick, partition } from "/js/utils/random.js"
import { $, elements } from "/js/utils/elements.js"

const { div } = elements

// select elements
const colorWrapper = $(".color-generator .color-wrapper")
const generateButton = $(".color-generator button")

const createPalette = () => {
    colorWrapper.innerHTML = ""

    // pick(partition(palette.colors()))
    new Array(4).fill("#").map(hash => Math.floor(Math.random() * 8 ** 8).toString(16).padStart(6, '0'))
        .map(color => div({ class: "color", style: `background: #${ color }` }))
        .forEach(el => colorWrapper.appendChild(el))
}

document.addEventListener("keypress", e => {
    if(e.key == " ") {
        createPalette()
    }
})

generateButton.addEventListener("click", createPalette)

createPalette()