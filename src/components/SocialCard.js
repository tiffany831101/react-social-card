import React from 'react'
import uuid from 'uuid/v4'
import moment from 'moment'

import CardHead from './CardHead'
import CardBody from './CardBody'
import CardStatus from './CardStatus'
import CardAction from './CardAction'
import CardComments from './CardComments'
import CardInput from './CardInput'


class SocialCard extends React.Component {
    state = {
        // 貼文狀態
        postIsLiked: null,
        postLikes: [],
        postComments: [],
        postShares: [],
        // 使用者狀態
        attemptingToType: false,
    }
    handleLikePost = async () => {
        // 更新按讚的人
        const {postIsLiked, postLikes} = this.state
        const {currentUserID, currentUserName, post: {postID}} = this.props
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

        // 上傳新的按讚陣列
        this.props.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {likes: updatedPostLikes}
        )
    }
    handleAddComment = async (text) => {
        // 新增一則留言到複製的留言陣列裡面
        const {currentUserID, currentUserName, post: {postID}} = this.props
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
        this.props.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {comments: updatedPostComments}
        )
    }
    handleDeleteComment = async (commentID) => {
        // 從複製的留言陣列裡移除 ID 和 commentID 相同的留言
        const {postComments} = this.state
        const {postID} = this.props.post
        const updatedPostComments = [...postComments].filter(
            comment => comment.id !== commentID
        )
        // 更新狀態
        this.setState(() => ({postComments: updatedPostComments}))

        // 上傳新的留言陣列
        this.props.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {comments: updatedPostComments}
        )
    }
    handleLikeComment = async (commentID) => {
        // 複製留言陣列，找出符合 commentID 的留言
        const {postComments} = this.state
        const {currentUserID, currentUserName, post: {postID}} = this.props
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
        this.props.sendRequest(
            `//localhost:3000/posts/${postID}`,
            'PATCH',
            {comments: updatedPostComments}
        )
    }
    componentDidMount() {
        // 頁面第一次載入時把值塞給狀態，之後由狀態管理
        const {postIsLiked, postLikes, postComments, postShares} = this.props.post
        this.setState(() => ({
            postIsLiked, postLikes, postComments, postShares
        }))
    }
    render() {
        const {
            currentUserID,
            currentUserName,
            post: {
                postID,
                postAuthorName,
                postAuthorID,
                postPublishedAt,
                postText,
                postImageURL
            }
        } = this.props
        return (
            <div className="post-wrapper">
                <CardHead
                    authorName={postAuthorName}
                    authorID={postAuthorID}
                    publishedAt={postPublishedAt}
                />
                <CardBody
                    text={postText}
                    imageURL={postImageURL}
                />
                <CardStatus
                    isLiked={this.state.postIsLiked}
                    likes={this.state.postLikes}
                    commentCount={this.state.postComments.length}
                    shareCount={this.state.postShares.length}
                />
                <CardAction
                    isLiked={this.state.postIsLiked}
                    postID={postID}
                    handleLikePost={this.handleLikePost}
                    startTyping={() => {
                        this.setState(() => ({attemptingToType: true}))
                    }}
                />
                <CardComments
                    comments={this.state.postComments}
                    currentUserName={currentUserName}
                    currentUserID={currentUserID}
                    handleDeleteComment={this.handleDeleteComment}
                    handleLikeComment={this.handleLikeComment}
                />
                <CardInput
                    inputType='comment'
                    currentUserName={currentUserName}
                    currentUserID={currentUserID}
                    handleUserSubmit={this.handleAddComment}
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


export default SocialCard
