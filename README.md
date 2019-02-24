## Custom elements JSX-render

[![travis](https://travis-ci.org/DenRostokin/custom-elements-jsx.svg?branch=master)](https://travis-ci.org/DenRostokin/custom-elements-jsx)

Small library for creating HTMLElements from JSX markup

### How to install

The required packages are `@babel/plugin-syntax-jsx`, `@babel/plugin-transform-react-jsx` and `custom-elements-jsx`:

```sh
$ npm install --save-dev @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx

$ npm install --save custom-elements-jsx
```

or

```sh
$ yarn add --dev @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx

$ yarn add custom-elements-jsx
```

First of all you need to config your .babelrc file like this:

```json
// .babelrc
{
  "plugins": [
    "@babel/plugin-syntax-jsx",
    ["@babel/plugin-transform-react-jsx", { "pragma": "jsx" }]
  ]
}
```

Also you need to configure your babel for supporting ES6 if you want to use classes

### Usage

Lets create our custom element:

```jsx
import jsx, { Component } from "custom-elements-jsx";

class CustomElement extends Component {
  render() {
    const { children, age } = this.props;

    return (
      <div className="customElement-container">
        <h3>{`Hello, ${children}`}</h3>
        <h4>{`You are ${age} years old`}</h4>
      </div>
    );
  }
}

// Check that the element hasn't already been registered
if (!window.customElements.get("custom-element"))
  window.customElements.define("custom-element", CustomElement);
```

Now you can use this component in your html-file:

```html
<body>
  <custom-element age="30">Den</custom-element>
</body>
```

Don`t forget specify you script file in the bottom of the body tag
