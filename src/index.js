import * as utils from './utils'

export { default as Component } from './component'

const addAttributes = (element, attrs) => {
    const props = Object.entries(attrs || {})

    props.forEach(([propName, propValue]) => {
        // if we have custom element then we should add attribute to props
        if (utils.isCustomElement(element)) {
            // add special attributes like id, data- or aria-attributes
            const hasSpecialAttrs =
                propName === 'id' ||
                propName === 'role' ||
                propName.includes('data-') ||
                propName.includes('aria-')

            if (hasSpecialAttrs) {
                element.setAttribute(propName, propValue)
            }

            return (element.props = {
                ...element.props,
                [propName]: propValue,
            })
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

        // if we have correct event name and event handler is a function
        // then add it to an event listener
        if (typeof propValue === 'function') {
            const eventName = propName.toLowerCase()

            return (element[eventName] =
                eventName in element ? propValue : null)
        }

        utils.setAttribute(element, propName, propValue)
    })

    return element
}

const fillFragmentByChildren = (fragment, props, child, index) => {
    if (child) {
        if (typeof child === 'string' || typeof child === 'number') {
            const textnode = document.createTextNode(child)

            textnode.__DOMPosition__ = index

            return fragment.appendChild(textnode)
        }

        if (child instanceof Array) {
            return child.forEach(
                fillFragmentByChildren.bind(this, fragment, props)
            )
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
