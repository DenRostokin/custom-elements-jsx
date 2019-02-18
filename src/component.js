import { createFragmentWithChildren } from './index'

class Component extends HTMLElement {
    constructor() {
        super()
    }

    _addContent(content) {
        this.innerHTML = ''

        if (content) {
            if (content instanceof Array) {
                return this.appendChild(createFragmentWithChildren(content))
            }

            return this.appendChild(content)
        }
    }

    connectedCallback() {
        this.componentDidCreate()

        this._addContent(this.render())

        this.componentDidMount()
    }

    disconnectedCallback() {
        this.innerHTML = ''

        this.componentWillUnmount()
    }

    update = () => {
        this._addContent(this.render())

        this.componentDidUpdate()
    }

    componentDidCreate() {}

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return null
    }
}

export default Component
