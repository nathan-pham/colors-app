export const $ = (parent, query) => {
    const nodes = typeof parent == "string" 
        ? document.querySelectorAll(parent)
        : parent.querySelectorAll(query)

    return nodes.length > 1 ? [...nodes] : nodes[0]
}

export const h = (tag, props={}, children=[]) => {
    const element = document.createElement(tag)

    for(const [key, value] of Object.entries(props)) {
        const event = key.substring(2).toLowerCase()

        key.startsWith("on")
            ? element.addEventListener(event, value)
            : element.setAttribute(key, value)
    }

    for(const child of children) {
        element.appendChild(typeof child == "string"
            ? document.createTextNode(child)
            : child
        )
    }

    return element
}

export const elements = new Proxy({}, {
    get: (_, tag) => 
        (props, ...children) => 
            h(new String(tag).split("_").join("-"), props, children)
})