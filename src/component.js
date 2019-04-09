import { createFragmentWithChildren } from './index'
import { isCustomElement, setAttribute, areSameTagNames } from './utils'

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

    _cloneEventHandlers(newChild = {}, existChild = {}) {
        const regexp = /^(on[a-z]+)$/i

        for (let key in newChild) {
            if (regexp.test(key) && (existChild[key] || newChild[key])) {
                existChild[key] = newChild[key]
            }
        }
    }

    _cloneAttributes(newChild, existChild) {
        if (newChild.hasAttributes()) {
            [...newChild.attributes].forEach(({ name, value }) => {
                // don't change value attribute
                // change value property
                if (name === 'value') {
                    existChild.value = newChild.value
                } else {
                    const attr = existChild.getAttribute(name)

                    if (attr !== value) setAttribute(existChild, name, value)
                }
            })
        }
    }

    _mergeNodes(newChild, existChild, parentNode) {
        if (areSameTagNames(newChild, existChild)) {
            // add new attributes
            this._cloneAttributes(newChild, existChild)

            // add new props to custom element
            if (isCustomElement(existChild)) {
                existChild.props = newChild.props

                // exec update function
                return existChild.update()
            }

            // add new event handlers
            this._cloneEventHandlers(newChild, existChild)

            // update children
            return this._updateContent(
                newChild.childNodes,
                existChild.childNodes,
                existChild
            )
        }

        parentNode.replaceChild(newChild, existChild)
    }

    _mergeCollections(newContent, existChildren, parentNode) {
        if (newContent.length) {
            let i, j

            for (i = 0, j = 0; i < newContent.length; ++i, ++j) {
                const newChild = newContent[i]
                const newChildPosition =
                    typeof newChild.__DOMPosition__ === 'number'
                        ? newChild.__DOMPosition__
                        : 0
                const existChild = existChildren[j]
                const existChildPosition =
                    existChild && typeof existChild.__DOMPosition__ === 'number'
                        ? existChild.__DOMPosition__
                        : 0

                if (!existChild) {
                    parentNode.appendChild(newChild)

                    continue
                }

                if (newChildPosition < existChildPosition) {
                    parentNode.insertBefore(newChild, existChild)

                    --j

                    continue
                }

                if (newChildPosition > existChildPosition) {
                    parentNode.removeChild(existChild)

                    --i

                    continue
                }

                if (newChildPosition === existChildPosition) {
                    this._mergeNodes(newChild, existChild, parentNode)
                }
            }

            if (existChildren[j]) {
                for (i = j; i < existChildren.length; ++i) {
                    parentNode.removeChild(existChildren[i])
                }
            }
        } else {
            parentNode.innerHTML = ''
        }
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
        if (!newContent) return (parentNode.innerHTML = '')

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

        // if newContent is already collection then do nothing. if it's not,
        // then newContent is HTMLElement and we must create array with it
        const newCollection =
            typeof newContent[Symbol.iterator] === 'function'
                ? [...newContent]
                : [newContent]

        this._mergeCollections(newCollection, [...existChildren], parentNode)
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
        this._updateContent(this.render())

        this.componentDidUpdate()
    }

    componentDidCreate() {}

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    setState(newState) {
        if (typeof newState === 'function') {
            const computedState = newState({ ...this.state }, { ...this.props })

            this.state = { ...this.state, ...computedState }
        } else {
            this.state = { ...this.state, ...newState }
        }

        this.update()
    }

    render() {
        return null
    }
}

export default Component
