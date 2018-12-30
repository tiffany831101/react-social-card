import React from 'react'
import ReactDOM from 'react-dom'
import NewsFeed from './components/NewsFeed'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'


// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const appRoot = document.getElementById('app')
ReactDOM.render(<NewsFeed />, appRoot)
