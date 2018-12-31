import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'

// // Debugging:
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const appRoot = document.getElementById('app')
ReactDOM.render(<AppRouter />, appRoot)
