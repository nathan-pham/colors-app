export const graphql = (payload) => (
    fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: payload })
    })
        .then(res => res.json())
        .catch(e => ({ data: { error: "failed to query graphql server" } }))
)