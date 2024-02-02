import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import HelloWorld from './HelloWorld.jsx'
import './index.css'
import reportWebVitals from './reportWebVitals'

// Index.html
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
    <HelloWorld />
  </React.StrictMode>
)

// const imgRoot = ReactDOM.createRoot(document.getElementById('imgRoot'));

/*
imgRoot.render(
  <React.StrictMode>
    <App />
    <ListUserComponents/>
    <HelloWorld />
    <Footer />
  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
// reportWebVitals(console.log);
