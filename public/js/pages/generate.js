import Sortable from "https://esm.run/sortablejs"

// component utilities
import { create as createNotification } from "/js/components/notification.js"
import { color as randomColor } from "/js/utils/random.js"
import { $, elements } from "/js/utils/elements.js"

const { a, div, input, ion_icon } = elements

// query
import graphql from "/js/utils/graphql.js"

// color utilities
import { rgbToHex } from "/js/utils/color.js"

// select elements
const colorWrapper = $(".color-generator .color-wrapper")
const [ addButton, generateButton ] = $(".color-generator button")
const [ viewOption, forkOption, exportOption, saveOption ] = $(".options .option")

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
let size = GENESIS.length || 4

// create preset notifications
const graphqlNotify = (errors) => {
    createNotification(errors
        ? { icon: "error", title: "Retry that...", text: errors[0].message }
        : { icon: "info", title: "Saved", text: "Successfully saved your color palette." }
    )
}

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
                createNotification({ icon: "error", title: "Too small", text: "Palettes need to be larger than 2 colors!" })
            } else {
                size--
                color.remove()
            }
        }})
    )

    return color
}

const genesisPalette = () => {
    new Array(size).fill("color").forEach((_, i) => {
        colorWrapper.appendChild(colorSlice(rgbToHex(GENESIS[i]) || "#808080"))
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
    if(size + 1 > 10) {
        createNotification({ icon: "error", title: "Too big", text: "Your color palette can't be larger than 10 colors!" })
    } else {
        size++
        colorWrapper.appendChild(colorSlice(randomColor()))
    }
})

forkOption.addEventListener("click", () => {
    graphql(`
        mutation Mutation {
            createPalette(colors: ${ JSON.stringify(getAllColors()) }) {
                id
            }
        }
    `).then(async ({ data, errors }) => {
        graphqlNotify(errors)

        if(!errors) {
            history.pushState({}, "coloors | generate", `/generate/${ data.createPalette.id }`)
        }
    })
})

saveOption.addEventListener("click", () => {
    const lastPathname = location.pathname.split('/').filter(n => n.length).pop()
    const saveAsNew = lastPathname == "generate"

    if(saveAsNew) {
        graphql(`
            mutation Mutation {
                createPalette(colors: ${ JSON.stringify(getAllColors()) }) {
                    id
                }
            }
        `).then(async ({ data, errors }) => {
            graphqlNotify(errors)

            if(!errors) {
                history.pushState({}, "coloors | generate", `/generate/${ data.createPalette.id }`)
            }
        })
    } else {
        graphql(`
            mutation Mutation {
                updatePalette(id: "${ lastPathname }", colors: ${ JSON.stringify(getAllColors()) })
            }
        `).then(async ({ data, errors }) => {
            graphqlNotify(errors)
        })
    }
})

exportOption.addEventListener("click", () => {
    download("colors.json", JSON.stringify({ colors: getAllColors() }, null, 4))
})

// initialize palette
genesisPalette()

if(!GENESIS.length) {
    createPalette()
}