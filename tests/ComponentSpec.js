import jsx, { Component } from '../src'

describe('Custom Element', () => {
    it('renders correctly', () => {
        class CustomElement extends Component {
            render() {
                return <div>{this.props.num}</div>
            }
        }

        window.customElements.define('custom-element', CustomElement)

        const element = <custom-element num={3} />

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<custom-element><div>3</div></custom-element>'
        )

        document.body.removeChild(element)
    })

    it('renders children correctly', () => {
        class RenderChildren extends Component {
            render() {
                return this.props.children
            }
        }

        window.customElements.define('render-children', RenderChildren)

        const element = (
            <render-children>
                <span>Text</span>
                <a href="#">Link</a>
                <div>Block</div>
                <p>Paragraph</p>
            </render-children>
        )

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<render-children><span>Text</span><a href="#">Link</a><div>Block</div><p>Paragraph</p></render-children>'
        )

        document.body.removeChild(element)
    })

    it('renders special attributes using catch instruction', () => {
        const element = (
            <render-special-attrs
                id="value"
                role="info"
                aria-labelledby="tab"
                data-test="for-testing"
                catch={['id', 'role', 'aria-labelledby', 'data-test']}
            />
        )

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<render-special-attrs id="value" role="info" aria-labelledby="tab" data-test="for-testing"></render-special-attrs>'
        )

        document.body.removeChild(element)
    })

    it('renders className correctly', () => {
        class RenderClassName extends Component {
            render() {
                return <div className={this.props.className} />
            }
        }

        window.customElements.define('render-class-name', RenderClassName)

        const element = <render-class-name className="simple-class" />

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<render-class-name><div class="simple-class"></div></render-class-name>'
        )

        document.body.removeChild(element)
    })

    it('renders style correctly', () => {
        class RenderStyle extends Component {
            render() {
                return <div style={this.props.style} />
            }
        }

        window.customElements.define('render-style', RenderStyle)

        const element = (
            <render-style
                style={{
                    color: '#000',
                    marginTop: '10px',
                    'padding-left': '15px',
                }}
            />
        )

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<render-style><div style="color: rgb(0, 0, 0); margin-top: 10px; padding-left: 15px;"></div></render-style>'
        )

        document.body.removeChild(element)
    })

    it('gets refs correctly', () => {
        class RefElement extends Component {
            constructor() {
                super()

                this.getRef = this.getRef.bind(this)
            }

            getRef(element, attrs) {
                this.ref = element
                this.attrs = attrs
            }

            render() {
                return <div id="root" ref={this.getRef} />
            }
        }

        window.customElements.define('ref-element', RefElement)

        const element = <ref-element />

        document.body.appendChild(element)

        expect(element.ref.tagName).toBe('DIV')
        expect(element.attrs.id).toBe('root')

        document.body.removeChild(element)
    })

    it('adds event listeners correctly', () => {
        class EventElement extends Component {
            constructor() {
                super()

                this.onClick = this.onClick.bind(this)
            }

            onClick() {
                this.value = 'clicked'
            }

            render() {
                return <div onClick={this.onClick} />
            }
        }

        window.customElements.define('event-element', EventElement)

        const element = <event-element />

        document.body.appendChild(element)

        const event = new Event('click')

        element.children[0].dispatchEvent(event)

        expect(element.value).toBe('clicked')

        document.body.removeChild(element)
    })

    it('renders single attribute as true in props object', () => {
        class SingleAttr extends Component {
            render() {
                const { isTrue } = this.props

                return <div>{String(isTrue)}</div>
            }
        }

        window.customElements.define('single-attr', SingleAttr)

        const element = <single-attr isTrue />

        document.body.appendChild(element)

        expect(element.innerHTML).toBe('<div>true</div>')

        document.body.removeChild(element)
    })
})

describe('Custom fragment', () => {
    it('renders nested children correctly', () => {
        class RenderFragment extends Component {
            render() {
                return (
                    <custom-fragment>
                        <span>Text</span>
                        <a href="#">Link</a>
                        <div>Block</div>
                        <p>Paragraph</p>
                    </custom-fragment>
                )
            }
        }

        window.customElements.define('render-fragment', RenderFragment)

        const element = <render-fragment />

        document.body.appendChild(element)

        expect(element.outerHTML).toBe(
            '<render-fragment><span>Text</span><a href="#">Link</a><div>Block</div><p>Paragraph</p></render-fragment>'
        )

        document.body.removeChild(element)
    })
})

describe('Custom element`s update function', () => {
    it('does not reset children state after updating', () => {
        class RootElement extends Component {
            constructor() {
                super()

                this.state = { value: 1 }
                this.increaseValue = this.increaseValue.bind(this)
            }

            increaseValue() {
                this.setState({ value: this.state.value + 1 })
            }

            render() {
                return (
                    <child-element
                        value={this.state.value}
                        increaseValue={this.increaseValue}
                    />
                )
            }
        }

        class ChildElement extends Component {
            constructor() {
                super()

                this.state = { count: 0 }
                this.increaseCount = this.increaseCount.bind(this)
            }

            increaseCount() {
                this.setState({ count: this.state.count + 1 })
            }

            render() {
                const { value } = this.props

                return <h3>{value}</h3>
            }
        }

        window.customElements.define('root-element', RootElement)
        window.customElements.define('child-element', ChildElement)

        const root = <root-element />

        document.body.appendChild(root)

        let child = root.children[0]

        child.increaseCount()
        root.increaseValue()

        child = root.children[0]

        // child was updated
        expect(child.outerHTML).toBe(
            '<child-element><h3>2</h3></child-element>'
        )
        // but child state wasn't reset
        expect(child.state.count).toBe(1)

        document.body.removeChild(root)
    })

    it('updates multiple children correctly', () => {
        class ParentElement extends Component {
            constructor() {
                super()

                this.state = { isShown: false }

                this.showBlock = this.showBlock.bind(this)
            }
            showBlock() {
                this.setState({ isShown: !this.state.isShown })
            }

            render() {
                const { isShown } = this.state

                return (
                    <custom-fragment>
                        {isShown && <div>Popup</div>}
                        <second-child />
                    </custom-fragment>
                )
            }
        }

        class SecondChild extends Component {
            constructor() {
                super()

                this.state = { value: 1 }
                this.increaseValue = this.increaseValue.bind(this)
            }

            increaseValue() {
                this.setState({ value: this.state.value + 1 })
            }

            render() {
                return null
            }
        }

        window.customElements.define('parent-element', ParentElement)
        window.customElements.define('second-child', SecondChild)

        const parent = <parent-element />

        document.body.appendChild(parent)

        parent.children[0].increaseValue()
        parent.showBlock()

        expect(parent.children.length).toBe(2)
        expect(parent.children[0].outerHTML).toBe('<div>Popup</div>')
        expect(parent.children[1].state.value).toBe(2)

        document.body.removeChild(parent)
    })
})
