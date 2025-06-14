console.log('Hello World');
// ---- Library ---- //
const React = {
    createElement: (tag, props, ...children) => {
        if (typeof tag === 'function') {
            return tag(props, ...children);
        }
        const el = {
            tag,
            props,
            children
        };
        return el;
    },
};
const render = (element, container) => {
    let domElement;
    if (typeof element === 'string') {
        domElement = document.createTextNode(element);
        container.appendChild(domElement);
        return;
    }
    domElement = document.createElement(element.tag);
    let elementProps = element.props ? Object.keys(element.props) : null;
    if (elementProps && elementProps.length > 0) {
        elementProps.forEach((prop) => (domElement[prop] = element.props[prop]));
    }
    if (element.children && element.children.length > 0) {
        element.children.forEach((node) => render(node, domElement));
    }
    container.appendChild(domElement);
};
// ---- Application ---- //
const App = () => {
    const world = "World";
    return (React.createElement("div", { draggable: true },
        React.createElement("h2", null,
            "Hello ",
            world,
            "!"),
        React.createElement("p", null, "I am a paragraph"),
        React.createElement("input", { type: "text" }),
        React.createElement("div", null, "\uC774\uAC8C \uB418\uB124 \uBC14\uB85C \uBC18\uC601\uC774 \uB418\uB124??")));
};
render(React.createElement(App, null), document.getElementById('myapp'));
