import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family:"Roboto", "Noto Sans KR", "Noto Sans CJK KR", arial, ëě, Dotum, Tahoma, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212529;
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
}

code {
  font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

input, button, textarea {
  font-family: inherit;
}

html, body, #root {
  height: 100%;
}

a{ 
  text-decoration:none
}

`;

export default GlobalStyles;
