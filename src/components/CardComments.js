import React from 'react'
import SingleComment from './SingleComment'

class CardComments extends React.Component {
    state = {
        isFolded: true
    }
    render() {
        const {comments, currentUserName, currentUserID, handleDeleteComment, handleLikeComment} = this.props
        return (
            <div className="all-comments">
                {comments.length > 5 && (
                    <p
                        className="all-comments__unfold"
                        style={{
                            display: this.state.isFolded || 'none',
                            marginBottom: '0'
                        }}
                        onClick={() => {this.setState(() => ({isFolded: false}))}}
                    >
                        查看其他{comments.length - 5}則留言
                    </p>
                )}
                {(comments.length > 0) && comments.map((comment, index) => {
                    if (this.state.isFolded && comments.length - index > 5) {
                        return null  // 舊的留言不渲染
                    }
                    return (
                        <SingleComment
                            key={comment.id}
                            comment={comment}
                            currentUserID={currentUserID}
                            handleDeleteComment={handleDeleteComment}
                            handleLikeComment={handleLikeComment}
                        />
                    )
                })}
            </div>
        )
    }
}

export default CardComments
