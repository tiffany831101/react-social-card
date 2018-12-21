import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

const SingleComment = ({
    comment, currentUser, deleteComment, handleLikeComment
}) => (
    <div className="comment">
        <a className="comment__author-avatar" href="#">
            {comment.authorName.slice(0, 1)}
        </a>
        <div>
            <p className="comment__body">
                <a
                    className="comment__author-name"
                    href="#"
                >
                    {comment.authorName}
                </a>
                <span>
                    {comment.text}
                </span>
            </p>
            <p className="comment-action">
                {comment.isLiked ? (
                    <span
                        className="comment-action__like"
                        onClick={() => {handleLikeComment(comment.id)}}
                        style={{
                            fontWeight: 'bold',
                            color: 'rgb(76, 130, 247)'
                        }}
                    >
                        讚
                    </span>
                ) : (
                    <span
                        className="comment-action__like"
                        onClick={() => {handleLikeComment(comment.id)}}
                    >
                        讚
                    </span>
                )}
                
                {comment.authorID == currentUser.id && (
                    <span>．</span>
                )}
                {comment.authorID == currentUser.id && (<span
                    className="comment-action__delete"
                    onClick={() => {deleteComment(comment.id)}}
                >
                    刪除
                </span>
                )}
                <span>．</span>
                <span
                    className="comment-action__timestamp"
                    title={moment.unix(comment.publishedAt).format('LLL')}
                >
                    {moment.unix(comment.publishedAt).fromNow()}
                </span>
                {(comment.likes.length > 0) ? (
                    <span className="comment-action__like-count">
                        <i
                            className="fas fa-thumbs-up"
                        />
                        <span>{comment.likes.length}</span>
                    </span>
                ) : (
                    <span
                        className="comment-action__like-count"
                        style={{visibility: 'hidden'}}
                    >
                        <i
                            className="fas fa-thumbs-up"
                        />
                        <span>{comment.likes.length}</span>
                    </span>
                )}
                
            </p>
        </div>
    </div>
)

export default SingleComment
