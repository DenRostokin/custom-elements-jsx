import jsx from '../src/index'

test('Basic Single Component <div /> renders correctly', () => {
    function render() {
        return <div />
    }

    expect(render().outerHTML).toBe('<div></div>')
})

test('Nested Component ul>li>a renders correctly', () => {
    function render() {
        return (
            <ul>
                {' '}
                <li>
                    {' '}
                    <a href="http://URL.com">URL</a>{' '}
                </li>{' '}
            </ul>
        )
    }

    expect(render().outerHTML).toBe(
        '<ul> <li> <a href="http://URL.com">URL</a> </li> </ul>'
    )
})

test('Siblings Components ul>li*3 renders correctly', () => {
    function render() {
        return (
            <ul>
                <li>one</li>
                <li>two</li>
                <li>nine</li>
            </ul>
        )
    }

    expect(render().outerHTML).toBe(
        '<ul><li>one</li><li>two</li><li>nine</li></ul>'
    )
})

describe('SVG Component', () => {
    test('renders correctly', () => {
        function render() {
            return (
                <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    style={{
                        'min-width': '110px',
                        height: '40px',
                        width: '140px',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 141 41"
                >
                    <title>Logo Title Tag</title>
                    <g>
                        <path
                            d="M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z"
                            transform="translate(-241.74 -380.43)"
                            style={{ fill: '#ffcd05' }}
                        />
                    </g>
                </svg>
            )
        }

        expect(render().outerHTML).toBe(
            '<svg id="Layer_1" data-name="Layer 1" style="min-width: 110px; height: 40px; width: 140px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141 41"><title>Logo Title Tag</title><g><path d="M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z" transform="translate(-241.74 -380.43)" style="fill: #ffcd05;"></path></g></svg>'
        )
    })

    test('renders xlinkHref for SVG sprites', () => {
        function renderDataAttrs() {
            return (
                <svg>
                    <use xlinkHref="#star-open" />
                </svg>
            )
        }

        expect(renderDataAttrs().outerHTML).toBe(
            '<svg><use xlink:href="#star-open"></use></svg>'
        )
    })
})

describe('Component', () => {
    test('with Attributes renders correctly', () => {
        function renderAttrs() {
            return <img src="img_.jpg" width="500" height="600" />
        }

        expect(renderAttrs().outerHTML).toBe(
            '<img src="img_.jpg" width="500" height="600">'
        )
    })

    test('with Data Attributes renders correctly', () => {
        function renderDataAttrs() {
            return <div data-merci="merci beaucoup" />
        }

        expect(renderDataAttrs().outerHTML).toBe(
            '<div data-merci="merci beaucoup"></div>'
        )
    })

    test('Components with classname renders correctly', () => {
        function render() {
            return <p className="chan">Lorem</p>
        }

        expect(render().outerHTML).toBe('<p class="chan">Lorem</p>')
    })
})

describe('Conditional Component', () => {
    test('with true renders correctly', () => {
        function render() {
            return <div>{true && 2}</div>
        }

        expect(render().outerHTML).toBe('<div>2</div>')
    })

    test('with false renders correctly', () => {
        function notRender() {
            return <div>{false && 2}</div>
        }

        expect(notRender().outerHTML).toBe('<div></div>')
    })

    test('maps correctly', () => {
        function render() {
            const arr = [1, 2, 3]
            return (
                <div>
                    {arr.map(item => (
                        <p>{item}</p>
                    ))}
                </div>
            )
        }

        expect(render().outerHTML).toBe('<div><p>1</p><p>2</p><p>3</p></div>')
    })
})

test('Component render dangerouslySetInnerHTML', () => {
    function render() {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: '<span>StrangerDanger</span>',
                }}
            />
        )
    }

    expect(render().outerHTML).toBe('<div><span>StrangerDanger</span></div>')
})
