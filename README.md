## Custom elements JSX-render

[![travis](https://travis-ci.org/DenRostokin/custom-elements-jsx.svg?branch=master)](https://travis-ci.org/DenRostokin/custom-elements-jsx)

Small library for creating HTMLElements from JSX markup

## Contents

- [How To Install](#how-to-install)
- [Usage](#usage)
- [Features](#features)
- [How To Test](#how-to-test)

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

Remember that you must use dash in the custom elements names.
**[Specification is here](https://developers.google.com/web/fundamentals/web-components/customelements)**

Now you can use this component inside of other custom elements or append it to the root element:

```jsx
const element = <custom-element age={26}>Den</custom-element>;

const root = document.getElementById("root");

// element is instanse of the HTMLElement
root.appendChild(element);
```

Of cause element with id="root" should exist in your html-file:

```html
<body>
  <div id="root"></div>

  <script src="script.js"></script>
  <body></body>
</body>
```

This is a React way when you have only one empty div-element and you render your app into this element.

When you create a custom component first of all you go to the constructor of this component. You should remember, that **you don't have props inside of constructor method**. If you want to do something before a render function you have to call special method, called `componentDidCreate`. This method will be called when component will be added into DOM tree, but before the render function.

After this method you will go to the render method. You can return such values as: *HTMLElement*, *array of HTMLElements like children*, *fragment created by createFragmentWithChildren()*, *null, undefind or false*. 

Also you have 3 additional methods of component lifecycle: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`. Method `componentDidMount` will be called after the render method. Method `componentWillUnmount` will be called after removing custom element from DOM tree.

You can update custom element content by using method `update()` without parameters.`render` method  will be called inside of `update` and then will be called `componentDidUpdate` method.

**You must remember that during the updating all content of your custom element will be removed from DOM tree and new content will be added to the DOM**

It means that if you have other custom elements inside of parent custom element then nested elements will not be updated. They will be removed (will be called `componentWillUnmount` method) and then will be added (will be called `constructor`, `componentDidCreate`, `render` and `componentDidMount` methods). It is important if you are going to store some values in your custom element:

```jsx
import jsx, { Component } from 'custom-elements-jsx'

class CustomElement extends Component {
  constructor() {
    this.value = 1
  }
  
  incValue() {
    this.value++
    
    this.update()
  }
  
  render() {
    return (
      <div id="container">
        <h3>{this.value}</h3>
        <button onClick={this.incValue}>Increment!</button>
      </div>
    }
  }
}
```

Here is an example how you can connect Redux to your custom element:

```jsx
import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from './store.js'
import * as actions from './actions.js'

const mapState = state => ({
  value: state.value,
})

const bindedActions = bindActionCreators(actions, store.dispatch)

class CustomElement extends Component {
  componentDidMount() {
    store.subscribe(this.update)
  }
  
  render() {
    const { value } = mapState(store.getState())
    
    return (
      <button onClick={bindedActions.incValue}>{value}</button>
    )
  }
}
```

You should use `store.getState()` inside of `render` method to get new values from the store after updating.

### Features

Custom-elements-jsx allows you to use element `<custom-fragment>`. This element works like React.Fragment:

```jsx
import jsx, { Component } from "custom-elements-jsx";

class ElementWithFragment extends Component {
  render() {
    return (
      <custom-fragment>
        <h1>Title</h1>
        <div>Simple block</div>
        <p>Empty paragraph</p>
      </custom-fragment>
    );
  }
}

if (!window.customElements.get("element-with-fragment"))
  window.customElements.define("element-with-fragment", ElementWithFragment);

document.body.appendChild(<element-with-fragment />);
```

After that you will get the markup like this:

```html
<body>
  <element-with-fragment>
    <h1>Title</h1>
    <div>Simple block</div>
    <p>Empty paragraph</p>
  </element-with-fragment>
</body>
```

Also you can use fuction `createFragmentWithChildren(children, props)`. This function applies array of children (each child must be an instanse of the HTMLElement) and props object and adds props into each child. Then it creates fragment using `document.createDocumentFragment()` function and fills the fragment by children with props.

```js
import { createFragmentWithChildren } from "custom-elements-jsx";

const div = document.createElement("div");
const p = document.createElement("p");

const children = [div, p];

document.body.appendChild(createFragmentWithChildren(children));
```

This function can be usefull if you need to add props to the children inside your custom element:

```jsx
import jsx, {
  Component,
  createFragmentWithChildren
} from "custom-elements-jsx";

class CustomChild extends Component {
  render() {
    const { name } = this.props;

    return <h1>{name}</h1>;
  }
}

if (!window.customElements.get("custom-child"))
  window.customElements.define("custom-child", CustomChild);

class CustomParent extends Component {
  render() {
    const name = "John";

    return createFragmentWithChildren(children, { name });
  }
}

if (!window.customElements.get("custom-parent"))
  window.customElements.define("custom-parent", CustomParent);

document.body.appendChild(
  <custom-parent>
    <custom-child />
    <custom-child />
  </custom-parent>
);
```

After that you will get the markup like this:

```html
<body>
  <custom-parent>
    <custom-child><h1>John</h1></custom-child>
    <custom-child><h1>John</h1></custom-child>
  </custom-parent>
</body>
```

### How to test

To test this library you need to install Chrome browser if you still don`t have. Then you need to run:

```sh
  npm install && npm run test
```

or

```sh
  yarn && yarn test
```

If you want to run tests in watch mode you need to use `test:watch` except `test` command.
