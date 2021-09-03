export const $ = (parent, query) => {
    const nodes = typeof parent == "string" 
        ? document.querySelectorAll(parent)
        : parent.querySelectorAll(query)

    return nodes.length > 1 ? [...nodes] : nodes[0]
}