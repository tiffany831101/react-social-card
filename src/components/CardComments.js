import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

const CardComments = (props) => (
    <div className="all-comments">
        {(props.comments.length > 0) &&  props.comments.map(comment => (
            <div className="comment" key={comment.id}>
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
                        <span className="comment-action__like">
                            讚
                        </span>
                        <span>．</span>
                        <span className="comment-action__comment">
                            回覆
                        </span>
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
        ))}
    </div>
)

export default CardComments
