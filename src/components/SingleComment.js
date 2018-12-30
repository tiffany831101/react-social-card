import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

class SingleComment extends React.PureComponent {
    state = {
        isHidden: false,
        confirmDelete: false
    }
    handleHideComment = () => {
        this.setState(() => ({isHidden: true}))
    }
    render() {
        const {
            commentID,
            commentText,
            commentAuthorID,
            commentAuthorName,
            commentPublishedAt,
            commentLikes,
            commentIsLiked,
            currentUserID,
            handleDeleteComment,
            handleLikeComment,
            postID
        } = this.props
        return (
            <div
                className={
                    this.state.isHidden ? 'comment comment--hidden' : 'comment'
                }
            >
                <a className="comment__author-avatar" href="#">
                    {commentAuthorName.slice(0, 1).toUpperCase()}
                </a>
                <div>
                    <div className="comment__body">
                    <p className="comment__text-section">
                        <a className="comment__author-name" href="#">
                            {commentAuthorName}
                        </a>
                        <span className="comment__text">{commentText}</span>
                    </p>
                    {(commentLikes.length > 0) ? (
                        <span
                            className="comment__like-count"
                            title={commentLikes.map(obj => obj.userName).join('\n')}
                        >
                            <i className="fab fa-gratipay" style={{color: '#5b8cf8'}} />
                            <span>{commentLikes.length}</span>
                        </span>
                    ) : (
                        <span className="comment__like-count comment__like-count--hidden">
                            <i className="fab fa-gratipay" style={{color: '#5b8cf8'}} />
                            <span>{commentLikes.length}</span>
                        </span>
                    )}
                    </div>
                    <div
                        className="comment-action"
                        style={{display: this.state.confirmDelete ? 'none' : 'flex'}}
                    >
                        <span
                            className={commentIsLiked ?
                                "comment-action__like comment-action__like--liked" :
                                "comment-action__like"
                            }
                            onClick={() => {handleLikeComment(commentID, postID)}}
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
                        {commentAuthorID === currentUserID && (
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
                            title={moment.unix(commentPublishedAt).format('LLL')}
                        >
                            {moment.unix(commentPublishedAt).fromNow()}
                        </span>
                        {(commentLikes.length > 0) && (
                            <div className="comnment-action__inline-like-count">
                                <span>．</span>
                                <span>
                                    <i className="fab fa-gratipay" style={{color: '#5b8cf8'}} />
                                    <span>{commentLikes.length}</span>
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
                                onClick={() => {handleDeleteComment(commentID, postID)}}
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
