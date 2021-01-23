import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; //.js is implied
// import reportWebVitals from './reportWebVitals';

ReactDOM.render( //hooks react app we build to the html. attach to root (dir)
  // <React.StrictMode>
    <App />, //takes component
  // </React.StrictMode>,
  document.getElementById('root') //HTML element
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
