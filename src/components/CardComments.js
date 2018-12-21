import React from 'react'
import SingleComment from './SingleComment'

const CardComments = (props) => (
    <div className="all-comments">
        {(props.comments.length > 0) &&  props.comments.map(comment => (
            <SingleComment
                key={comment.id}
                comment={comment}
                currentUser={props.currentUser}
                deleteComment={props.deleteComment}
                handleLikeComment={props.handleLikeComment}
            />
        ))}
    </div>
)

export default CardComments
