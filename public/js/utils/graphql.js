// query /graphql endpoint
export default (query) => (
    fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    })
        .then(res => res.json())
        .catch(e => ({ data: { error: "failed to query graphql server" } }))
)