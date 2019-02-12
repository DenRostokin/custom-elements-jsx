class Component extends HTMLElement {
    constructor() {
        super()
    }

    _addContent(content) {
        this.innerHTML = ''

        if (content) {
            this.appendChild(content)
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
