import { jsh } from "https://esm.sh/stateful-components"

const { div } = jsh

export default class Preloader {
    render() {
        return (
            div({ class: "preloader" },
                div({ class: "spinner" })
            )
        )
    }
}