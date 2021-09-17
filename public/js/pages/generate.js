import Sortable from "https://esm.run/sortablejs"

// component utilities
import deleteModal from "/js/components/modal/deleteModal.js"
import { create as createNotification } from "/js/components/notification.js"
import { color as randomColor } from "/js/utils/random.js"
import { $, elements } from "/js/utils/elements.js"

const {  div, input, ion_icon } = elements

// query
import graphql from "/js/utils/graphql.js"

// random stuff like color conversions & downloading files
import { rgbToHex } from "/js/utils/color.js"
import download from "/js/utils/download.js"

// animations
import * as a from "/js/utils/animations.js"
const { sleep } = a

// select elements
const colorWrapper = $(".color-generator .color-wrapper")
const [ addButton, generateButton ] = $(".color-generator button")
const [ deleteOption, forkOption, exportOption, saveOption ] = $(".options .option")

// initalize sortable
new Sortable($(".color-wrapper"), { handle: ".handle", animation: 150 })

// get all current colors
const getAllColors = () => (
    $(colorWrapper, ".color").map(el => el.style.background)
)

const getId = () => (
    location.pathname.split('/').filter(n => n.length).pop()
)

// global variable managing palette size
let size = GENESIS.length || 4

// create preset notifications
const graphqlNotify = (errors, fork) => {
    createNotification(errors
        ? { icon: "error", title: "Retry that...", text: errors[0].message }
        : fork
            ? { icon: "info", title: "Forked", text: "Successfully forked your color palette." }
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

deleteOption.addEventListener("click", () => {
    const lastPathname = getId()
    const saveAsNew = lastPathname == "generate"

    if(saveAsNew) {
        return createNotification({ icon: "error", title: "Save first", text: "Save your color palette first before deleting it!" })
    }

    const modal = deleteModal()
    const close = $(modal, ".close")
    const form = $(modal, ".form")
    const button = $(modal, "button")

    // TODO: move animations to component files
    // define local animations
    const scaleFadeOut = () => {
        a.scaleOut(form)
        a.fadeOut(modal, { delay: 0.5, remove: true })
    }

    const scaleFadeIn = () => {
        a.fadeIn(modal, {  })
        a.scaleIn(form, { delay: 0.5 })
    }

    close.addEventListener("click", () => scaleFadeOut())
    modal.addEventListener("click", e => {
        e.stopPropagation()
        if(e.target === modal) { scaleFadeOut() }
    })

    button.addEventListener("click", () => {
        button.disabled = true

        graphql(`
            mutation Mutation {
                deletePalette(id: "${ lastPathname }")
            }
        `).then(async ({ data, errors }) => {
            scaleFadeOut()

            await sleep(750)
            close.click()

            await sleep(1000)

            if(data) {
                createNotification({ icon: "info", title: "Deleted", text: "We're redirecting you to your dashboard." })
                await sleep(1000)
                location.href = "/~"
            } else {
                createNotification({ icon: "error", title: "Retry that...", text: errors[0].message })
            }
        })
    })

    document.body.appendChild(modal)
    scaleFadeIn()
})

forkOption.addEventListener("click", () => {
    const lastPathname = getId()
    const saveAsNew = lastPathname == "generate"

    if(saveAsNew) {
        createNotification({ icon: "error", title: "Save first", text: "Save your color palette first before forking it!" })
    } else {
        graphql(`
            mutation Mutation {
                createPalette(colors: ${ JSON.stringify(getAllColors()) }) {
                    id
                }

                incrementFork(id: "${ lastPathname }")
            }
        `).then(async ({ data, errors }) => {
            graphqlNotify(errors, "fork")

            if(!errors) {
                history.pushState({}, "coloors | generate", `/generate/${ data.createPalette.id }`)
            }
        })
    }
})

saveOption.addEventListener("click", () => {
    const lastPathname = getId()
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