import React from 'react'

const CardComments = (props) => (
    <div className="all-comments">
        {(props.comments.length > 0) &&  props.comments.map(comment => (
            <div className="comment" key={comment.userID}>
                <a className="comment__author-avatar" href="#">
                    {comment.userName.slice(0, 1)}
                </a>
                <div>
                    <p className="comment__body">
                        <a
                            className="comment__author-name"
                            href="#"
                        >
                            {comment.userName}
                        </a>
                        <span>
                            {comment.text}
                        </span>
                    </p>
                    <p className="comment-action">
                        <span className="comment-action__like">
                            讚
                        </span>
                        <span>．</span>
                        <span className="comment-action__comment">
                            回覆
                        </span>
                        <span>．</span>
                        <span className="comment-action__timestamp">
                            1天
                        </span>
                    </p>
                </div>
            </div>
        ))}
        
    </div>
)

export default CardComments
