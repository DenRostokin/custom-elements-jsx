import { createFragmentWithChildren } from './index'
import { isCustomElement } from './utils'

class Component extends HTMLElement {
    constructor() {
        super()

        this.state = {}

        this.update = this.update.bind(this)
        this.setState = this.setState.bind(this)
    }

    _removeContent() {
        this.innerHTML = ''
    }

    _addContent(content) {
        this._removeContent()

        if (content) {
            const children = Array.isArray(content)
                ? createFragmentWithChildren(content)
                : content

            this.appendChild(children)
        }
    }

    _cloneEventHandlers(newChild, existChild) {
        const regexp = /^(on[a-z]+)$/i

        for (let key in newChild) {
            if (regexp.test(key)) existChild[key] = newChild[key]
        }
    }

    _cloneAttributes(newChild, existChild) {
        if (newChild.hasAttributes()) {
            [...newChild.attributes].forEach(({ name, value }) => {
                if (name === 'xlinkHref') {
                    existChild.setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'xlink:href',
                        value
                    )
                } else {
                    existChild.setAttribute(name, value)
                }
            })
        }
    }

    _mergeNodes(newChild, existChild, parentNode) {
        if (!existChild && !newChild) return

        if (existChild && !newChild) return parentNode.removeChild(existChild)

        if (!existChild && newChild) return parentNode.appendChild(newChild)

        if (
            existChild.tagName &&
            newChild.tagName &&
            existChild.tagName === newChild.tagName
        ) {
            // add attributes
            this._cloneAttributes(newChild, existChild)

            // add props to custom element
            if (isCustomElement(existChild)) {
                // add props
                existChild.props = newChild.props

                // exec update function
                return existChild.update()
            }

            // add event handlers
            this._cloneEventHandlers(newChild, existChild)

            // update children
            return this._updateContent(
                newChild.childNodes,
                existChild.childNodes,
                existChild
            )
        }

        return parentNode.replaceChild(newChild, existChild)
    }

    _updateContent(
        newContent,
        existChildren = this.childNodes,
        parentNode = this
    ) {
        // existChildren is always collection of HTMLElements
        // newContent can be ether colection of HTMLElements, or HTMLElement,
        // or DocumentFragment, or Array, or (null | undefined | false)

        // newContent is null | undefined | false
        if (!newContent) return this._removeContent()

        // newContent is array
        if (Array.isArray(newContent))
            return this._updateContent(
                createFragmentWithChildren(newContent).childNodes,
                existChildren,
                parentNode
            )

        // newContent is DocumentFragment
        if (newContent.nodeType === 11)
            return this._updateContent(
                newContent.childNodes,
                existChildren,
                parentNode
            )

        // newContent is collection
        if (typeof newContent[Symbol.iterator] === 'function') {
            // remove existing children that are not in the newContent

            [...newContent].forEach((newChild, index) => {
                const existChild = existChildren[index]

                return this._mergeNodes(newChild, existChild, parentNode)
            })

            // for (let i = newContent.length; i < existChildren.length; i++) {
            //     parentNode.removeChild(existChildren[i])
            // }

            return
        }

        // newContent is HTMLElement
        this._mergeNodes(newContent, existChildren[0], parentNode)

        for (let i = 1; i < existChildren.length; i++) {
            parentNode.removeChild(existChildren[i])
        }
    }

    connectedCallback() {
        this.componentDidCreate()

        this._addContent(this.render())

        this.componentDidMount()
    }

    disconnectedCallback() {
        this._removeContent()

        this.componentWillUnmount()
    }

    update() {
        // debugger
        this._updateContent(this.render())

        this.componentDidUpdate()
    }

    componentDidCreate() {}

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    setState(newState) {
        if (typeof newState === 'function') {
            this.state = newState(this.state)
        } else {
            this.state = newState
        }

        this.update()
    }

    render() {
        return null
    }
}

export default Component
