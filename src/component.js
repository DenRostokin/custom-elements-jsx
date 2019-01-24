class Component extends HTMLElement {
    state = {}

    connectedCallback() {
        this.appendChild(this.render())

        this.componentDidMount()
    }

    disconnectedCallback() {
        this.componentWillUnmount()
    }

    update = () => {
        if (this.children.length) {
            this.replaceChild(this.render(), this.children[0])

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
        return null
    }
}

export default Component
