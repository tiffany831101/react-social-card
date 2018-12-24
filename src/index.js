import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'

import CardHead from './components/CardHead'
import CardBody from './components/CardBody'
import CardStatus from './components/CardStatus'
import CardAction from './components/CardAction'
import CardComments from './components/CardComments'
import CardInput from './components/CardInput'

import moment from 'moment'
import uuid from 'uuid/v4'
import connectTo from './functions/connect'
import createFakeLikers from './functions/createLikers'


const appRoot = document.getElementById('app')

class SocialCard extends React.Component {
    state = {
        post: {
            isLiked: false,
            metaInfo: {
                authorName: '',
                authorID: '',
                publishedAt: ''
            },
            text: '',
            imageURL: '',
            status: {
                likes: [],
                comments: [],
                shares: []
            }
        },
        currentUser: {
            name: '鄉の民',
            id: ''
        },
        attemptingToType: false,
    }
    handleLikePost = () => {
        this.setState(prevState => {
            let likes = [...prevState.post.status.likes]
            if (this.state.post.isLiked) {
                // 把目前使用者從按讚的人當中移除
                likes = likes.filter(
                    client => client.userID !== this.state.currentUser.id
                )
            } else {
                // 把目前使用者加進按讚的人裡
                likes.push({
                    userName: this.state.currentUser.name,
                    userID: this.state.currentUser.id
                })
            }
            return {
                ...prevState,
                post: {
                    ...prevState.post,
                    isLiked: !prevState.post.isLiked,
                    status: {...prevState.post.status, likes}
                }
            }
        })
    }
    handleLikeComment = (commentID) => {
        this.setState(prevState => {
            const comments = [...prevState.post.status.comments]
            const comment = comments.find(comment => comment.id === commentID)
            if (comment.isLiked) {
                // 把目前使用者從按讚的人當中移除
                comment.likes = comment.likes.filter(
                    client => client.userID !== this.state.currentUser.id
                )
            } else {
                // 把目前使用者加進按讚的人裡
                comment.likes.push({
                    userName: this.state.currentUser.name,
                    userID: this.state.currentUser.id
                })
            }
            comment.isLiked = !comment.isLiked
            return {
                ...prevState,
                post: {
                    ...prevState.post,
                    status: {...prevState.post.status, comments}
                }
            }
        })
    }
    addComment = (textInput) => {
        this.setState(prevState => ({
            status: {
                ...prevState.post.status,
                comments: [...prevState.post.status.comments, {
                    id: uuid(),
                    text: textInput,
                    authorName: this.state.currentUser.name,
                    authorID: this.state.currentUser.id,
                    publishedAt: moment().unix(),
                    isLiked: false,
                    likes: []
                }]
            }
        }))
    }
    deleteComment = (id) => {
        this.setState(prevState => ({
            status: {
                ...prevState.post.status,
                comments: [...prevState.post.status.comments].filter(
                    comment => (comment.id !== id)
                )
            }
        }))
    }
    componentDidMount() {
        // 從 json-server 抓資料回來
        connectTo(`//localhost:3000/data`)
            .then(resp => {
                const post = resp.posts[0]
                this.setState(prevState => ({...prevState, post}))
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="post-wrapper">
                <CardHead metaInfo={this.state.post.metaInfo} />
                <CardBody post={this.state.post} />
                <CardStatus post={this.state.post} />
                <CardAction
                    handleLikePost={this.handleLikePost}
                    isLiked={this.state.post.isLiked}
                    attemptingToType={this.state.attemptingToType}
                    startTyping={() => {
                        this.setState(prevState => ({attemptingToType: true}))
                    }}
                />
                <CardComments
                    comments={this.state.post.status.comments}
                    currentUser={this.state.currentUser}
                    deleteComment={this.deleteComment}
                    handleLikeComment={this.handleLikeComment}
                />
                <CardInput
                    currentUser={this.state.currentUser}
                    addComment={this.addComment}
                    attemptingToType={this.state.attemptingToType}
                    startTyping={() => {
                        this.setState(prevState => ({attemptingToType: true}))
                    }}
                    quitTyping={() => {
                        this.setState(prevState => ({attemptingToType: false}))
                    }}
                />
            </div>
        )
    }
}

ReactDOM.render(<SocialCard />, appRoot)
