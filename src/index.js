import React from 'react'
import ReactDOM from 'react-dom'
import NewsFeed from './components/NewsFeed'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'

const appRoot = document.getElementById('app')
ReactDOM.render(<NewsFeed />, appRoot)
