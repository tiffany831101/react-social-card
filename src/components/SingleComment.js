import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

class SingleComment extends React.Component {
    state = {
        isHidden: false,
        confirmDelete: false
    }
    handleHideComment = () => {
        this.setState(() => ({isHidden: true}))
    }
    render() {
        const {
            comment,
            currentUserID,
            handleDeleteComment,
            handleLikeComment,
            postID
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
                    <div
                        className="comment-action"
                        style={{display: this.state.confirmDelete ? 'none' : 'flex'}}
                    >
                        <span
                            className={isLiked ?
                                "comment-action__like comment-action__like--liked" :
                                "comment-action__like"
                            }
                            onClick={() => {handleLikeComment(comment.id, postID)}}
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
                        {comment.authorID === currentUserID && (
                            <React.Fragment>
                                <span>．</span>
                                <span
                                    className="comment-action__delete"
                                    onClick={() => {
                                        this.setState(() => ({confirmDelete: true}))
                                    }}
                                >
                                    刪除
                                </span>
                            </React.Fragment>
                        )}
                        <span>．</span>
                        <span
                            className="comment-action__timestamp"
                            title={moment.unix(comment.publishedAt).format('LLL')}
                        >
                            {moment.unix(comment.publishedAt).fromNow()}
                        </span>
                        {(comment.likes.length > 0) && (
                            <div className="comnment-action__inline-like-count">
                                <span>．</span>
                                <span>
                                    <i className="fab fa-gratipay" style={{color: '#5b8cf8'}} />
                                    <span>{comment.likes.length}</span>
                                </span>
                            </div>
                        )}
                    </div>
                    <p
                        className="comment-action"
                        style={{display: this.state.confirmDelete ? 'block' : 'none'}}
                    >
                        <React.Fragment>
                            <span style={{color: '#1d2129'}}>確定要刪除留言？</span>
                            <span
                                className="comment-action__cancel"
                                onClick={() => {this.setState(() => ({confirmDelete: false}))}}
                            >
                                取消
                            </span>
                            <span>．</span>
                            <span
                                className="comment-action__delete"
                                onClick={() => {handleDeleteComment(comment.id, postID)}}
                            >
                                確定
                            </span>
                        </React.Fragment>
                    </p>
                </div>
            </div>
        )
    }
}

export default SingleComment
