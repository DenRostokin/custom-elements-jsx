import jsx, { Component } from '../index'

class CustomInput extends Component {
    constructor() {
        super()

        this.onKeyPress = this.onKeyPress.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
    }

    onKeyPress(event) {
        const keys = ['Enter']

        // exclude special characters
        if (!keys.includes(event.key)) {
            // take previous value and add new character
            const value = event.target.value + event.key
            const newEvent = { ...event, target: { ...event.target, value } }

            this.props.onChange(newEvent)
        }

        // disable updating values implicity
        event.preventDefault()
    }

    // onKeyPress doesn't trigger on backspace and delete actions
    // for this case we need to use onKeyUp
    onKeyUp(event) {
        // react only on specified keys
        const keys = ['Backspace', 'Delete']

        if (keys.includes(event.key)) {
            this.props.onChange(event)
        }

        this.props.onKeyUp && this.props.onKeyUp(event)
    }

    render() {
        /* eslint-disable-next-line */
        const { onChange, children, ...other } = this.props

        return (
            <input
                {...other}
                onKeyPress={this.onKeyPress}
                onKeyUp={this.onKeyUp}
            />
        )
    }
}

if (!window.customElements.get('custom-input'))
    window.customElements.define('custom-input', CustomInput)
