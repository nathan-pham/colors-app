// export download
export default (filename, text) => {
    const el = a({
        href: `data:text/plain;charset=utf-8, ${ encodeURIComponent(text) }`,
        download: filename,
        style: "display: none"
    })

    document.body.appendChild(el)
    el.click()
    el.remove()
}