import React from 'react'
import SingleComment from './SingleComment'

const CardComments = ({
    comments, currentUserName, currentUserID, handleDeleteComment, handleLikeComment
}) => (
    <div className="all-comments">
        {(comments.length > 0) && comments.map(comment => (
            <SingleComment
                key={comment.id}
                comment={comment}
                currentUserID={currentUserID}
                handleDeleteComment={handleDeleteComment}
                handleLikeComment={handleLikeComment}
            />
        ))}
    </div>
)

export default CardComments
