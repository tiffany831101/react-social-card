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
    handleAddComment = (text) => {
        this.setState(prevState => ({
            postComments: [
                ...prevState.postComments, {
                    id: uuid(),
                    text,
                    authorName: this.state.currentUserName,
                    authorID: this.state.currentUserID,
                    publishedAt: moment().unix(),
                    likes: []
                }
            ]
        }))
    }
    handleDeleteComment = (commentID) => {
        this.setState(prevState => ({
            postComments: [
                ...prevState.postComments.filter(
                    comment => comment.id !== commentID
                )
            ]
        }))
    }
    handleLikeComment = (commentID) => {
        this.setState(prevState => {
            const comments = [...prevState.postComments]
            const comment = comments.find(obj => obj.id === commentID)
            const commentIsLiked = comment.likes.find(
                client => client.userID === this.state.currentUserID
            )
            if (commentIsLiked) {
                // 把目前使用者從按讚的人當中移除
                comment.likes = comment.likes.filter(
                    client => client.userID !== this.state.currentUserID
                )
            } else {
                // 把目前使用者加進按讚的人裡
                comment.likes.push({
                    userName: this.state.currentUserName,
                    userID: this.state.currentUserID
                })
            }
            return {postComments: comments}
        })
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
                    handleDeleteComment={this.handleDeleteComment}
                    handleLikeComment={this.handleLikeComment}
                />
                <CardInput
                    currentUserName={this.state.currentUserName}
                    currentUserID={this.state.currentUserID}
                    handleAddComment={this.handleAddComment}
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
