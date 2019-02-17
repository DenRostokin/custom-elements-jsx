import jsx, { Component } from '../src'

describe('Custom Element', () => {
    it('renders correctly', () => {
        class CustomElement extends Component {
            render() {
                return <div>{this.props.num}</div>
            }
        }

        if (!window.customElements.get('custom-element'))
            window.customElements.define('custom-element', CustomElement)

        const element = <custom-element num={3} />

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<custom-element><div>3</div></custom-element>'
        )

        document.body.removeChild(element)
    })
})
