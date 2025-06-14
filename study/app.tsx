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
  return (
    <div draggable>
      <h2>Hello {world}!</h2>
      <p>I am a paragraph</p>
      <input type="text" />
      <div>이게 되네 바로 반영이 되네??</div>
    </div>
  );
};

render(<App />, document.getElementById('myapp'));