class Component extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.componentDidCreate()

        const content = this.render()

        if (content) {
            this.appendChild(content)
        }

        this.componentDidMount()
    }

    disconnectedCallback() {
        this.componentWillUnmount()
    }

    update = () => {
        const content = this.render()

        if (content) {
            if (this.children.length) {
                this.replaceChild(content, this.children[0])
            } else {
                this.appendChild(content)
            }
        } else {
            if (this.children.length) {
                this.removeChild(this.children[0])
            }
        }

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
