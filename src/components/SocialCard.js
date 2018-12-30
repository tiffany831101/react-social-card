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

            postID,
            postAuthorID,
            postAuthorName,
            postPublishedAt,
            postText,
            postImageURL,
            postLikes,
            postComments,
            postShares,
            postIsLiked,

            handleLikePost,
            handleDeletePost,
            handleDeleteComment,
            handleLikeComment,
            handleAddComment
        } = this.props

        // const postIsLiked = postLikes.find(
        //     client => client.userID === currentUserID
        // ) ? true : false

        return (
            <div className="post-wrapper">
                <CardHead
                    postID={postID}
                    authorID={postAuthorID}
                    authorName={postAuthorName}
                    publishedAt={postPublishedAt}
                    currentUserID={currentUserID}
                    handleDeletePost={handleDeletePost}
                />
                <CardBody
                    text={postText}
                    imageURL={postImageURL}
                />
                <CardStatus
                    isLiked={postIsLiked}
                    likes={postLikes}
                    commentCount={postComments.length}
                    shareCount={postShares.length}
                />
                <CardAction
                    isLiked={postIsLiked}
                    postID={postID}
                    handleLikePost={handleLikePost}
                    startTyping={this.startTyping}
                />
                <CardComments
                    comments={postComments}
                    currentUserID={currentUserID}
                    postID={postID}
                    handleDeleteComment={handleDeleteComment}
                    handleLikeComment={handleLikeComment}
                />
                <CardInput
                    inputType='comment'
                    currentUserName={currentUserName}
                    currentUserID={currentUserID}
                    postID={postID}
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
