### 1장

```javascript
const App = () => {
  const world = "World";
  return React.createElement(
    "div",
    { draggable: true },
    React.createElement("h2", null, "Hello ", world, "!"),
    React.createElement("p", null, "I am a paragraph"),
    React.createElement("input", { type: "text" })
  );
};

render(React.createElement(App, null), document.getElementById("myapp"));
```

위와 같이 생성된 `app.js` 파일을 보면 `app.tsx` 파일과 달리 tsc 가 자동으로 `React.createElement` 를 jsx 가 사용된 위치에 넣는 것을 알 수 있다.  
평소에 tsc 가 이러한 작업까지 처리하는 것을 생각하지 않고 있었는데, 생각보다 많은 일을 하고 있었던 것 같다는 느낌이 든다.

<br>

---

### 2장  

헨리님이 onchange 관련해서 실제 React 의 `onChange` 는 사용자의 입력에 따라 동적으로 동작하는데, 우리가 사용하는 `onchange` 는 Enter 를 누르거나 focus 에서 벗어나야지만 동작하는 것에 대해서 말을 하셨을 때, 혼자 했을 때는 *간단한 프로젝트니깐...* 하고 넘기게 되었던 점이 다시 눈에 들어왔고, 관련해서 찾아보며 React 공식 문서에 있었던 Diffing 에 대해서 다시 생각해보는 계기가 되었다. 

또한 평소에 잘 모르고 있던 HTML 이벤트 핸들러와 DOM 이벤트 리스너의 차이를 자세히 알게 되었다.

```html
<input type="text" onchange="handleChange()" />
```
- HTML 요소의 속성
- DOM 프로퍼티로 할당됨
- 하나의 핸들러만 등록됨
- 이벤트 발생 시점: **focus 를 잃거나 Enter 키를 눌렀을 때**

```js
element.addEventListener('change', handleChange);
element.addEventListener('input', handleInput);
```
- 여러 개의 핸들러 등록 가능
- 이벤트 타입에 따라 발생 시점이 다름
  
> DOM 이벤트 리스너의 `input` 는 타이핑할 때마다 발생하며, HTML 이벤트의 `onchange` 는 focus 를 잃을 때만 발생하게 된다. 

```jsx
<input
  type="text"
  value={name}
  oninput={(e) => setName(e.target.value)}
  // onchange={(e) => setName(e.target.value)}
/>
```
- `onchange` 가 아닌 `oninput` 을 사용하면 사용자의 입력에 따라 동적으로 실행하는 것이 가능하지만, 현재 구현된 rerender 에서는 `root.innerHTML = ''` 를 통해 전체를 초기화하고 다시 렌더링하기 때문에 focus 정보가 사라져 입력마다 끊기는 현상이 발생한다. 


나중에 [React 톺아보기](https://goidle.github.io/) 에 나와있는 React Reconciler 에 대한 글들을 자세히 읽어보고 싶다. (제가 추천하긴 했지만 대충 보고 넘어간 글이였기 때문에..ㅎㅎㅎ)