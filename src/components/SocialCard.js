import React from 'react'
import CardHead from './CardHead'
import CardBody from './CardBody'
import CardStatus from './CardStatus'
import CardAction from './CardAction'
import CardComments from './CardComments'
import CardInput from './CardInput'


class SocialCard extends React.Component {
    state = {
        attemptingToType: false
    }
    startTyping = () => {
        this.setState(() => ({attemptingToType: true}))
    }
    quitTyping = () => {
        this.setState(() => ({attemptingToType: false}))
    }
    render() {
        const {
            currentUserID,
            currentUserName,
            post,
            handleLikePost,
            handleDeletePost,
            handleDeleteComment,
            handleLikeComment,
            handleAddComment
        } = this.props

        const postIsLiked = post.likes.find(
            client => client.userID === currentUserID
        ) ? true : false

        return (
            <div className="post-wrapper">
                <CardHead
                    postID={post.id}
                    authorID={post.authorID}
                    authorName={post.authorName}
                    publishedAt={post.publishedAt}
                    currentUserID={currentUserID}
                    handleDeletePost={handleDeletePost}
                />
                <CardBody
                    text={post.text}
                    imageURL={post.imageURL}
                />
                <CardStatus
                    isLiked={postIsLiked}
                    likes={post.likes}
                    commentCount={post.comments.length}
                    shareCount={post.shares.length}
                />
                <CardAction
                    isLiked={postIsLiked}
                    postID={post.id}
                    handleLikePost={handleLikePost}
                    startTyping={this.startTyping}
                />
                <CardComments
                    comments={post.comments}
                    currentUserName={currentUserName}
                    currentUserID={currentUserID}
                    postID={post.id}
                    handleDeleteComment={handleDeleteComment}
                    handleLikeComment={handleLikeComment}
                />
                <CardInput
                    inputType='comment'
                    currentUserName={currentUserName}
                    currentUserID={currentUserID}
                    postID={post.id}
                    handleUserSubmit={handleAddComment}
                    attemptingToType={this.state.attemptingToType}
                    startTyping={this.startTyping}
                    quitTyping={this.quitTyping}
                />
            </div>
        )
    }
}

export default SocialCard
