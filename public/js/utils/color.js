export const rgbToHex = (a) => (
    a 
        ? (
        "#" + a.split("(")[1].split(")")[0]
            .split(',')
            .map(v => parseInt(v.trim()).toString(16).padStart(2, '0'))
            .join('')
        )
        : null
)