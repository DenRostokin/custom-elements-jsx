export const isSVG = tagName => {
    const SVGTags = ['path', 'svg', 'use', 'g']

    return SVGTags.includes(tagName.toLowerCase())
}

export const isCustomElement = element => element.tagName.includes('-')

export const objectToStyleString = (styles = {}) =>
    Object.entries(styles)
        .map(([propName, propValue]) => `${propName}: ${propValue}`)
        .join(';')

export const getEventName = name => name.slice(2).toLowerCase()
