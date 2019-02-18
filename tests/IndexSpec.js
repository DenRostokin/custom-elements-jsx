import jsx from '../src'

describe('Simple jsx tests: ', () => {
    it('Basic Single Component <div /> renders correctly', () => {
        const render = () => {
            return <div />
        }

        expect(render().outerHTML).toBe('<div></div>')
    })

    it('Nested Component ul>li>a renders correctly', () => {
        const render = () => {
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

    it('Siblings Components ul>li*3 renders correctly', () => {
        const render = () => {
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
})

describe('SVG Component', () => {
    it('renders correctly', () => {
        const render = () => {
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
                            style={{ fill: 'rgb(255, 205, 5)' }}
                        />
                    </g>
                </svg>
            )
        }

        expect(render().outerHTML).toBe(
            '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141 41" style="min-width: 110px; height: 40px; width: 140px;"><title>Logo Title Tag</title><g><path d="M241.74,421.43v-41h28.61v41H241.74Zm24.47-4.13V384.56H245.86V417.3h20.35Z" transform="translate(-241.74 -380.43)" style="fill: rgb(255, 205, 5);"></path></g></svg>'
        )
    })

    it('renders xlinkHref for SVG sprites', () => {
        const render = () => {
            return (
                <svg>
                    <use xlinkHref="#star-open" />
                </svg>
            )
        }

        expect(render().outerHTML).toBe(
            '<svg><use xlink:href="#star-open"></use></svg>'
        )
    })
})

describe('Component', () => {
    it('with Attributes renders correctly', () => {
        const render = () => {
            return <img src="img_.jpg" width="500" height="600" />
        }

        expect(render().outerHTML).toBe(
            '<img src="img_.jpg" width="500" height="600">'
        )
    })

    it('with Data Attributes renders correctly', () => {
        const render = () => {
            return <div data-merci="merci beaucoup" />
        }

        expect(render().outerHTML).toBe(
            '<div data-merci="merci beaucoup"></div>'
        )
    })

    it('with className renders correctly', () => {
        const render = () => {
            return <p className="chan">Lorem</p>
        }

        expect(render().outerHTML).toBe('<p class="chan">Lorem</p>')
    })

    it('with style renders correctly', () => {
        const render = () => {
            return (
                <div
                    style={{
                        color: '#000',
                        marginTop: '10px',
                        'padding-left': '15px',
                    }}
                />
            )
        }

        expect(render().outerHTML).toBe(
            '<div style="color: rgb(0, 0, 0); margin-top: 10px; padding-left: 15px;"></div>'
        )
    })

    it('render dangerouslySetInnerHTML correctly', () => {
        const render = () => {
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: '<span>StrangerDanger</span>',
                    }}
                />
            )
        }

        expect(render().outerHTML).toBe(
            '<div><span>StrangerDanger</span></div>'
        )
    })
})

describe('Conditional Component', () => {
    it('with true renders correctly', () => {
        const render = () => {
            return <div>{true && 2}</div>
        }

        expect(render().outerHTML).toBe('<div>2</div>')
    })

    it('with false renders correctly', () => {
        const render = () => {
            return <div>{false && 2}</div>
        }

        expect(render().outerHTML).toBe('<div></div>')
    })

    it('maps correctly', () => {
        const render = () => {
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
