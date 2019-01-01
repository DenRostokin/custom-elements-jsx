import jsx, { Component } from '../src/index'

// it works incorrectly
describe('Custom Element', () => {
    test('renders correctly', () => {
        class CustomElement extends Component {
            render() {
                return <div>{this.props.num}</div>
            }
        }

        // window.customElements.define('custom-element', CustomElement)

        function renderCustomElement() {
            return <custom-element num={2} />
        }

        expect(renderCustomElement().outerHTML).toBe(
            '<custom-element></custom-element>'
        )
    })
})
