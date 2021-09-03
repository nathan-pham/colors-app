export const $ = (query) => {
    const nodes = document.querySelectorAll(query)
    return nodes.length > 1 ? [...nodes] : nodes[0]
}