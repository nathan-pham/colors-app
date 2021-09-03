import { jsh } from "https://esm.sh/stateful-components"
const { wrap, div, p } = jsh
const ionicon = wrap("ion-icon")

export default class Palette {
    constructor({ palette=[], saves=1 }) {
        this.palette = palette
        this.saves = saves
    }

    render() {
        let saves = `${ this.saves } saves`
        if(saves == 1) { saves = saves.slice(0, -1) }

        return (
            div({ class: "palette" }, 
                div({ class: "colors" },
                    ...this.palette.map(color => div({ 
                        class: "color", 
                        style: `background: ${color}` 
                    }))
                ),
                div({ class: "details" }, 
                    p({}, saves),
                    ionicon({ name: "ellipsis-horizontal" })
                )
            )
        )
    }
}