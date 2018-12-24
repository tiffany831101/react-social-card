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


const appRoot = document.getElementById('app')

class SocialCard extends React.Component {
    state = {
        // 貼文狀態
        postIsLiked: false,
        postAuthorName: '',
        postAuthorID: '',
        postPublishedAt: '',
        postText: '',
        postImageURL: '',
        postLikes: [],
        postComments: [],
        postShares: [],
        // 使用者狀態
        currentUserID: uuid(),
        currentUserName: '鄉の民',
        attemptingToType: false,
    }
    handleLikePost = () => {
        this.setState(prevState => (this.state.postIsLiked ? {
            // 把目前使用者從按讚的人當中移除（已按讚 -> 收回讚）
            postIsLiked: !prevState.postIsLiked,
            postLikes: prevState.postLikes.filter(
                client => client.userID !== this.state.currentUserID
            )
        } : {
            // 把目前使用者加進按讚的人裡（沒按讚 -> 已按讚）
            postIsLiked: !prevState.postIsLiked,
            postLikes: [...prevState.postLikes, {
                userName: this.state.currentUserName,
                userID: this.state.currentUserID
            }]
        }))
    }
    handleLikeComment = (commentID) => {
        this.setState(prevState => {
            const comments = [...prevState.postComments]
            const comment = comments.find(obj => obj.id === commentID)
            if (comment) {
                //
            } else {

            }
        })

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
                    status: {
                        ...prevState.post.status,
                        comments
                    }
                }
            }
        })
    }
    handleAddComment = (text) => {
        this.setState(prevState => {
            return {
                ...prevState,
                post: {
                    ...prevState.post,
                    status: {
                        ...prevState.post.status,
                        comments: [...prevState.post.status.comments, {
                            id: uuid(),
                            text,
                            authorName: this.state.currentUser.name,
                            authorID: this.state.currentUser.id,
                            publishedAt: moment().unix(),
                            isLiked: false,
                            likes: []
                        }]
                    }
                }
            }
        })
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
        // 第一次渲染時抓資料回來
        connectTo(`//localhost:3000/posts`)
            .then(posts => {
                const post = posts[0]
                this.setState(prevState => ({
                    postAuthorName: post.authorName,
                    postAuthorID: post.authorID,
                    postPublishedAt: post.publishedAt,
                    postText: post.text,
                    postImageURL: post.imageURL,
                    postLikes: post.likes,
                    postComments: post.comments,
                    postShares: post.shares
                }))
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="post-wrapper">
                <CardHead
                    authorName={this.state.postAuthorName}
                    authorID={this.state.postAuthorID}
                    publishedAt={this.state.postPublishedAt}
                />
                <CardBody
                    text={this.state.postText}
                    imageURL={this.state.postImageURL}
                />
                <CardStatus
                    isLiked={this.state.postIsLiked}
                    likes={this.state.postLikes}
                    comments={this.state.postComments}
                    shares={this.state.postShares}
                />
                <CardAction
                    isLiked={this.state.postIsLiked}
                    handleLikePost={this.handleLikePost}
                    startTyping={() => {
                        this.setState(prevState => ({attemptingToType: true}))
                    }}
                />
                <CardComments
                    comments={this.state.postComments}
                    currentUserName={this.state.currentUserName}
                    currentUserID={this.state.currentUserID}
                />
                <CardInput
                    currentUserName={this.state.currentUserName}
                    currentUserID={this.state.currentUserID}
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
