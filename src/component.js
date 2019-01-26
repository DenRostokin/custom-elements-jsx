class Component extends HTMLElement {
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

    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return document.createElement('div')
    }
}

export default Component
