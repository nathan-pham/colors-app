export const pick = (array) => array[Math.floor(Math.random() * array.length)]

export const partition = (array, size=4) => {
    let arrays = []

    for(let i = 0; i < array.length; i += size) {
        arrays.push(array.slice(i, i + size))
    }

    return arrays
}

export const color = () => (
    '#' + Math.floor(Math.random() * 8 ** 8).toString(16).padStart(6, '0')
)