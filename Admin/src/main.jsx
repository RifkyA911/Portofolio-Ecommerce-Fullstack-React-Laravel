import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Carousel, initTE } from "tw-elements";
initTE({ Carousel }, true ); // set second parameter to true if you want to use a debugger

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
