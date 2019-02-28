import jsx, { Component } from '../index'

class CustomInput extends Component {
    setRef = element => (this.input = element)

    onChangeValue = value => {
        this.props.onChange(value)

        if (this.input) this.input.value = value
    }

    onKeyPress = event => {
        const keys = ['Enter']

        // exclude special characters
        if (!keys.includes(event.key)) {
            // take previous value and add new character
            const value = event.target.value + event.key

            this.onChangeValue(value)
        }

        // disable updating values implicity
        event.preventDefault()
    }

    // onKeyPress doesn't trigger on backspace and delete actions
    // for this case we need to use onKeyUp
    onKeyUp = event => {
        // react only on specified keys
        const keys = ['Backspace', 'Delete']

        if (keys.includes(event.key)) {
            this.onChangeValue(event.target.value)
        }

        this.props.onKeyUp && this.props.onKeyUp(event)
    }

    render() {
        /* eslint-disable-next-line */
        const { ref, type = 'text', onChange, children, ...other } = this.props

        return (
            <input
                {...other}
                ref={ref || this.setRef}
                type={type}
                onKeyPress={this.onKeyPress}
                onKeyUp={this.onKeyUp}
            />
        )
    }
}

if (!window.customElements.get('custom-input'))
    window.customElements.define('custom-input', CustomInput)
