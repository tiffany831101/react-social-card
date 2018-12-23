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
            id: uuid()
        },
        attemptingToType: false,
    }
    handleLikePost = () => {
        this.setState(prevState => {
            return this.state.isLiked ? {
                // 切換 isLiked 狀態、從 likes 陣列移除最後一筆按讚的 object
                isLiked: !prevState.isLiked,
                status: {
                    ...prevState.post.status,
                    likes: [...prevState.post.status.likes].filter(
                        obj => (obj.userID !== this.state.currentUser.id)
                    )
                }
            } : {
                // 切換 isLiked 狀態、新增按讚的 object 到 likes 陣列
                isLiked: !prevState.isLiked,
                status: {
                    ...prevState.post.status,
                    likes: [...prevState.post.status.likes, {
                        userName: this.state.currentUser.name,
                        userID: this.state.currentUser.id
                    }]
                }
            }
        })
    }
    handleLikeComment = (commentID) => {
        this.setState(prevState => {
            const newComments = [...prevState.post.status.comments]
            const targetComment = newComments.find(obj => obj.id === commentID)
            if (targetComment.isLiked) {
                // 把目前使用者從按讚的人裡面移除
                targetComment.likes = targetComment.likes.filter(
                    obj => obj.userID !== this.state.currentUser.id
                )
            } else {
                // 增加目前使用者進到likes
                targetComment.likes.push({
                    userName: this.state.currentUser.name,
                    userID: this.state.currentUser.id
                })
            }
            targetComment.isLiked = !targetComment.isLiked

            return {
                status: {
                    ...prevState.post.status,
                    comments: newComments
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
