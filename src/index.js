import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'

import Loading from './components/Loading'
import CardHead from './components/CardHead'
import CardBody from './components/CardBody'
import CardStatus from './components/CardStatus'
import CardAction from './components/CardAction'
import CardComments from './components/CardComments'
import CardInput from './components/CardInput'

import moment from 'moment'
import uuid from 'uuid/v4'


const appRoot = document.getElementById('app')

class SocialCard extends React.Component {
    state = {
        // 頁面狀態
        isLoading: false,
        loadingError: null,
        // 貼文狀態
        postID: '',
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
    handleLikePost = async (postID) => {
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
        // 丟資料到伺服器
        try {
            const dataToUpload = {likes: this.state.postLikes}
            const resp = await fetch(
                `//localhost:3000/posts/${postID}`, {
                method: 'PATCH',
                body: JSON.stringify(dataToUpload),
                headers:{'Content-Type': 'application/json'}
            })
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`)
            }
        } catch(err) {
            console.log(err)
            this.setState(() => ({
                isLoading: false,
                loadingError: true
            }))
        }
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
    async componentDidMount() {
        // 第一次渲染時從伺服器拿資料
        this.setState(() => ({isLoading: true}))
        try {
            const resp = await fetch('//localhost:3000/posts')
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`)
            }
            const data = await resp.json()
            const post = data[1]
            this.setState(() => ({
                postID: post.id,
                postAuthorName: post.authorName,
                postAuthorID: post.authorID,
                postPublishedAt: post.publishedAt,
                postText: post.text,
                postImageURL: post.imageURL,
                postLikes: post.likes,
                postComments: post.comments,
                postShares: post.shares,
                isLoading: false,
                loadingError: false
            }))
        } catch(err) {
            this.setState(() => ({
                isLoading: false,
                loadingError: true
            }))
        }
    }
    render() {
        if (this.state.isLoading) {
            // 顯示讀取中頁面
            return <Loading />
        } else if (this.state.loadingError) {
            // 顯示錯誤頁面
            return <h1 className="status-icon-container">Error</h1>
        } else {
            // 顯示正常頁面
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
                        commentCount={this.state.postComments.length}
                        shareCount={this.state.postShares.length}
                    />
                    <CardAction
                        isLiked={this.state.postIsLiked}
                        postID={this.state.postID}
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
}

ReactDOM.render(<SocialCard />, appRoot)
