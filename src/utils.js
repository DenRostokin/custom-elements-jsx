export const isSVG = tagName => {
    const SVGTags = ['path', 'svg', 'use', 'g']

    return SVGTags.includes(tagName.toLowerCase())
}

export const isCustomElement = element => element.tagName.includes('-')

const camelCaseToDash = str =>
    str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const objectToStyleString = (styles = {}) =>
    Object.entries(styles)
        .map(
            ([propName, propValue]) =>
                `${camelCaseToDash(propName)}: ${propValue}`
        )
        .join(';')

export const getEventName = name => name.slice(2).toLowerCase()
