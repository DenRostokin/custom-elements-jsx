import { isCustomElement } from './utils'

class Component extends HTMLElement {
    state = {}

    _childrenState = {}

    get childrenState() {
        return this._childrenState
    }

    set childrenState(state) {
        this._childrenState = { ...this._childrenState, ...state }
    }

    connectedCallback() {
        this.appendChild(this.render())

        this.componentDidMount()
    }

    disconnectedCallback() {
        this.componentWillUnmount()
    }

    _getNestedStatesFrom(children) {
        return Array.prototype.reduce.call(
            children,
            (acc, child) => {
                let state = { ...acc }

                if (isCustomElement(child)) {
                    state[child.props.key || child.tagName] = child.state
                }

                if (child.children.length) {
                    const childrenState = this._getNestedStatesFrom(
                        child.children
                    )

                    state = { ...state, ...childrenState }
                }

                return state
            },
            {}
        )
    }

    // mutate children collection
    _setChildrenState(children) {
        Array.prototype.forEach.call(children, child => {
            if (isCustomElement(child)) {
                child.state =
                    this.childrenState[child.props.key || child.tagName] || {}
            }

            if (child.children.length) {
                this._setChildrenState(child.children)
            }
        })
    }

    _setStateFromPrevChildrenForNew(child) {
        this.childrenState = this._getNestedStatesFrom(this.children)

        this._setChildrenState([child])
    }

    update = () => {
        if (this.children.length) {
            const newChild = this.render()

            this._setStateFromPrevChildrenForNew(newChild)

            this.replaceChild(newChild, this.children[0])

            this.componentDidUpdate()
        }
    }

    setState = newState => {
        this.state = { ...newState }

        this.update()
    }

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return document.createElement('div')
    }
}

export default Component
