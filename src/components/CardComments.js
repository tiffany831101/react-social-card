import React from 'react'
import SingleComment from './SingleComment'

class CardComments extends React.PureComponent {
    state = {
        isFolded: null,
        initCommentsLength: null
    }
    componentDidMount() {
        const {postComments} = this.props
        this.setState(() => ({
            isFolded: (postComments.length > 5) ? true : false,
            initCommentsLength: postComments.length
        }))
    }
    render() {
        const {
            postComments,
            currentUserID,
            handleDeleteComment,
            handleLikeComment,
            postID
        } = this.props
        const {isFolded, initCommentsLength} = this.state
        return (
            <div className="all-comments">
                {(postComments.length > 5 && isFolded) && (
                    <p
                        className="all-comments__unfold"
                        style={{display: isFolded || 'none'}}
                        onClick={() => {this.setState(() => ({isFolded: false}))}}
                    >
                        查看其他{postComments.length - 5}則留言
                    </p>
                )}
                {(postComments.length > 0) && postComments.map((comment, index) => {
                    if (isFolded && initCommentsLength - index > 5) {
                        return null  // 舊的留言不渲染
                    }
                    const {
                        id: commentID,
                        text: commentText,
                        authorID: commentAuthorID,
                        authorName: commentAuthorName,
                        publishedAt: commentPublishedAt,
                        likes: commentLikes
                    } = comment
                    const isLiked = commentLikes.find(client => client.userID === currentUserID)
                    return (
                        <SingleComment
                            key={commentID}

                            commentID={commentID}
                            commentText={commentText}
                            commentAuthorID={commentAuthorID}
                            commentAuthorName={commentAuthorName}
                            commentPublishedAt={commentPublishedAt}
                            commentLikes={commentLikes}
                            commentIsLiked={isLiked}

                            currentUserID={currentUserID}
                            handleDeleteComment={handleDeleteComment}
                            handleLikeComment={handleLikeComment}
                            postID={postID}
                        />
                    )
                })}
            </div>
        )
    }
}

export default CardComments
