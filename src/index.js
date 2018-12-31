import React from 'react'
import ReactDOM from 'react-dom'
import NewsFeed from './components/NewsFeed'
import LoadingError from './components/LoadingError'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'

// Debugging:
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }

const appRoot = document.getElementById('app')
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route
                exact path="/"
                key="news-feed"
                component={NewsFeed}
            />
            <Route
                path="/posts/:id"
                key="single-post"
                component={NewsFeed}
            />
            <Route
                render={() => <LoadingError errMsg="查無此頁" />}
            />
        </Switch>
    </BrowserRouter>,
    appRoot
)
