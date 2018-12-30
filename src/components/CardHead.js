import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

const CardHead = React.memo(({
    authorName,
    authorID,
    publishedAt,
    currentUserID,
    postID,
    handleDeletePost
}) => (
    <div className="post-meta">
        <a className="post-meta__author-avatar" href="#">
            {authorName.slice(0, 1).toUpperCase()}
        </a>
        <div className="post-meta__info">
            <span className="post-meta__author-name">
                <a href="#">{authorName}</a>
            </span>
            <span
                className="post-meta__timestamp"
                title={moment.unix(publishedAt).format('LLL')}
            >‎
                {moment.unix(publishedAt).format('MMMDo')}
            </span>
        </div>
        {authorID === currentUserID && (
            <div style={{marginLeft: 'auto'}}>
                <i
                    className="fas fa-times post-meta__delete-icon"
                    onClick={() => {handleDeletePost(postID)}}
                />
            </div>
        )}
    </div>
))

export default CardHead
