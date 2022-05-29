import React from 'react';
import ReactDOM from 'react-dom';


const appDivEl = document.getElementById('app')

const App = props => {
   return <h1>Hello World</h1>
}
ReactDOM.render(<App />, appDivEl)