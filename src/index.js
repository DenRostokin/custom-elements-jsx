import * as utils from './utils'

export { default as Component } from './component'

const addAttributes = (element, attrs = {}) => {
    const props = Object.entries(attrs || {})

    props.forEach(([propName, propValue]) => {
        if (utils.isCustomElement(element)) {
            // In "catch" prop is stored props that must be added as attributes
            // or event handlers
            let propsCatch = []

            if (Array.isArray(attrs.catch)) propsCatch = attrs.catch
            if (typeof attrs.catch === 'string') propsCatch = [attrs.catch]

            if (propName === 'catch') return

            if (!propsCatch.includes(propName)) {
                return (element.props = {
                    ...element.props,
                    [propName]: propValue,
                })
            }
        }

        if (propName === 'className')
            return element.setAttribute('class', propValue)

        if (propName === 'style')
            return (element.style.cssText = utils.objectToStyleString(
                propValue
            ))

        if (propName === 'ref' && typeof propValue === 'function')
            return propValue(element, attrs)

        if (propName === 'dangerouslySetInnerHTML')
            return (element.innerHTML = propValue.__html)

        // if attr value is a function then add it as element property
        if (typeof propValue === 'function') {
            const eventName = propName.toLowerCase()
            const regexp = /^(on[a-z]+)$/i

            if (regexp.test(eventName)) {
                element[eventName] = propValue
            }

            return
        }

        // if attr is a string then add it as attribute
        if (typeof propValue === 'string')
            return utils.setAttribute(element, propName, propValue)
    })

    return element
}

const fillFragmentByChildren = (fragment, props, child, index) => {
    if (child) {
        if (child instanceof Array) {
            return child.forEach(
                fillFragmentByChildren.bind(this, fragment, props)
            )
        }

        if (typeof child === 'string' || typeof child === 'number') {
            const textnode = document.createTextNode(child)

            textnode.__DOMPosition__ = index

            return fragment.appendChild(textnode)
        }

        if (utils.isCustomElement(child))
            child.props = { ...child.props, ...props }

        child.__DOMPosition__ = index

        fragment.appendChild(child)
    }
}

export const createFragmentWithChildren = (children, props = {}) => {
    const fragment = document.createDocumentFragment()

    // fill fragment by children
    children.forEach(fillFragmentByChildren.bind(this, fragment, props))

    return fragment
}

const jsx = (tagName, attrs, ...children) => {
    // <custom-fragment> element
    if (tagName === 'custom-fragment') {
        return createFragmentWithChildren(children)
    }

    // create main element
    const element = utils.isSVG(tagName)
        ? document.createElementNS('http://www.w3.org/2000/svg', tagName)
        : document.createElement(tagName)

    // create children fragment and append it to the main element
    if (utils.isCustomElement(element)) {
        element.props = { children }
    } else {
        const fragment = createFragmentWithChildren(children)

        element.appendChild(fragment)
    }

    // add attributes to the main element.
    // if we have custom element, then attributes will be added like props
    // if we haven`t than as simple attributes
    return addAttributes(element, attrs)
}

export default jsx
