// query /graphql endpoint
export default (query) => (
    fetch("/graphql", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    })
        .then(res => res.json())
        .catch(() => ({ errors: [ "Failed to query graphql server" ] }))
)