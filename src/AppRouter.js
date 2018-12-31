import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewsFeed from './components/NewsFeed'
import LoadingError from './components/LoadingError'


const AppRouter = () => (
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
    </BrowserRouter>
)

export default AppRouter
