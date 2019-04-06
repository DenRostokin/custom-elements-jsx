export const areSameTagNames = (el1 = {}, el2 = {}) =>
    el1.tagName && el2.tagName && el1.tagName === el2.tagName

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

export const setAttribute = (element, name, value) => {
    if (name === 'xlinkHref')
        return element.setAttributeNS(
            'http://www.w3.org/1999/xlink',
            'xlink:href',
            value
        )

    return element.setAttribute(name, value)
}
