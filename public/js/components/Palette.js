import { jsh } from "https://esm.sh/stateful-components"

const { wrap, div, p } = jsh
const ionicon = wrap("ion-icon")

export default class Palette {
    constructor({ palette, saves }) {
        this.palette = palette
        this.saves = `${ saves } saves`

        if(saves == 1) { this.saves = this.saves.slice(0, -1) }
    }

    render() {
        return (
            div({ class: "palette" }, 
                div({ class: "colors" },
                    ...this.palette.map(color => div({ 
                        class: "color", 
                        style: `background: ${color}` 
                    }))
                ),
                div({ class: "details" }, 
                    p({}, this.saves),
                    ionicon({ name: "ellipsis-horizontal" })
                )
            )
        )
    }
}