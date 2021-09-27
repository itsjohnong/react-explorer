import './App.css';
import Explorer from './Explorer';

export const STUB = [
  {
      label: "public",
      contents: [
          {label: "favicon.ico"},
          {label: "index.html"},
          {label: "robots.txt"},
          {
              label: "styles",
              contents: [
                  {label:"styles.css"}
              ]
          }
      ]
  },
  {
      label: "src",
      contents: [
          {label: "App.js"},
          {label: "hooks.js"},
          {label: "index.js"}
      ]
  },
  {
      label: "package.json"
  },
  {
      label: "README.md"
  }
]

function App() {
  return (
    <Explorer tree={STUB} styles={{listItem:{fontWeight:"bold"}}} />
  );
}

export default App;
