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
        isLoading: null,
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
        currentUserID: 'b763ae61-6891-46cc-a049-c1c6a8871d96',
        currentUserName: '鄉の民',
        attemptingToType: false,
    }
    sendRequest = async (url, method=null, data=null) => {
        try {
            const resp = (!method && !data) ? await fetch(url) :
                await fetch(url, {
                    method,
                    body: JSON.stringify(data),
                    headers:{'Content-Type': 'application/json'}
                })
            if (!resp.ok) {throw new Error(`${resp.status} ${resp.statusText}`)}
            return await resp.json()
        } catch(err) {
            console.log(err)
            this.setState(() => ({isLoading: false, loadingError: true}))
            return err
        }
    }
    handleLikePost = async () => {
        // 更新按讚的人
        const {postID, postIsLiked, postLikes, currentUserID, currentUserName} = this.state
        const updatedPostLikes = postIsLiked ?
            // 已按讚 -> 收回讚
            [...postLikes].filter(client => client.userID !== currentUserID) :
            // 沒按讚 -> 已按讚
            [...postLikes, {userName: currentUserName, userID: currentUserID}]

        // 更新狀態
        this.setState(prevState => ({
            postIsLiked: !prevState.postIsLiked,
            postLikes: updatedPostLikes
        }))

        this.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {likes: updatedPostLikes}
        )
    }
    handleAddComment = async (text) => {
        // 新增一則留言到複製的留言陣列裡面
        const {postID, currentUserName, currentUserID} = this.state
        const updatedPostComments = [
            ...this.state.postComments, {
            id: uuid(),
            text,
            authorName: currentUserName,
            authorID: currentUserID,
            publishedAt: moment().unix(),
            likes: []
        }]
        // 更新狀態
        this.setState(() => ({postComments: updatedPostComments}))

        // 上傳新的留言陣列
        this.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {comments: updatedPostComments}
        )
    }
    handleDeleteComment = async (commentID) => {
        // 從複製的留言陣列裡移除 ID 和 commentID 相同的留言
        const {postID, postComments} = this.state
        const updatedPostComments = [...postComments].filter(
            comment => comment.id !== commentID
        )
        // 更新狀態
        this.setState(() => ({postComments: updatedPostComments}))

        // 上傳新的留言陣列
        this.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {comments: updatedPostComments}
        )
    }
    handleLikeComment = async (commentID) => {
        // 複製留言陣列，找出符合 commentID 的留言
        const {postID, postComments, currentUserName, currentUserID} = this.state
        const updatedPostComments = [...postComments]
        const comment = updatedPostComments.find(obj => obj.id === commentID)
        const commentIsLiked = comment.likes.find(
            client => client.userID === currentUserID
        )
        if (commentIsLiked) {
            // 把目前使用者從按留言讚的人當中移除
            comment.likes = comment.likes.filter(
                client => client.userID !== currentUserID
            )
        } else {
            // 把目前使用者加進按留言讚的人裡
            comment.likes.push({
                userName: currentUserName,
                userID: currentUserID
            })
        }
        // 更新狀態
        this.setState(() => ({postComments: updatedPostComments}))

        // 上傳新的留言陣列
        this.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {comments: updatedPostComments}
        )
    }
    async componentDidMount() {
        // 狀態 -> 讀取中
        this.setState(() => ({isLoading: true}))

        try {
            // 第一次渲染時從伺服器拿資料
            const requestResult = await this.sendRequest('//localhost:3000/posts')
            const post = requestResult[1]    // 先只用其中一筆資料
            const isLiked = post.likes.find(
                client => client.userID === this.state.currentUserID
            ) ? true : false

            // 用伺服器的資料更新狀態
            this.setState(() => ({
                postID: post.id,
                postIsLiked: isLiked,
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
            console.log(err)
            // 狀態 -> 發生錯誤
            this.setState(() => ({isLoading: false, loadingError: true}))
            return err
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
                            this.setState(() => ({attemptingToType: true}))
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
                            this.setState(() => ({attemptingToType: true}))
                        }}
                        quitTyping={() => {
                            this.setState(() => ({attemptingToType: false}))
                        }}
                    />
                </div>
            )
        }
    }
}

ReactDOM.render(<SocialCard />, appRoot)
