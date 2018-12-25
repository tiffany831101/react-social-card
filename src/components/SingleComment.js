import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

class SingleComment extends React.Component {
    state = {
        isHidden: false
    }
    handleHideComment = () => {
        this.setState(() => ({isHidden: true}))
    }
    render() {
        const {
            comment,
            currentUserID,
            handleDeleteComment,
            handleLikeComment
        } = this.props
        const isLiked = comment.likes.find(client => client.userID === currentUserID)
        return (
            <div
                className={
                    this.state.isHidden ? 'comment comment--hidden' : 'comment'
                }
            >
                <a className="comment__author-avatar" href="#">
                    {comment.authorName.slice(0, 1).toUpperCase()}
                </a>
                <div>
                    <div className="comment__body">
                    <p className="comment__text-section">
                        <a className="comment__author-name" href="#">
                            {comment.authorName}
                        </a>
                        <span className="comment__text">{comment.text}</span>
                    </p>
                    {(comment.likes.length > 0) ? (
                        <span
                            className="comment__like-count"
                            title={comment.likes.map(obj => obj.userName).join('\n')}
                        >
                            <i className="fab fa-gratipay" style={{color: '#5b8cf8'}} />
                            <span>{comment.likes.length}</span>
                        </span>
                    ) : (
                        <span className="comment__like-count comment__like-count--hidden">
                            <i className="fab fa-gratipay" style={{color: '#5b8cf8'}} />
                            <span>{comment.likes.length}</span>
                        </span>
                    )}
                    </div>
                    <p className="comment-action">
                        <span
                            className={isLiked ?
                                "comment-action__like comment-action__like--liked" :
                                "comment-action__like"
                            }
                            onClick={() => {handleLikeComment(comment.id)}}
                        >
                            讚
                        </span>
                        <span>．</span>
                        <span
                            className="comment-action__hide"
                            onClick={this.handleHideComment}
                        >
                            隱藏
                        </span>
                        {comment.authorID === currentUserID && <span>．</span>}
                        {comment.authorID === currentUserID && (<span
                            className="comment-action__delete"
                            onClick={() => {handleDeleteComment(comment.id)}}
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
                    </p>
                </div>
            </div>
        )
    }
}

export default SingleComment
