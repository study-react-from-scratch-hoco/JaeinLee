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

const myAppState = []; 
let myAppStateCursor = 0;
const useState = (initialState) => { 
  // 이 useState에 대한 커서를 가져옵니다. 
  const stateCursor = myAppStateCursor;
   // AppState를 initialState로 설정하기 전에 확인합니다(reRender) 
  myAppState[stateCursor] = myAppState[stateCursor] || initialState; 
  console.log( 
    `useState는 커서 ${stateCursor}에서 값으로 초기화됩니다:`, 
    myAppState 
  ); 
  const setState = (newState) => { 
    console.log( `setState는 커서 ${stateCursor}에서 newState 값으로 호출됩니다 :`, newState); 
    myAppState[stateCursor] = newState;     // 상태가 변경되면 UI를 새롭게 렌더링합니다.
    reRender();
    }; // 다음 상태를 위해 커서를 준비합니다. 
    myAppStateCursor++; 
    console.log(`stateDump`, myAppState);   return [ myAppState[stateCursor] , setState]; 
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

const reRender = () => { 
  console.log('reRender-ing :)'); 
  const rootNode = document.getElementById('myapp'); 
  // 이미 렌더링된 내용을 재설정/정리 
  rootNode.innerHTML = ''; 
  // 전역 상태 커서를 재설정 
  myAppStateCursor = 0;
   // 그런 다음 렌더링 Fresh 
  render(<App />, rootNode); 
};


// ---- Application ---- //
const App = () => { 
  const [name, setName] = useState('Arindam'); 
  const [count, setCount] = useState(0);

   return ( 
    <div draggable> 
      <h2>안녕하세요 {name}님!</h2> 
      <p>저는 단락입니다.</p> 
      <input 
        type="text" 
        value={name} 
        onchange={(e) => setName(e.target.value)} 
      /> 
      <h2> 카운터 값: {count}</h2> 
      <button onclick={() => setCount(count + 1)}>+1</button> 
      <button onclick={() => setCount(count - 1)}>-1</button>
      {count.toString()}
     </div> 
  ); 
};

render(<App />, document.getElementById('myapp'));