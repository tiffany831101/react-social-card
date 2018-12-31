import React from 'react'
import CardHead from './CardHead'
import CardBody from './CardBody'
import CardStatus from './CardStatus'
import CardAction from './CardAction'
import CardComments from './CardComments'
import CardInput from './CardInput'


class SocialCard extends React.PureComponent {
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
                    postText={postText}
                    postImageURL={postImageURL}
                />
                <CardStatus
                    postIsLiked={postIsLiked}
                    postLikes={postLikes}
                    postCommentCount={postComments.length}
                    postShareCount={postShares.length}
                />
                <CardAction
                    postIsLiked={postIsLiked}
                    postID={postID}
                    handleLikePost={handleLikePost}
                    startTyping={this.startTyping}
                />
                <CardComments
                    postComments={postComments}
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
